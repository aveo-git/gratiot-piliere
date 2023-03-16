import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Order = Parse.Object.extend("Order");

export const orderKeys = {
    all: () => ['orders'],
    orderID: (orderID) => ['orders', orderID],
};

export const useGetOrders = ( config ) => {
    const query = new Parse.Query(Order);

    const { data } = useQuery(orderKeys.all(), () => query.find(), {
        ...config,
    });

    const orders = data?.map(order => parseToView(order))
    return { orders: orders ?? []};
};

export const useCreateOrder = () => {
    const order = new Order();

    // const queryClient = useQueryClient();

    return useMutation((payload) => {
        order.set('products', payload)
        return order.save()
    }, {
        onSuccess: (data) => {
            return data
        },
    });
};

export const useCountOperation = () => {
    const queryClient = useQueryClient();
    
    return useMutation(({objectId}) => new Parse.Query(Order)
            .equalTo('objectId', objectId)
            .first(),  {
        onSuccess: (item) => {
            const id = item.id
            const count = item.get('count') || 0
            let increase = count + 1;
            item.set('count', increase)
            item.save();

            const keys = orderKeys.all();
            queryClient.cancelQueries(keys);
            const prev = queryClient.getQueryData(keys);

            if (prev) {
                const res = prev.map((p) => {
                    if (p.id === id) {
                        return item;
                    }
                    return p;
                });
                queryClient.setQueryData(keys, res);
            }
        }
    });
};

// if (prev) {
//     const res = prev.map((p) => {
//         if (p._id === data.planning._id) {
//             return data.planning;
//         }
//         return p;
//     });
//     queryClient.setQueryData<TPlanning[]>(keys, res);
// }