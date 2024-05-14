import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
});
