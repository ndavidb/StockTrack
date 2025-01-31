'use client';

import {
    IconAdjustments, IconBadge4k,
    IconCalendarStats, IconCoins,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics, IconTools,
} from '@tabler/icons-react';
import {Code, Group, ScrollArea, Title} from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from './UserButton/UserButton';
import classes from './Navbar.module.css';
import Link from "next/link";

const mockdata = [
    { label: 'Overview', icon: IconGauge, link: '/dashboard'},
    {
        label: 'Portfolio',
        icon: IconCoins,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Balance Sheet', link: '/' },
            { label: 'Profit & Loss', link: '/' },
        ],
    },
    {
        label: 'Tools',
        icon: IconTools,
        links: [
            { label: 'Employee cost calculator', link: '/' },
            { label: 'GST Estimator', link: '/' },
        ],
    },
    { label: 'Settings', icon: IconAdjustments, link:'/dashboard/connections' },
];

export function Navbar() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="center">
                    <Link href="/">
                        <Title order={1} className={classes.title}>
                            FINAN
                        </Title>
                    </Link>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}