import { SignOutButton, SignInButton, Provider } from "../client-components";
// v4 version
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
// v5 version
import { auth } from "@/auth";
export default async function TenantPage({
  params,
}: {
  params: { tenant: string };
}) {
  // v5 version
  const session = await auth();

  // v4 version
  // const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>Page for {params.tenant}</h1>
      {session ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
