import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Grey", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
    { name: "Navy Blue", value: "#1e3a8a" }, // very popular in resumes
    { name: "Royal Blue", value: "#2563eb" },
    { name: "Slate", value: "#475569" }, // modern, neutral
    { name: "Steel Blue", value: "#3f6ea0" },
    { name: "Forest Green", value: "#166534" }, // muted
    { name: "Olive", value: "#4d5943" }, // earthy + professional
    { name: "Burgundy", value: "#7f1d1d" }, // classy deep red
    { name: "Maroon", value: "#8b1e3f" },
    { name: "Chocolate Brown", value: "#5d4037" },
    { name: "Cool Brown", value: "#6f4e37" },
    { name: "Charcoal", value: "#2d3748" },
    { name: "Graphite", value: "#3b3f46" },
    { name: "Cobalt", value: "#0047ab" },
    { name: "Muted Purple", value: "#6d28d9" },
    { name: "Deep Cyan", value: "#0f766e" },
    { name: "Muted Coral", value: "#e26d5a" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-linear-to-r from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-neutral-400 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`}
                style={{ backgroundColor: color.value }}
              ></div>

              {selectedColor === color.value && (
                <div className="absolute top-0 right-0 bottom-4.5 flex items-center justify-center ">
                  <Check className="size-5 text-white" />
                </div>
              )}
              <p className="text-xs text-center mt-1 text-neutral-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
