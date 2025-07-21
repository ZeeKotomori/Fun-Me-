import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.note.update({
            where: { id: params.id },
            data: {
                downvote: { increment: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.note.update({
            where: { id: params.id },
            data: {
                downvote: { decrement: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
