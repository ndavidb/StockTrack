'use server';

import {XeroLoginUrl} from "../../../../types/XeroIntegration";
import {redirect} from "next/navigation";

export async function XeroConnection() {
    try {
        const response = await fetch(`${process.env.NEXT_DEV_API}/xero/auth/login`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })

        if(!response.ok){
            throw new Error('Failed to connect to Xero');
        }

        const data = await response.json() as XeroLoginUrl;
        
        redirect(data.loginUrl);
        
    } catch (err){
        throw err;
    }
}