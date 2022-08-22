import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";

import { Button } from "@/components/button";
import { SuccessToast } from "@/components/swal";
import { TextArea } from "@/components/textarea";
import { TextField } from "@/components/text-field";
import { useNote } from "@/hooks/note";

import styles from "./create-note.module.scss";

interface CreateNoteProps {
  onClose(): void;
}

const CreateNote: FC<CreateNoteProps> = ({ onClose }) => {
  const [isFormShown, setFormStatus] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const setFocusToTextArea = useCallback(() => {
    const textArea = document.getElementById(
      "TxtContent",
    ) as HTMLTextAreaElement;

    textArea.focus();
  }, []);

  useEffect(() => {
    if (isFormShown) {
      setFocusToTextArea();
    } else {
      setNote({ title: "", content: "" });
    }
  }, [isFormShown, setFocusToTextArea]);

  const { storeNote } = useNote();

  function handleButtonClick(): void {
    const hasContentOrTitle = !!note.content || !!note.title;

    if (hasContentOrTitle) {
      storeNote(note);
      setNote({ content: "", title: "" });
      SuccessToast("Catatan berhasil dibuat");
    }

    setFormStatus(!isFormShown);
    onClose();
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    setNote({
      ...note,
      title: event.target.value,
    });
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setNote({
      ...note,
      content: event.target.value,
    });
  }

  return (
    <div className={styles.CreateNote}>
      {!isFormShown && (
        <div
          className={styles["CreateNote-onBoard"]}
          onClick={() => setFormStatus(!isFormShown)}
        >
          <span>Buat catatan...</span>
        </div>
      )}

      {isFormShown && (
        <div className="px-xs py-sm">
          <TextField
            id="TxtTitle"
            value={note.title}
            className="mb-sm"
            counter={50}
            placeholder="Judul"
            onChange={handleTitleChange}
          />

          <TextArea
            id="TxtContent"
            value={note.content}
            className="mb-bs"
            placeholder="Buat catatan..."
            onChange={handleContentChange}
          />

          <div className="text-right">
            <Button type="button" onClick={handleButtonClick}>
              Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CreateNote);
