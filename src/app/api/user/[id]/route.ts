import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE( request: NextRequest, { params } : { params: { id: string } }) {
    try {
        const { id } = params.id ? params : {};

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const user = await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'User deleted successfully', user }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT( request: NextRequest, { params } : { params: { id: string } }) {
    try {
        const data = await request.json();
        const { id } = params.id ? params : {};

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        if (!id || !data) {
            return NextResponse.json({ message: 'User ID and data are required' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data
        });

        return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}