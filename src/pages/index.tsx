import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCallback } from "react";

import { AppBar, AppBarActions, AppBarBrand } from "@/components/app-bar";
import { CreateNote } from "@/components/create-note";
import { Masonry } from "@/components/masonry";
import { DeleteNoteDialog, SuccessToast } from "@/components/swal";
import { INote, useNote } from "@/hooks/note";

const DefaultLayout = dynamic(
  () => import("@/layouts/default/default.component"),
  { ssr: false },
);

const Home: NextPage = () => {
  const { archiveNote, deleteNote, notArchivedNotes, storeNote } = useNote();

  const handleNoteStore = useCallback(
    (note: Pick<INote, "content" | "title">) => storeNote(note),
    [storeNote],
  );

  const handleNoteArchive = useCallback(
    (noteId: string) => {
      archiveNote(noteId);
      SuccessToast("Catatan berhasil diarsip");
    },
    [archiveNote],
  );

  const handleNoteDelete = useCallback(
    async (noteId: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        deleteNote(noteId);
        SuccessToast("Catatan berhasil dihapus");
      }
    },
    [deleteNote],
  );

  return (
    <>
      <Head>
        <title>Catat apapun yang kamu inginkan! - myNotes</title>
      </Head>

      <DefaultLayout>
        <AppBar>
          <AppBarBrand>myNotes</AppBarBrand>
          <AppBarActions />
        </AppBar>

        <main>
          <CreateNote onClose={handleNoteStore} />

          <div className="Container">
            {notArchivedNotes.length < 1 ? (
              <p className="text-center text-gray-500">
                Kamu belum membuat catatan. Yuk, buat sekarang.
              </p>
            ) : (
              <Masonry>
                {notArchivedNotes.map((notArchivedNote, index) => {
                  return (
                    <div key={index} className="Note">
                      {notArchivedNote.title && (
                        <div className="Note-title">
                          <p>{notArchivedNote.title}</p>
                        </div>
                      )}

                      <div className="Note-content">
                        <span>{notArchivedNote.content}</span>
                      </div>

                      <div className="Note-actions">
                        <button
                          id="ButtonArchive"
                          className="Note-action"
                          type="button"
                          onClick={() => handleNoteArchive(notArchivedNote.id)}
                        >
                          Arsipkan
                        </button>

                        <button
                          id="ButtonDelete"
                          className="Note-action"
                          type="button"
                          onClick={() => handleNoteDelete(notArchivedNote.id)}
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

export default Home;
