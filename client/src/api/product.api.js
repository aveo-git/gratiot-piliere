import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { parseToView } from "../misc/utils";

const Product = Parse.Object.extend("Product");
const Vote = Parse.Object.extend("Vote");

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

            if (prev && data.length > 0) {
                const res = prev.filter((product) => product.get('category') === data);
                queryClient.setQueryData(keyProd, res);
            } else {
                queryClient.setQueryData(keyProd, prev);
            }
        },
    });
}

export const useVotedProduct = () => {
    const queryClient = useQueryClient();
    const vote = new Vote();

    return useMutation(async (productId) => {
        const isVoted = await isProductVoted(productId);
        if(!isVoted) {
            vote.set('user', Parse.User.current());
            vote.set('productId', productId);
            incrementProductVote(productId);
            return vote.save();
        } else return { msg: 'Produit déjà voté.' }
    }, {
        onSuccess: async (data) => {
            if(data.id) {
                const productNew = await new Parse.Query(Product).equalTo('objectId', data.get('productId')).first();
                const keys = productKeys.all();
                const prev = queryClient.getQueryData(keys);
                if(prev) {
                    const res = prev.filter((product) => {
                        if(product === productNew) return productNew;
                        return product;
                    });
                    queryClient.setQueryData(keys, res);
                }
            }
        }
    })
}

export const isProductVoted = async (id) => {
    const query = new Parse.Query(Vote).equalTo('productId', id).equalTo('user', Parse.User.current());
    const data = await query.first();
    return data;
}

export const incrementProductVote = async (id) => {
    const query = new Parse.Query(Product).equalTo('objectId', id);
    const product = await query.first();
    const vote = product.get('vote') || 0;

    product.set('vote', vote + 1);
    product.save();
}