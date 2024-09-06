"use client";

import { parseCookies } from "nookies";
import { signOut } from "next-auth/react";
import axios, { AxiosInstance } from "axios";

export const getAxiosClient = (): AxiosInstance => {
    const cookies = parseCookies();
    const authorization = cookies.authorization;

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            ...(authorization && { Authorization: `${authorization}` }),
        },
    });

    // Interceptor para lidar com erros de autorização
    api.interceptors.response.use(
        response => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                await signOut();
            }
            return Promise.reject(error);
        }
    );

    return api;
};
