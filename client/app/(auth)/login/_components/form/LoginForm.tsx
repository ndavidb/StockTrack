'use client';

import {
    Alert,
    Anchor,
    Box,
    Button,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {GoogleButton} from './GoogleButton';
import {LinkedinButton} from './LinkedinButton';
import Link from "next/link";
import {useState} from "react";
import {useRouter} from 'next/navigation';
import {login} from "../../../actions/auth";

export function LoginForm(props: PaperProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length < 6 ? 'Password must be at least 6 characters' : null),
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true);
            setError(null);

            const result = await login(values.email, values.password);

            if (result.success) {
                router.push('dashboard/');
            } else {
                setError(result.error?.message || 'An unexpected error occurred');
                if (result.error?.message.includes('Invalid email or password')) {
                    form.setFieldValue('password', '');
                }
            }
        } catch (err) {
            setError("Unexpected error occurred");
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box miw="25%">
            <Title ta="center" order={1}>
                Sign in to your account
            </Title>
            <Space h="md"/>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Stack gap="lg">
                    <GoogleButton radius="md">Google</GoogleButton>
                    {/*<LinkedinButton radius="md">Linkedin</LinkedinButton>*/}
                </Stack>

                <Divider label="Or continue with email" labelPosition="center" my="lg"/>

                {error && (
                    <Alert color="red" mb="md">
                        {error}
                    </Alert>
                )}

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                        <Button
                            type="submit"
                            radius="md"
                            loading={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Stack>
                </form>

                <Group justify="space-between" mt="xl">
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Don&apos;t have an account yet?{' '}
                            <Anchor href="/register" size="sm">
                                Create account
                            </Anchor>
                    </Text>
                </Group>
            </Paper>
        </Box>
    );

}