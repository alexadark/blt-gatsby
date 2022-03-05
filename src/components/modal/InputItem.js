import React from "react";

export default function InputItem({
  id,
  name,
  labelText,
  type,
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
}) {
  return (
    <>
      <div>
        <label className="block mb-1 font-bold" htmlFor={id}>
          {labelText}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder ?? ""}
          className="h-14 w-full border-2 border-grey2 focus:placeholder-transparent focus:border-grey3 focus:outline-none focus:ring-transparent px-3"
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
        />
      </div>
    </>
  );
}
