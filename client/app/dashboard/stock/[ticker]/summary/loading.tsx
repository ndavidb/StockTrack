import { Container, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <Container mt="lg" size="fluid">
      <Skeleton height={400} mb="xl" />;
    </Container>
  );
}
