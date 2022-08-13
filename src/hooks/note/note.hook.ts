import { nanoid } from "nanoid";
import { useCallback } from "react";

import { INote, NoteHook } from "./note.model";

import { useLocalStorage } from "@/hooks/local-storage";
import { MYN_NOTES } from "@/constants/storage";
import { transformToISOFormat } from "@/utils/date";

export default function useNote(): NoteHook {
  const ls = useLocalStorage();

  const getNotes = useCallback(() => {
    if (!ls.isExist(MYN_NOTES)) return [];

    const notes = ls.get<INote[]>(MYN_NOTES) as INote[];
    return notes;
  }, [ls]);

  const getNote = useCallback(
    (noteId: string) => {
      if (!ls.isExist(MYN_NOTES)) return null;

      const notes = getNotes();
      const selectedNote = notes.find((note) => note.id === noteId) ?? null;

      return selectedNote;
    },
    [getNotes, ls],
  );

  function storeNote(note: Pick<INote, "content" | "title">): void {
    const notes = getNotes();

    const payload: INote = {
      ...note,
      id: nanoid(),
      archived: false,
      createdAt: transformToISOFormat(new Date()),
    };

    if (Array.isArray(notes)) {
      notes.push(payload);
      ls.set(MYN_NOTES, notes);
    } else {
      ls.set(MYN_NOTES, [payload]);
    }
  }

  const deleteNote = useCallback(
    (noteId: string) => {
      const notes = getNotes();
      const selectedNoteIdx = notes.findIndex((note) => note.id === noteId);

      notes.splice(selectedNoteIdx, 1);
      ls.set(MYN_NOTES, notes);
    },
    [getNotes, ls],
  );

  const archiveNote = useCallback(
    (noteId: string) => {
      const notes = getNotes();
      const selectedNoteIdx = notes.findIndex((note) => note.id === noteId);

      notes[selectedNoteIdx].archived = true;
      ls.set(MYN_NOTES, notes);
    },
    [getNotes, ls],
  );

  return {
    archiveNote,
    deleteNote,
    getNote,
    getNotes,
    storeNote,
  };
}
