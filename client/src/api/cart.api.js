import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Cart = Parse.Object.extend("Cart")
const Product = Parse.Object.extend("Product");

export const cartKeys = {
    all: () => ['carts'],
    cart: (cartID) => ['carts', cartID],
};


export const useCreateCart = () => {
    const cart = new Cart();
    const queryClient = useQueryClient();

    return useMutation(async (payload) => {
        const query = new Parse.Query(Product).equalTo('objectId', payload.id)
        const product = await query.first();
        cart.set('product', product)
        return cart.save()
    }, {
        onSuccess: (data) => {
            const keys = cartKeys.all();
            queryClient.cancelQueries(keys);
            const prev = queryClient.getQueryData(keys);
            if (prev) {
                queryClient.setQueryData(keys, [...prev, data]);
            }
        },
    });
};

export const useGetCarts = (config) => {
    const query = new Parse.Query(Cart);
    const { data, ...res } = useQuery(cartKeys.all(), () => query.find(), {
        ...config,
    });

    const cart = data?.map(product => parseToView(product))
    return { cart: cart ?? [], res};
}

export const useRestoreCart = () => {
    const query = new Parse.Query(Cart);
    const queryClient = useQueryClient();
    
    return useMutation(() => query.each(async cart => {
        await cart.destroy()
    }), {
        onSuccess: (data) => {
            const keys = cartKeys.all();
            queryClient.removeQueries(keys)
        }
    })
}
