import {Anchor, Box, Button, Center, Container, Flex, Group, Title} from "@mantine/core";
import Link from "next/link";
import {RegisterForm} from "./_components/RegisterForm";


export default function RegisterPage() {
    return (
        <>
            <Flex mih="100vh" direction="column" justify="space-between" align="center">
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    w="80%"
                    m="10"
                >
                    <Link href={"/"}>
                        <Title>
                            FINAN
                        </Title>
                    </Link>
                </Flex>
                <RegisterForm />
                <Group w="80%" m="10">
                    <Link href={'/'}>
                        FINAN ©   
                    </Link>
                    <Link href={'/'}>
                        Privacy & Terms
                    </Link>
                    
                </Group>
            </Flex>
        </>
    );
};
