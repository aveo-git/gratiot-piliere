import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';

export const userKeys = {
    all: () => ['users'],
    currentUser: () => ['currentUser']
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const user = new Parse.User();

    return useMutation((payload) => {
        return user.signUp(payload)
    }, {
        onSuccess: (data) => {
            const key = userKeys.all();
            queryClient.cancelQueries(key);
            queryClient.setQueryData(key, data);
        }
    })
}

export const useUserLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({username, password}) => {
        const user = await Parse.User.logIn(username, password);
        return user;
    }, {
        onSuccess: (data) => {
            if(data) {
                queryClient.clear();
                queryClient.setQueryData(userKeys.currentUser(), data)
                window.location.reload()
            }
        }
    })
}

export const useSetShippingAddressUser = () => {
    return useMutation((payload) => {
        const currentUser = Parse.User.current();
        currentUser.set('shippingAddress', payload);
        return currentUser.save();
    }, {
        onSuccess: (data) => {
            // console.log('data :>> ', data);
        }
    })
}

export const getShippingAdressUser = () => {
    const user = isUserLogged();
    if(!user) return;
    return user?.get('shippingAddress')
}

export const isUserLogged = () => {
    const currentUser = Parse.User.current();
    return currentUser;
}

export const useIseUserLogged = () => {
    
    const queryClient = useQueryClient()
    return queryClient.getQueryData(userKeys.currentUser())
}

export const useUserLogout = () => {
    const queryClient = useQueryClient();
    return useMutation(async () => {
        const logoutUser = await Parse.User.logOut();
        return logoutUser;
    }, {
        onSuccess: () => {
            queryClient.setQueryData(userKeys.currentUser(), null);
        }
    })
}

export const logoutUser = () => {
    const loggedUser = Parse.User.logOut();
    return loggedUser;
}