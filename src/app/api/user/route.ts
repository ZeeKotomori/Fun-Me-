import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password , role} = await request.json();

        console.log('Received data:', { name, email, password, role });

        if (!name || !email || !password || !role) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const existUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: { 
                name,
                email,
                hashedPassword,
                role: role ? role : 'U'
            }
        });

        return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}