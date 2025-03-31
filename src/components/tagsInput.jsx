"use client";
import { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";

export default function TagInput({ placeholder = "Add a tag", value = [], onChange }) {
  const [tags, setTags] = useState(value);
  const [inputValue, setInputValue] = useState("");

  // Sync internal state when parent value changes
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

  return (
    <div className="w-full border rounded-xl p-2 flex flex-wrap  gap-2 bg-white focus-within:ring-1 focus-within:ring-indigo-400/70">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex justify-center items-center bg-gray-100  text-muted-foreground px-3 py-1 border border-gray-200 rounded-full text-xs"
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
        placeholder={placeholder}
        className="flex-grow p-1 text-sm focus:outline-none"
      />
    </div>
  );
}
