"use client";

import { useEffect, useRef } from "react";
import { Bold, Eraser, Italic, List, ListOrdered, Underline } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const toolbarButtons = [
  { label: "Bold", command: "bold", icon: Bold },
  { label: "Italic", command: "italic", icon: Italic },
  { label: "Underline", command: "underline", icon: Underline },
  { label: "Bulleted list", command: "insertUnorderedList", icon: List },
  { label: "Numbered list", command: "insertOrderedList", icon: ListOrdered },
];

const fontSizes = [
  { label: "Small", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Large", value: "18px" },
  { label: "Lead", value: "20px" },
  { label: "Title", value: "24px" },
  { label: "Display", value: "30px" },
];

function normalizeFontTags(html: string) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  wrapper.querySelectorAll("font[size]").forEach((font) => {
    const span = document.createElement("span");
    span.innerHTML = font.innerHTML;
    span.style.fontSize = font.getAttribute("data-font-size") || fontSizes[1].value;
    font.replaceWith(span);
  });

  return wrapper.innerHTML;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor || editor.innerHTML === value) return;
    editor.innerHTML = value;
  }, [value]);

  const syncValue = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const normalized = normalizeFontTags(editor.innerHTML);
    if (normalized !== editor.innerHTML) editor.innerHTML = normalized;
    onChange(normalized);
  };

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    syncValue();
  };

  const applyFontSize = (size: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand("fontSize", false, "4");
    editor.querySelectorAll('font[size="4"]').forEach((font) => font.setAttribute("data-font-size", size));
    syncValue();
  };

  return (
    <div className="border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
        <select
          aria-label="Text style"
          defaultValue="p"
          onChange={(event) => runCommand("formatBlock", event.target.value)}
          className="h-9 border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        >
          <option value="P">Paragraph</option>
          <option value="H2">Heading</option>
          <option value="H3">Subheading</option>
        </select>
        <select
          aria-label="Font size"
          defaultValue="16px"
          onChange={(event) => applyFontSize(event.target.value)}
          className="h-9 border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        >
          {fontSizes.map((size) => <option key={size.value} value={size.value}>{size.label}</option>)}
        </select>
        {toolbarButtons.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.command}
              type="button"
              title={button.label}
              aria-label={button.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(button.command)}
              className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <Icon size={16} />
            </button>
          );
        })}
        <button
          type="button"
          title="Clear formatting"
          aria-label="Clear formatting"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => runCommand("removeFormat")}
          className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <Eraser size={16} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-label="Blog content editor"
        className="admin-rich-editor"
        onInput={syncValue}
        onBlur={syncValue}
        suppressContentEditableWarning
      />
    </div>
  );
}
