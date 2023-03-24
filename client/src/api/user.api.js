import { useMutation, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';

export const userKeys = {
    all: () => ['users'],
    user: () => ['user']
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

export const useIsUserLogged = () => {
    const currentUser = Parse.User.current();
    if(currentUser) {
        return true;
    }
    return false;
}
