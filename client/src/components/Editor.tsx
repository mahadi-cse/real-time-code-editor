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
      doc: "//Collaborate with your teams; This deploye happend with github action CI/CD pipeline & Vercel \nconsole.log('Hello, World!');",
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
      style={{ border: "1px solid #282C34", height: "100vh" }}
    />
  );
};