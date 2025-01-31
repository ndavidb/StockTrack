'use client';
import Image from 'next/image'
import {Button, Group, Title} from "@mantine/core";
import {XeroConnection} from "../actions/XeroConnection";

export default function XeroConnectionButton() {
    return (
        
            <Button onClick={XeroConnection}
                variant="outline"
                size='xl'
                leftSection={<Image src='/logos/Xero-button.svg' width="40" height="40"
                                    alt={'This is the xero logo'}>
                </Image>}>Connect to Xero
            </Button>
        
    );
};

