export interface INote {
  archived: boolean;
  content: string;
  createdAt: string;
  id: string;
  title: string;
}

export interface NoteHook {
  getNotes(): INote[];
  storeNote(note: Pick<INote, "content" | "title">): void;
}
