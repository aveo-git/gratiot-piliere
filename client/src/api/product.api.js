import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Product = Parse.Object.extend("Product");

export const productKeys = {
    all: () => ['products'],
    product: () => ['product'],
    productByID: (productID) => ["products", productID],
};

export const useGetProducts = ( config ) => {
    const query = new Parse.Query(Product);

    const { data } = useQuery(productKeys.all(), () => query.find(), {
        ...config,
    });

    const products = data?.map(product => parseToView(product))
    return { products: products ?? []};
};

export const useGetOneProductById = (id, config) => {
    const query = new Parse.Query(Product).equalTo('objectId', id)
    const {data, ...res} = useQuery(productKeys.productByID(id), () => query.find(), { ...config });
    const product = data?.map(product => parseToView(product))?.[0] || {}

    return { product, ...res };
}

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