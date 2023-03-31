import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";
import { cartKeys } from "./cart.api";

const Order = Parse.Object.extend("Order");

export const orderKeys = {
    all: () => ['orders'],
    order: () => ['order'],
    orderByID: (orderId) => ['orders', orderId]
};

export const useGetOrders = ( config ) => {
    const query = new Parse.Query(Order);

    const { data, ...res } = useQuery(orderKeys.all(), () => query.find(), {
        ...config,
    });

    const orders = data?.map(order => parseToView(order))
    return { orders: orders ?? [], ...res};
};

export const useCreateOrder = () => {
    const order = new Order();
    const queryClient = useQueryClient();

    return useMutation((payload) => {
        const cart = queryClient.getQueryData(cartKeys.all())
        const productsFromCart = cart.map(item => {
            return item.get('product')
        })
        order.set('products', productsFromCart)
        return order.save()
    }, {
        onSuccess: (data) => {
            const keyOrder = orderKeys.order();
            const keyOrders = orderKeys.all();
            queryClient.cancelQueries(keyOrder);
            queryClient.setQueryData(keyOrder, data);

            const prevOrders = queryClient.getQueryData(keyOrders);
            queryClient.setQueryData(keyOrders, [...prevOrders, data])
        },
    });
};

export const useGetOrder = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(orderKeys.order());
}

export const useGetOneOrderById = (id, config) => {
    const query = new Parse.Query(Order).equalTo('objectId', id)
    const {data, ...res} = useQuery(orderKeys.orderByID(id), () => query.find(), { ...config });
    const order = data?.map(order => parseToView(order))?.[0] || {}

    return { order, ...res };
}

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation(async (id) => {
        const query = new Parse.Query(Order).equalTo('objectId', id);
        const order = await query.first();
        return order.destroy()
    }, {
        onSuccess: (data) => {
            const keys = orderKeys.all();
            queryClient.cancelQueries(keys);
            const prev = queryClient.getQueryData(keys)
            
            queryClient.setQueryData(keys, prev.filter(item => item.id !== data.id))
        }
    })
}