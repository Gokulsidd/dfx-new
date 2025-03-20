"use client"
import { useState } from "react";
import { X } from "lucide-react";

export default function TagInput({ placeholder = "Add a tag", onChange }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
    <div className="w-full border rounded-xl p-2 flex flex-wrap gap-2 bg-white focus-within:ring-2 focus-within:ring-blue-400">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            <X className="w-4 h-4" />
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
