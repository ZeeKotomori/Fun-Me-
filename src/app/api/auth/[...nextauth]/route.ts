// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Pindah ke luar file ini

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
