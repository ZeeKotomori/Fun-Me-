import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const now = new Date()
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const users = await prisma.user.count()
        const notesToday = await prisma.note.count({
            where: {
                createdAt: {
                    gte: startOfToday,
                },
            },
        })
        const challenge = await prisma.challenge.count()

        return NextResponse.json({
            users,
            notesToday,
            challenge,
        })
    } catch (error) {
        console.error('Error in GET /api/dashboard:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
