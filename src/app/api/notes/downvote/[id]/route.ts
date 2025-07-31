import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Tambah downvote
export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // ambil ID dari /[id]/route.ts

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: { downvote: { increment: 1 } },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

// Kurangi downvote
export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: { downvote: { decrement: 1 } },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
