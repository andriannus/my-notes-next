export interface INote {
  archived: boolean;
  content: string;
  createdAt: string;
  id: string;
  title: string;
}

export interface NoteHook {
  archiveNote(noteId: string): void;
  deleteNote(noteId: string): void;
  getNote(noteId: string): INote | null;
  getNotes(): INote[];
  searchNote(title: string): INote[];
  storeNote(note: Pick<INote, "content" | "title">): void;
  unarchiveNote(noteId: string): void;
  notes: INote[];
  archivedNotes: INote[];
  notArchivedNotes: INote[];
}
