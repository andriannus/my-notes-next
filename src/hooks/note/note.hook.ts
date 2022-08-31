import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { INote, NoteHook } from "./note.model";

import { useCookie } from "@/hooks/cookie";
import { MYN_NOTES } from "@/constants/storage";
import { transformToISOFormat } from "@/utils/date";

export default function useNote(): NoteHook {
  const cookie = useCookie();

  const getNotes = useCallback(() => {
    const tempNotes = cookie.get<INote[]>(MYN_NOTES);
    return tempNotes ?? [];
  }, [cookie]);

  const [notes, setNotes] = useState(getNotes());

  const archivedNotes = useMemo(() => {
    return notes.filter((note) => note.archived);
  }, [notes]);

  const notArchivedNotes = useMemo(() => {
    return notes.filter((note) => !note.archived);
  }, [notes]);

  useEffect(() => {
    notes && cookie.set(MYN_NOTES, notes);
  }, [cookie, notes]);

  const getNote = useCallback(
    (noteId: string) => {
      if (!cookie.isExist(MYN_NOTES)) return null;

      const tempNotes = getNotes();
      const selectedNote = tempNotes.find((note) => note.id === noteId) ?? null;

      return selectedNote;
    },
    [getNotes, cookie],
  );

  const storeNote = useCallback(
    (note: Pick<INote, "content" | "title">) => {
      const tempNotes = getNotes();

      const payload: INote = {
        ...note,
        id: nanoid(10),
        archived: false,
        createdAt: transformToISOFormat(new Date()),
      };

      if (Array.isArray(tempNotes)) {
        tempNotes.push(payload);
        setNotes(tempNotes);
      } else {
        setNotes([payload]);
      }
    },
    [getNotes],
  );

  const deleteNote = useCallback(
    (noteId: string) => {
      const tempNotes = getNotes();
      const selectedNoteIdx = tempNotes.findIndex((note) => note.id === noteId);

      tempNotes.splice(selectedNoteIdx, 1);
      setNotes(tempNotes);
    },
    [getNotes],
  );

  const archiveNote = useCallback(
    (noteId: string) => {
      const tempNotes = getNotes();
      const selectedNoteIdx = tempNotes.findIndex((note) => note.id === noteId);

      tempNotes[selectedNoteIdx].archived = true;
      setNotes(tempNotes);
    },
    [getNotes],
  );

  const unarchiveNote = useCallback(
    (noteId: string) => {
      const tempNotes = getNotes();
      const selectedNoteIdx = tempNotes.findIndex((note) => note.id === noteId);

      tempNotes[selectedNoteIdx].archived = false;
      setNotes(tempNotes);
    },
    [getNotes],
  );

  const searchNote = useCallback(
    (title: string) => {
      const tempNotes = getNotes();
      const searchedNotes = tempNotes.filter((note) => {
        return note.title.toLowerCase().includes(title.toLowerCase());
      });

      return searchedNotes;
    },
    [getNotes],
  );

  return {
    archiveNote,
    archivedNotes,
    deleteNote,
    getNote,
    getNotes,
    notArchivedNotes,
    notes,
    searchNote,
    storeNote,
    unarchiveNote,
  };
}
