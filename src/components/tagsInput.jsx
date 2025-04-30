"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import useStore from "@/store/useStore";

export default function TagInput({
  placeholder = "Enter IDs",
}) {
  const [inputValue, setInputValue] = useState("");
  const { tags, setTags } = useStore()


  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const updatedTags = [...tags, trimmed];
      setTags(updatedTags);
    }
  };

  const cleanInput = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        return parsed.map(String).join(",");
      }
    } catch (e) {}

    return input
      .replace(/^["'\[{]+|["'\]}]+$/g, '')
      .replace(/["'\]]/g, '')
      .replace(/\s*,\s*/g, ',')
      .replace(/\n/g, ',')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const addMultipleTags = (tagString) => {
    const cleanedInput = cleanInput(tagString);
    const newTags = cleanedInput
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag && !tags.includes(tag));
    
    if (newTags.length) {
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (/[,"'\[\]]/.test(inputValue)) {
        addMultipleTags(inputValue);
      } else {
        addTag(inputValue);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    addMultipleTags(pasteData);
    setInputValue("");
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
            className="ml-2 text-muted-foreground hover:text-gray-400"
          >
            <X className="cursor-pointer" size={14} />
          </button>
        </div>
      ))}

      <input
        type="number"
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