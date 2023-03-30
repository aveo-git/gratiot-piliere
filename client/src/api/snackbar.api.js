import { useQueryClient } from "@tanstack/react-query";

export const snackbarKeys = {
    status: () => ['status'],
};

export const useGetsnackBarStatus = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(snackbarKeys.status());
}