'use server'

import { cookies } from 'next/headers'
import {LoginResponse} from "../../../types/auth";
import {RegisterResponse} from "../../../types/auth";


export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/login?useCookies=true&useSessionCookies=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const responseCookies = response.headers.getSetCookie();

        if (response.ok) {
            const cookieStore = await cookies();
            
            responseCookies.forEach(cookie => {
                const [cookieHeader] = cookie.split(';');
                const [cookieName, cookieValue] = cookieHeader.split('=');

                cookieStore.set({
                    name: cookieName,
                    value: cookieValue,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });
            });

            return { success: true};
        }

        const errorData = await response.json();
        return {
            success: false,
            error: {
                message: response.status === 401 ? 'Invalid email or password' : errorData.detail || 'Authentication failed'
            }
        };
        
    } catch (error) {
        return {
            success: false,
            error: { message: 'An unexpected error occurred' }
        };
    }
}

export async function registerAction(email: string, password: string): Promise<RegisterResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            return { success: true};
        }

        const errorData = await response.json();
        return {
            success: false,
            error: {
                message: response.status === 400 ? 'Invalid email or password' : errorData.detail || 'Authentication failed'
            }
        };

    } catch (error) {
        return {
            success: false,
            error: { message: 'An unexpected error occurred' }
        };
    }
}