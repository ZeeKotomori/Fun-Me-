import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email already registered' },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                role: 'U',
            },
        })

        return NextResponse.json(
            { message: 'Registered successfully' },
            { status: 201 }
        )
    } catch (error) {
        console.error('[REGISTER_ERROR]', error)
        return NextResponse.json(
            { message: 'Something went wrong on the server' },
            { status: 500 }
        )
    }
}