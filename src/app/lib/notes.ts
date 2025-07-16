export type Note = {
    id: string;
    key: string;
    from: string;
    to: string;
    message: string;
    music?: {
        title: string;
        artist: string;
        trackId: string;
        deezerUrl: string;
    }
    createdAt: number;
}

export const notes: Note[] = [];

export function addNote(note: Note) {
    notes.push(note);
    return note;
}

export function getNotes(): Note[] {
    return notes;
}

export function findNoteById(id: string): Note | undefined {
    return notes.find((note) => note.id === id);
}

export function updateNote(id: string, key: string, updatedData: Partial<Omit<Note, 'id' | 'key' | 'createdAt'>>) {
    const note = notes.find((n) => n.id === id && n.key === key);
    if (!note) return null;

    Object.assign(note, updatedData);
    return note;
}

export function deleteNote(id: string, key: string) {
    const index = notes.findIndex((n) => n.id === id && n.key === key);
    if (index === -1) {
        return false;
    }

    notes.splice(index, 1);
    return true;
}

export function deleteExpiredNotes() {
    const now = Date.now();
    const beforeLength = notes.length;
    const validNotes = notes.filter((n) => now - n.createdAt < 24 * 60 * 60 * 1000);
    notes.length = 0;
    notes.push(...validNotes);

    if (notes.length !== beforeLength) {
        console.log(`[CLEANUP] Deleted ${beforeLength - notes.length} expired notes`);
    }
}

// ✅ Jalankan setiap 1 jam
setInterval(() => {
    deleteExpiredNotes();
}, 60 *  60 * 1000);