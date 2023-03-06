import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const orderKeys = {
    all: () => ['orders'],
    order: () => ['order'],
};

export const useGetOrders = ( config ) => {
    const Order = Parse.Object.extend("Order");
    const query = new Parse.Query(Order);

    const { data } = useQuery(orderKeys.all(), () => query.find(), {
        ...config,
    });

    const orders = data?.map(order => parseToView(order))
    return { orders: orders ?? []};
};

export const useCreateOrder = () => {
    const Order = Parse.Object.extend("Order");
    const order = new Order();

    const queryClient = useQueryClient();

    return useMutation((payload) => order.save(payload), {
        onSuccess: (data) => {
            const keys = orderKeys.all();
            queryClient.cancelQueries(keys);
            const prev = queryClient.getQueryData(keys);

            if (prev) {
                queryClient.setQueryData(keys, [...prev, data]);
            }
        },
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