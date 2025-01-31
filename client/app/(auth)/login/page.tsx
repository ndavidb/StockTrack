import {Anchor, Box, Button, Center, Container, Flex, Group, Title} from "@mantine/core";
import Link from "next/link";
import {LoginForm} from "./_components/form/LoginForm";


export default function LoginPage() {
    return (
        <>
            <Flex mih="100vh" direction="column" justify="space-between" align="center">
                <Group w="80%" m="10">
                        <Link href={"/"}>
                            <Title>
                                StockTrack
                            </Title>
                        </Link>
                </Group>
                <LoginForm/>
                <Group w="80%" m="10">
                    <Anchor href="/" underline="hover">
                        StockTrack ©   
                    </Anchor>
                    <Anchor>
                        Privacy & Terms
                    </Anchor>
                </Group>
            </Flex>
        </>
    );
};
