'use client';

import {AppShell, Burger, Group, Skeleton, Title} from "@mantine/core";
import {Navbar} from "../../components/navbar/Navbar";
import {useDisclosure} from "@mantine/hooks";

export default function Layout({children}: { children: any }) {
    const [opened, {toggle}] = useDisclosure();

    return (
        <AppShell
            layout="alt"
            header={{height: 70}}
            navbar={{width: 220, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            padding="md"
        >
            <AppShell.Header>
                <Group px="md" pt="sm">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                    {/*<MantineLogo size={30} />*/}
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Group px="md" pt="md" hiddenFrom="sm">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                </Group>
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
};
