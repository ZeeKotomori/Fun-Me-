import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
function extractIdFromUrl(request: NextRequest) {
    const url = new URL(request.url);
    const parts = url.pathname.split('/');
    return parts[parts.length - 1]; // Mengambil ID terakhir dari URL
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: {
                upvotes: {
                    decrement: 1,
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const id = extractIdFromUrl(request);

    if (!id) {
        return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        await prisma.note.update({
            where: { id },
            data: {
                upvotes: { increment: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
