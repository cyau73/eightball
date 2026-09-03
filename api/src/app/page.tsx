import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApiLandingPage from "@/components/ApiDashboard"; // Move your client code here

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <ApiLandingPage userEmail={session.user.email} />;
}