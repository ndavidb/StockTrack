'use client';
import {useState} from 'react';
import {
    Avatar,
    Burger,
    Container,
    Group,
    Menu,
    Tabs,
} from '@mantine/core';
import classes from './ConnectionsHeaderTab.module.css';

const tabs = [
    'All',
    'Accounting',
    'Ecommerce',
    'Banks'
];

export function ConnectionsHeaderTabs() {

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container fluid p="0">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}