import { useEffect, useRef } from "react";

import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: " //Collaborate with your teams;",
      extensions: [basicSetup, javascript(), oneDark]
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    return () => view.destroy();
  }, []);

  return (
    <div
      ref={editorRef}
      style={{ border: "1px solid #000000", height: "100vh" }}
    />
  );
};