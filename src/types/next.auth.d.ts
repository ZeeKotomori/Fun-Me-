import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'A' | 'U';
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: 'A' | 'U';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: 'A' | 'U';
  }
}
