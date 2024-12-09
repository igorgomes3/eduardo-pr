"use client";
import React from "react";

function ButtonStyles({ variant = "primary", text, keyboardCommand, onClick }) {
  const baseClasses =
    "font-inter font-medium rounded-lg px-4 py-2 inline-block";
  const primaryClasses = "bg-[#101012] text-white border border-[#3D3D3F]";
  const secondaryClasses =
    "bg-transparent text-[#101012] border border-[#D1D1D3]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : secondaryClasses
      }`}
    >
      {text}
      {keyboardCommand && (
        <span
          className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
            variant === "primary"
              ? "bg-[#3D3D3F] text-white"
              : "bg-[#D1D1D3] text-[#101012]"
          }`}
        >
          {keyboardCommand}
        </span>
      )}
    </button>
  );
}

function ButtonStylesStory() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-bold mb-2">Primary Button</h2>
        <ButtonStyles text="Click me" onClick={handleClick} />
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">
          Primary Button with Keyboard Command
        </h2>
        <ButtonStyles text="Save" keyboardCommand="⌘S" onClick={handleClick} />
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Secondary Button</h2>
        <ButtonStyles variant="secondary" text="Cancel" onClick={handleClick} />
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">
          Secondary Button with Keyboard Command
        </h2>
        <ButtonStyles
          variant="secondary"
          text="Undo"
          keyboardCommand="⌘Z"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default ButtonStyles;