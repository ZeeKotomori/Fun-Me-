import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // ambil id dari akhir path

    if (!id) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        const data = await request.json();
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
        });

        return NextResponse.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
