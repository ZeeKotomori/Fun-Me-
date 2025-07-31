import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Tambah downvote
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.note.update({
            where: { id: params.id },
            data: { downvote: { increment: 1 } },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

// Kurangi downvote
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await prisma.note.update({
            where: { id: params.id },
            data: { downvote: { decrement: 1 } },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
