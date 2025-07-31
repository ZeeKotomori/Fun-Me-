import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Ambil ID dari URL

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: {
                downvote: { increment: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Ambil ID dari URL

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: {
                downvote: { decrement: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
