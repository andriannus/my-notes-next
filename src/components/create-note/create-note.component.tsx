import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";

import { Button } from "@/components/button";
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
    <div
      className={styles.CreateNote}
      onClick={() => setFormStatus(!isFormShown)}
    >
      {!isFormShown && (
        <div className={styles["CreateNote-onBoard"]}>
          <span>Buat catatan...</span>
        </div>
      )}

      {isFormShown && (
        <div>
          <TextField
            id="TxtTitle"
            value={note.title}
            className="mb-sm"
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
