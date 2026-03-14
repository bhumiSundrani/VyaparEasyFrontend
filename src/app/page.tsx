import { redirect } from "next/navigation";

export default function Home() {
  console.log("Redirecting to dashboard")
    return (
    redirect("/dashboard")
  );
}
