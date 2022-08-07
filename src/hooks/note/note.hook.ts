import { nanoid } from "nanoid";

import { INote, NoteHook } from "./note.model";

import { useLocalStorage } from "@/hooks/local-storage";
import { MYN_NOTES } from "@/constants/storage";
import { transformToISOFormat } from "@/utils/date";

export default function useNote(): NoteHook {
  const ls = useLocalStorage();

  function getNotes(): INote[] {
    if (!ls.isExist(MYN_NOTES)) return [];

    const notes = ls.get<INote[]>(MYN_NOTES) as INote[];
    return notes;
  }

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

  return { getNotes, storeNote };
}
