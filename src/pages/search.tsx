import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-css";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { SearchField } from "@/components/search-field";
import { DeleteNoteDialog, SuccessToast } from "@/components/swal";
import { INote, useNote } from "@/hooks/note";
import { debounce } from "@/utils/debounce";

const DefaultLayout = dynamic(
  () => import("@/layouts/default/default.component"),
  { ssr: false },
);

const Search: NextPage = () => {
  const { archiveNote, deleteNote, searchNote, unarchiveNote } = useNote();

  const [notes, setNotes] = useState([] as INote[]);

  const verifySearch = useMemo(
    () =>
      debounce((search: string) => {
        const notes = searchNote(search);
        setNotes([...notes]);
      }, 100),
    [searchNote],
  );

  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    verifySearch(noteTitle);
  }, [noteTitle, verifySearch]);

  const handleNoteArchive = useCallback(
    (noteId: string) => {
      archiveNote(noteId);
      verifySearch(noteTitle);
      SuccessToast("Catatan berhasil dipindah");
    },
    [archiveNote, noteTitle, verifySearch],
  );

  const handleNoteUnarchive = useCallback(
    (noteId: string) => {
      unarchiveNote(noteId);
      verifySearch(noteTitle);
      SuccessToast("Catatan berhasil diarsip");
    },
    [noteTitle, unarchiveNote, verifySearch],
  );

  const handleNoteDelete = useCallback(
    async (noteId: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        deleteNote(noteId);
        verifySearch(noteTitle);
        SuccessToast("Catatan berhasil dihapus");
      }
    },
    [deleteNote, noteTitle, verifySearch],
  );

  return (
    <>
      <Head>
        <title>Cari catatan - myNotes</title>
      </Head>

      <DefaultLayout>
        <AppBar>
          <AppBarBackButton href="/" />
          <AppBarTitle>Pencarian</AppBarTitle>
        </AppBar>

        <main>
          <SearchField
            id="TxtSearchTrack"
            value={noteTitle}
            autoComplete="off"
            placeholder="Masukkan judul catatan..."
            onChange={(event) => setNoteTitle(event.target.value)}
          />

          <div className="Container">
            {notes.length < 1 ? (
              <p className="text-center text-gray-500">
                Catatan yang kamu cari tidak ditemukan.
              </p>
            ) : (
              <Masonry
                breakpointCols={{ default: 3, 480: 1 }}
                className="Notes"
                columnClassName="Note-column"
              >
                {notes.map((note, index) => {
                  return (
                    <div key={index} className="Note">
                      {note.title && (
                        <div className="Note-title">
                          <p>{note.title}</p>
                        </div>
                      )}

                      <div className="Note-content">
                        <span>{note.content}</span>
                      </div>

                      <div className="Note-actions">
                        {!note.archived && (
                          <button
                            id="ButtonArchive"
                            className="Note-action"
                            type="button"
                            onClick={() => handleNoteArchive(note.id)}
                          >
                            Arsipkan
                          </button>
                        )}

                        {note.archived && (
                          <button
                            id="ButtonUnarchive"
                            className="Note-action"
                            type="button"
                            onClick={() => handleNoteUnarchive(note.id)}
                          >
                            Batal arsip
                          </button>
                        )}

                        <button
                          id="ButtonDelete"
                          className="Note-action"
                          type="button"
                          onClick={() => handleNoteDelete(note.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Masonry>
            )}
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};

export default Search;
