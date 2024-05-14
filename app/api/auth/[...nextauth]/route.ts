// v5 version
// import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// export const { GET, POST } = handlers;

// ===================================================
// ===================================================

// v4 version
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize(_credentials) {
        return {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          image: "https://i.pravatar.cc/150?u=jsmith@example.com",
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions) as unknown;

export { handler as GET, handler as POST };
