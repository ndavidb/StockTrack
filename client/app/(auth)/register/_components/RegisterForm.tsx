'use client';

import {
    Anchor, Box,
    Button,
    Divider,
    Group, Modal,
    Paper,
    PaperProps,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput, Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {notifications} from '@mantine/notifications';
import Link from "next/link";
import {useState} from "react";
import {registerAction} from "../../actions/auth";
import {IconCheck} from "@tabler/icons-react";
import {useRouter} from "next/navigation";

export function RegisterForm(props: PaperProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => {
                const hasLength = val.length >= 6;
                const hasUppercase = /[A-Z]/.test(val);
                const hasLowercase = /[a-z]/.test(val);
                const hasNumber = /[0-9]/.test(val);
                const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(val);

                if (!hasLength) return 'Password should include at least 6 characters';
                if (!hasUppercase) return 'Password should include at least one uppercase letter';
                if (!hasLowercase) return 'Password should include at least one lowercase letter';
                if (!hasNumber) return 'Password should include at least one number';
                if (!hasSpecialChar) return 'Password should include at least one special character';

                return null;
            },
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
         
    });
    
    const handleSubmit = async(values: typeof form.values)=> {
        try {
            setLoading(true);
            setError(null);
            const result = await registerAction(values.email, values.password);
            if (result.success){
                setShowSuccessModal(true);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(result.error?.message || 'An unexpected error occurred');
                if (result.error?.message.includes('Invalid email or password')) {
                    form.setFieldValue('password', '');
                }
            }
        } catch (err){
            setError("Unexpected error occurred");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal
                opened={showSuccessModal}
                onClose={() => {}} // Empty function since we don't want to allow closing
                withCloseButton={false}
                closeOnClickOutside={false}
                closeOnEscape={false}
                centered
                size="sm"
            >
                <Stack align="center" gap="md" py="md">
                    <IconCheck size={50} color="var(--mantine-color-green-6)" stroke={1.5} />
                    <Title order={2} ta="center">Registration Successful!</Title>
                    <Text c="dimmed" ta="center">
                        Your account has been created successfully.
                        Redirecting you to the login page...
                    </Text>
                </Stack>
            </Modal>
            <Box miw="25%" maw="90%">
                <Title ta="center" order={1}>
                    Create your FINAN account
                </Title>
                <Space h="md"/>
                <Paper radius="md" p="xl" withBorder {...props}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            <TextInput
                                required
                                label="Email"
                                placeholder="example@email.com"
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
                                error={form.errors.password}
                                radius="md"

                            />

                            <PasswordInput
                                required
                                label="Confirm password"
                                placeholder="Confirm your password"
                                value={form.values.confirmPassword}
                                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                                error={form.errors.confirmPassword}
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
                            Do already have an account?{' '}
                            <Link href={'/login'}>
                                <Anchor size="sm" component="button">
                                    Sign in
                                </Anchor>
                            </Link>
                        </Text>
                    </Group>
                </Paper>
            </Box>
        </>
        
    );
}