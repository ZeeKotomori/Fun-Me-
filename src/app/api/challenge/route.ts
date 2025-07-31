import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
    try {
        const challenges = await prisma.challenge.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(challenges)
    } catch (error) {
        console.error('Error fetching challenges:', error)
        return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
    }
}

// POST /api/challenge
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const userId = session.user.id
    if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

    const body = await req.json()

    const challenge = await prisma.challenge.create({
        data: {
            title: body.title,
            description: body.description,
            username: session.user.name || 'Anonymous',
            user: {
                connect: { email: session.user.email }
            }
        }
    })

    return new Response(JSON.stringify(challenge), { status: 201 })
}

