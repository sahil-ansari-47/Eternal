import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: "//start your code here",
      extensions: [basicSetup, javascript()],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return <div ref={editorRef} className="h-2/3" />;
}
