import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Socket } from "socket.io-client";

export const Editor = ({
  socket,
  roomId,
}: {
  socket: Socket | null
  roomId: string
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const isApplyingRemoteChange = useRef(false);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: "// start",
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            if (isApplyingRemoteChange.current) {
              isApplyingRemoteChange.current = false;
              return;
            }

            const code = update.state.doc.toString();
            socketRef.current?.emit('code-change', { roomId, code });
          }
        })
      ]
    });

    const view = new EditorView({ state: startState, parent: editorRef.current });
    viewRef.current = view;

    return () => {
      viewRef.current = null;
      view.destroy();
    };
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleCodeUpdate = (incomingCode: string) => {
      const view = viewRef.current;
      if (!view) return;

      const currentCode = view.state.doc.toString();
      if (incomingCode === currentCode) return;

      isApplyingRemoteChange.current = true;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: incomingCode },
      });
    };

    socket.on('code-update', handleCodeUpdate);

    return () => {
      socket.off('code-update', handleCodeUpdate);
    };
  }, [socket]);

  return <div ref={editorRef} style={{ height: '100vh' }} />;
};