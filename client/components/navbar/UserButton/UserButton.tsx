'use client';
import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';

export function UserButton() {
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src="/images/profile-picture.jpeg"
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        Natalia Bello
                    </Text>

                    <Text c="dimmed" size="xs">
                        natalia@bello.com
                    </Text>
                </div>

                {/*<IconChevronRight size={14} stroke={1.5} />*/}
            </Group>
        </UnstyledButton>
    );
}