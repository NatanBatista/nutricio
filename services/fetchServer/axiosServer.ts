import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios, { AxiosInstance } from "axios";

export const getAxiosServer = (): AxiosInstance => {
    const authorization = cookies().get("authorization")

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            ...(authorization && { Authorization: `${authorization.value}` }),
        },
    });

    // Interceptor para lidar com erros de autorização
    api.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                redirect("/")
            }
            return Promise.reject(error);
        }
    );

    return api;
};
