"use client";
import { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";

export default function TagInput({
  placeholder = "Add a tag",
  value = [],
  onChange,
}) {
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
    <div className="flex flex-col gap-4 w-full">
      {/* Scrollable Input Area */}
      <div className="border-1 border-gray-200 bg-white rounded-2xl px-4 py-3  flex flex-wrap gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow border-none outline-none bg-transparent text-sm text-muted-foreground  placeholder-muted-foreground"
        />
      </div>

      {/* Scrollable Tag List */}
      <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm px-2 font-semibold">Selected Tags</p>
      <div className="bg-white h-[200px] border-1 border-gray-200 rounded-2xl p-4 max-h-35 overflow-y-scroll">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 text-muted-foreground px-3 py-1 border border-gray-200 rounded-full text-xs"
            >
              <span className="font-medium text-sm">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="border-gray-200 hover:text-gray-600  transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
