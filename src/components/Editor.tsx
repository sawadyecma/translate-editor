import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

const EDITTOR_HOLDER_ID = "editorjs";

export const Editor = () => {
  const ejInstance = useRef<EditorJS>();
  useEffect(() => {
    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        onReady: () => {
          ejInstance.current = editor;
        },
      });
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = undefined;
    };
  }, []);

  return <div id={EDITTOR_HOLDER_ID}></div>;
};
