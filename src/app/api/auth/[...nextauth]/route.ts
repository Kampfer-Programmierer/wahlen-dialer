// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '~/app/lib/mongoose';
import { User, IUser } from '~/app/models/User'; // Import User and IUser

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect(); // Ensure database is connected

        // Find user by email
        const user: IUser | null = await User.findOne({ email: credentials?.email });
        if (user && await user.comparePassword(credentials?.password)) {
          return { id: user._id, email: user.email }; // Return user object
        }
        // If user is not found or password doesn't match
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login', // Redirect to your custom login page
  },
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Attach user ID to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Export GET and POST handlers
