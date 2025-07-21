import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function addNote(data: {
    id: string;
    key: string;
    from: string;
    to: string;
    message: string;
    music: {
        title: string;
        artist: string;
        trackId: string;
        deezerUrl: string;
    } | null;
    expiredDate: Date;
}) {
    return await prisma.note.create({
        data: {
            ...data,
            music: data.music as Prisma.InputJsonValue, 
        },
    });
}
export async function getNotes() {
    return await prisma.note.findMany();
}

export async function findNoteById(id: string) {
    return await prisma.note.findUnique({ where: { id } });
}

export async function updateNote(id: string, key: string, data: Partial<Omit<Parameters<typeof addNote>[0], 'id' | 'key'>>) {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.key !== key) return null;

    return await prisma.note.update({
        where: { id },
        data: {
            ...data,
            music: data.music as Prisma.InputJsonValue, 
        },
    });
}

export async function deleteNote(id: string, key: string) {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note || note.key !== key) return false;

    await prisma.note.delete({ where: { id } });
    return true;
}

export async function deleteExpiredNotes() {
    const now = new Date();
    const { count } = await prisma.note.deleteMany({
        where: {
            expiredDate: { lt: now },
        },
    });

    if (count > 0) {
        console.log(`[CLEANUP] Deleted ${count} expired notes`);
    }
}

setInterval(deleteExpiredNotes, 60 * 60 * 1000);
