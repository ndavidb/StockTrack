import { Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
