import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Product = Parse.Object.extend("Product");

export const productKeys = {
    all: () => ['products'],
    product: () => ['product'],
    productByID: (productID) => ["products", productID],
    allCategories: () => ['categories']
};

export const useGetAllCategories = ( config ) => {
    const query = new Parse.Query(Product);

    const { data, ...res } = useQuery(productKeys.allCategories(), () => query.find(), {
        ...config
    });

    let categories = [...new Set(data?.map(category => category.get('category')))]
    return { categories: categories ?? [], ...res};
}

export const useGetProducts = ( config ) => {
    const query = new Parse.Query(Product);

    const { data, ...res } = useQuery(productKeys.all(), () => query.find(), {
        ...config,
    });

    const products = data?.map(product => parseToView(product))
    return { products: products ?? [], ...res};
};

export const useGetOneProductById = (id, config) => {
    const query = new Parse.Query(Product).equalTo('objectId', id)
    const {data, ...res} = useQuery(productKeys.productByID(id), () => query.find(), { ...config });
    const product = data?.map(product => parseToView(product))?.[0] || {}

    return { product, ...res };
}

export const useProductCategory = () => {
    const queryClient = useQueryClient();

    return useMutation((payload) => 
        payload, {
        onSuccess: (data) => {
            const keyCat = productKeys.allCategories();
            const keyProd = productKeys.all();
            queryClient.cancelQueries(keyCat);
            const prev = queryClient.getQueryData(keyCat);

            if (prev) {
                const res = prev.filter((product) => product.get('category') === data);
                queryClient.setQueryData(keyProd, res);
            }
        },
    });
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