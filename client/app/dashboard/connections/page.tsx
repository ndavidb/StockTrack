import Image from 'next/image'
import {Button, Group, Title} from "@mantine/core";
import {ConnectionsHeaderTabs} from "./_components/header/ConnectionsHeaderTab";
import XeroConnectionButton from "./_components/XeroConnectionButton";

export default function Page() {
    return (
        <>
            <Title order={2} mb="md">Connect an organisation</Title>
            <ConnectionsHeaderTabs/>
            <Group>
                <XeroConnectionButton/>
            </Group>
        </>
    );
};


