import {
  FC,
  FormEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Button } from "@/components/button";
import { TextArea } from "@/components/textarea";
import { TextField } from "@/components/text-field";

import styles from "./create-note.module.scss";

const CreateNote: FC<PropsWithChildren> = () => {
  const [isFormShown, setFormStatus] = useState(false);

  const setFocusToTextArea = useCallback(() => {
    const textArea = document.getElementById("TxtNote") as HTMLTextAreaElement;
    textArea.focus();
  }, []);

  useEffect(() => {
    if (isFormShown) setFocusToTextArea();
  }, [isFormShown, setFocusToTextArea]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFormStatus(!isFormShown);
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
        <form onSubmit={handleSubmit}>
          <TextField className="mb-sm" placeholder="Judul" value="" />

          <TextArea
            id="TxtNote"
            className="mb-bs"
            placeholder="Buat catatan..."
            value=""
          />

          <div className="text-right">
            <Button type="submit">Tutup</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateNote;
