import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Product = Parse.Object.extend("Product");

export const productKeys = {
    all: () => ['products'],
    product: () => ['product'],
};

export const useGetProducts = ( config ) => {
    const query = new Parse.Query(Product);

    const { data } = useQuery(productKeys.all(), () => query.find(), {
        ...config,
    });

    const products = data?.map(product => parseToView(product))
    return { products: products ?? []};
};

export const useAddProduct = () => {
    const product = new Product();

    const queryClient = useQueryClient();

    return useMutation((payload) => 
        product.save(payload), {
            onSuccess: (data) => {
                const keys = productKeys.all();
                queryClient.cancelQueries(keys);
                const prev = queryClient.getQueryData(keys);

                if (prev) {
                    queryClient.setQueryData(keys, [...prev, data]);
                }
            },
        });
};
