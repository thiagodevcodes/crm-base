"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { useEffect } from "react";

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      TextStyle,
      Color,
      FontFamily,
      FontSize,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[350px] p-6 focus:outline-none bg-white text-black [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
      },
    },
  });

  const editorState = useEditorState({
    editor,

    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,

      isH1:
        editor?.isActive("heading", {
          level: 1,
        }) ?? false,

      isH2:
        editor?.isActive("heading", {
          level: 2,
        }) ?? false,

      isH3:
        editor?.isActive("heading", {
          level: 3,
        }) ?? false,

      isBulletList: editor?.isActive("bulletList") ?? false,

      isBlockquote: editor?.isActive("blockquote") ?? false,

      isCodeBlock: editor?.isActive("codeBlock") ?? false,
    }),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const buttonClass = (active?: boolean) =>
    `
    h-10 w-10
    flex items-center justify-center
    rounded-xl
    transition-all duration-200
    border border-gray-300
    cursor-pointer
    ${active ? "bg-black text-white" : "bg-white text-black"}
  `;

  return (
    <div
      className="
        border border-gray-300
        rounded-md
        overflow-hidden
        bg-white
      "
    >
      {/* TOOLBAR */}
      <div
        className="
          flex flex-wrap items-center gap-2
          p-4 border-b border-gray-300
          bg-white
        "
      >
        {/* BOLD */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editorState?.isBold)}
        >
          <Bold size={18} />
        </button>

        {/* ITALIC */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editorState?.isItalic)}
        >
          <Italic size={18} />
        </button>

        {/* H1 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonClass(editorState?.isH1)}
        >
          <Heading1 size={18} />
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editorState?.isH2)}
        >
          <Heading2 size={18} />
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buttonClass(editorState?.isH3)}
        >
          <Heading3 size={18} />
        </button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* ALIGN LEFT */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={buttonClass()}
        >
          <AlignLeft size={18} />
        </button>

        {/* ALIGN CENTER */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={buttonClass()}
        >
          <AlignCenter size={18} />
        </button>

        {/* ALIGN RIGHT */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={buttonClass()}
        >
          <AlignRight size={18} />
        </button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* LIST */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editorState?.isBulletList)}
        >
          <List size={18} />
        </button>

        {/* QUOTE */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editorState?.isBlockquote)}
        >
          <Quote size={18} />
        </button>

        {/* CODE */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buttonClass(editorState?.isCodeBlock)}
        >
          <Code2 size={18} />
        </button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* COLOR */}
        <input
          type="color"
          onInput={(e: any) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="
            h-10 w-10
            rounded-xl
            cursor-pointer
            overflow-hidden
          "
        />
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} />
    </div>
  );
}
