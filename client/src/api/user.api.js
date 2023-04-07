import { useMutation, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';
import { snackbarKeys } from "./snackbar.api";

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

export const useUserSigin = () => {
    const queryClient = useQueryClient();
    return useMutation(() => {}, {
        onSuccess: () => {
            const keySnackbar = snackbarKeys.status();
            queryClient.cancelQueries(keySnackbar);
            queryClient.setQueryData(keySnackbar, { message: 'Ceci est juste un message' })
        }
    })
}

export const useSetShippingAddressUser = () => {
    const queryClient = useQueryClient();
    return useMutation((payload) => {
        const currentUser = Parse.User.current();
        currentUser.set('shippingAddress', payload);
        return payload;
    }, {
        onSuccess: (data) => {
            const keySnackbar = snackbarKeys.status();
            queryClient.cancelQueries(keySnackbar);
            queryClient.setQueryData(keySnackbar, { message: `Votre point de livraison est : ${data}`, status: true })
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
            const keySnackbar = snackbarKeys.status();
            queryClient.cancelQueries(keySnackbar);
            queryClient.setQueryData(keySnackbar, { message: `Vous êtes déconnecté. Au revoir!`, status: true })
            queryClient.setQueryData(userKeys.currentUser(), null);
        }
    })
}

export const logoutUser = () => {
    const loggedUser = Parse.User.logOut();
    return loggedUser;
}