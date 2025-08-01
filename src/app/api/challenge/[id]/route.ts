import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/authOptions'

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const challenge = await prisma.challenge.findUnique({
        where: { id },
    })

    if (!challenge) {
        return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    await prisma.challenge.delete({
        where: { id },
    })

    return new Response(null, { status: 204 })
}

export async function PATCH(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const body = await req.json()

    const challenge = await prisma.challenge.findUnique({
        where: { id },
    })

    if (!challenge) {
        return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    const isOwner = challenge.userId === session.user.id;
    const isAdmin = session.user.role === "A";
    
    if (!isOwner && !isAdmin) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    const updated = await prisma.challenge.update({
        where: { id },
        data: {
            title: body.title,
            description: body.description,
        },
    })

    if (!updated) {
        return new NextResponse(JSON.stringify({ error: 'Failed to update challenge' }), { status: 500 })
    }

    if(isAdmin) {
        await prisma.challengeLog.create({
            data: {
                challengeId: updated.id,
                userId: session.user.id,
                action: 'updated',
                details: `Challenge updated by admin ${session.user.name}`,
            }
        })
    }
    return new Response(JSON.stringify(updated), { status: 200 })
}

export async function GET(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
        return new NextResponse(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    }

    const challenge = await prisma.challenge.findUnique({
        where: { id },
    });

    if (!challenge) {
        return new NextResponse(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(challenge), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
