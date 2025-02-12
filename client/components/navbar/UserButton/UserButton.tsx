"use client";
import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./UserButton.module.css";

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src="/images/profile-picture.jpeg" radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="md" fw={500}>
            Testing name
          </Text>

          <Text c="dimmed" size="sm">
            Testingname@stockTrack.com
          </Text>
        </div>

        {/*<IconChevronRight size={14} stroke={1.5} />*/}
      </Group>
    </UnstyledButton>
  );
}
