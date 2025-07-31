import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const challenge = await prisma.challenge.findUnique({
        where: { id: params.id },
    })

    if (!challenge) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    if (challenge.userId !== session.user.id) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    await prisma.challenge.delete({
        where: { id: params.id },
    })

    return new Response(null, { status: 204 })
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const body = await req.json()

    const challenge = await prisma.challenge.findUnique({
        where: { id: params.id },
    })

    if (!challenge) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    if (challenge.userId !== session.user.id) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    }

    const updated = await prisma.challenge.update({
        where: { id: params.id },
        data: {
            title: body.title,
            description: body.description,
        },
    })

    return new Response(JSON.stringify(updated), { status: 200 })
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const challenge = await prisma.challenge.findUnique({
        where: { id: params.id }
    })

    if (!challenge) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(challenge), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}
