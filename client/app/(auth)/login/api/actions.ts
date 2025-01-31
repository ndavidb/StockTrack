'use server';

import { redirect } from "next/navigation";
import { LoginRequest, LoginResponse } from "../../../../types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5155";

export async function LoginAction(_prevState: LoginResponse, formData: FormData): Promise<LoginResponse> {
    try {
        const loginData: LoginRequest = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const response = await fetch(`${API_URL}/login?useCookies=true&useSessionCookies=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(loginData),
            cache: 'no-store'
        });

        // For 200 status with no content (successful login)
        if (response.status === 200) {
            return { success: true };
        }

        if (!response.ok) {
            // Only try to parse JSON if there's content
            let errorMessage = 'An error occurred';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // If parsing fails, use status text
                errorMessage = response.statusText;
            }

            switch (response.status) {
                case 400:
                    return {
                        success: false,
                        error: {
                            type: 'ValidationError',
                            message: 'Invalid login details'
                        }
                    };
                case 401:
                    return {
                        success: false,
                        error: {
                            type: 'AuthenticationError',
                            message: 'Invalid email or password'
                        }
                    };
                default:
                    return {
                        success: false,
                        error: {
                            type: 'ServerError',
                            message: errorMessage
                        }
                    };
            }
        }

        return { success: true };

    } catch (error: any) {
        console.error('Login error:', error);
        return {
            success: false,
            error: {
                type: 'UnexpectedError',
                message: 'An unexpected error occurred. Please try again.'
            }
        };
    }
}