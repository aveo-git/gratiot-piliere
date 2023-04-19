import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import Axios from 'axios';
import { crypt, getTotal, groupByIdforCart, parseToView } from "../misc/utils";
import { Cart, cartKeys } from "./cart.api";

const Order = Parse.Object.extend("Order");

export const orderKeys = {
    all: () => ['orders'],
    order: () => ['order'],
    orderByID: (orderId) => ['orders', orderId]
};

export const useGetOrders = ( config ) => {
    const query = new Parse.Query(Order).equalTo('user', Parse.User.current());

    const { data, ...res } = useQuery(orderKeys.all(), () => query.find(), {
        ...config,
    });

    const orders = data?.map(order => parseToView(order))
    return { orders: orders ?? [], ...res};
};

export const useCreateOrder = () => {
    const order = new Order();
    const queryCart = new Parse.Query(Cart);
    const queryClient = useQueryClient();
    const query = queryClient.getQueryData(cartKeys.all());
    const cart = query?.map(product => parseToView(product));
    const shippingSetting = JSON.parse(window?.localStorage.getItem('shippingSetting')) || null

    return useMutation((payload) => {
        const productsFromCart = query.map(item => {
            return item.get('product');
        })
        order.set('products', productsFromCart);
        order.set('state', 'pending');
        order.set('shipping', { address: shippingSetting?.shippingAddress, date: shippingSetting?.shippingDate });
        order.set('user', Parse.User.current());

        return order.save();
    }, {
        onSuccess: (order) => {
            Axios.post('http://dev.api-payplug.loc/index.php/api/confirm', {}).then((res) => {
                if(res) {
                    const currentUser = parseToView(Parse.User.current()) || {};
                    const products = groupByIdforCart(cart);
                    // *100 rule for payplug amount
                    const totalTTC = getTotal(products)*100;
                    const data = {
                        userId: currentUser?.id,
                        firstName: crypt(currentUser?.firstName),
                        lastName: crypt(currentUser?.lastName),
                        email: crypt(currentUser?.email),
                        address: crypt(currentUser?.address),
                        mobile: crypt(currentUser?.mobile),
                        total: crypt(totalTTC+''),
                        orderId: order.id
                    }
            
                    window.location.href = `http://dev.api-payplug.loc/index.php/api/confirm?data=${encodeURIComponent(JSON.stringify(data))}`

                    // Destroy cart
                    queryCart.each(async cart => {
                        await cart.destroy()
                    });
                }
            }).catch((err) => {
                console.log('err :>> ', err);
            })

            const keyOrder = orderKeys.order();
            const keyOrders = orderKeys.all();

            // Delete cache cart
            // const keysCart = cartKeys.all();
            // queryClient.removeQueries(keysCart);

            queryClient.cancelQueries(keyOrder);
            queryClient.setQueryData(keyOrder, order);

            const prevOrders = queryClient.getQueryData(keyOrders) || [];
            queryClient.setQueryData(keyOrders, [...prevOrders, order]);
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

export const setOrderStatus = async (id, state) => {
    const query = new Parse.Query(Order).equalTo('objectId', id);
    const order = await query.first();

    order.set('state', state);
    order.save();
}