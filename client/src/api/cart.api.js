import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Cart = Parse.Object.extend("Cart")
const Product = Parse.Object.extend("Product");

export const cartKeys = {
    all: () => ['carts'],
    cart: (cartID) => ['carts', cartID],
    pay: () => ['pay']
};


export const useCreateCart = () => {
    const cart = new Cart();
    const queryClient = useQueryClient();

    return useMutation(async (payload) => {
        const query = new Parse.Query(Product).equalTo('objectId', payload?.product?.objectId)
        const product = await query.first();
        const result = {success: true, operand: payload.operand}

        switch (payload.operand) {
            case 'plus':
                cart.set('product', product)
                cart.save()
                result.data = cart;
                break;
            case 'minus':
                const query_2 = new Parse.Query(Cart).equalTo('product', product);
                const test = await query_2.first();
                test.destroy()
                result.data = test;
                break;
            default:
                return {success: false, error: 'Error'};
        }

        return result;
    }, {
        onSuccess: ({ success, operand, data }) => {
            if(success) {
                const keys = cartKeys.all();
                queryClient.cancelQueries(keys);
                const prev = queryClient.getQueryData(keys)
                if (prev && !!data) {
                    if(operand === 'plus') {
                        queryClient.setQueryData(keys, [...prev, data]);
                    } else {
                        queryClient.setQueryData(keys, prev.filter(item => item.id !== data.id))
                    }
                }
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

export const useSetTotalTTC = () => {
    const queryClient = useQueryClient();

    return useMutation((payload) => payload, {
        onSuccess: (data) => {
            const key = cartKeys.pay();
            queryClient.cancelQueries(key)
            queryClient.setQueryData(key, data)
        }
    })
}

export const useGetTotalTTC = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(cartKeys.pay());
}
