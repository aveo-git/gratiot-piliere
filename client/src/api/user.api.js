import { useMutation, useQueryClient } from "@tanstack/react-query";
import Parse from 'parse';

export const userKeys = {
    all: () => ['users'],
    userExists: (user) => ['userExists', user]
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

export const userLoggin = async ({username, password}) => {
    try {
        const user = await Parse.User.logIn(username, password)
        // Do something with the logged in user object
        return user;
      } catch (error) {
        // Handle the error
        return error;
      }
}

export const useIsUserLogged = () => {
    const currentUser = Parse.User.current();
    return currentUser;
}

export const logoutUser = () => {
    const loggedUser = Parse.User.logOut();
    return loggedUser;
}