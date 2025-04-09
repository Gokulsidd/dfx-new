"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TagInput({
  placeholder = "Enter ID",
  value = [],
  onChange,
}) {
  const [tags, setTags] = useState(value);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTags(value);
  }, [value]);

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const updatedTags = [...tags, trimmed];
      setTags(updatedTags);
      onChange?.(updatedTags);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pastedTags = paste.split(",").map((t) => t.trim());
    const newTags = pastedTags.filter((tag) => tag && !tags.includes(tag));
    if (newTags.length > 0) {
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      onChange?.(updatedTags);
    }
    setInputValue("");
    e.preventDefault(); // avoid pasting the entire string into input
  };

  return (
    <div className="bg-white h-[200px] border-1 border-gray-200 rounded-2xl p-4 max-h-40 overflow-y-scroll">
        <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <div
          key={index}
           className="flex items-center gap-2 bg-gray-100 text-muted-foreground px-3 py-1 border border-gray-200 rounded-full text-xs"
        >
          <p>{tag}</p>
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-2 text-muted-foreground hover:text-indigo-400"
          >
            <X className="cursor-pointer" size={14} />
          </button>
        </div>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="flex-grow p-1 text-sm focus:outline-none"
      />
    </div>
</div>
  );
}
