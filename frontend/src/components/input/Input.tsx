import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, label, ...rest }: any) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });

  }, [fieldName, registerField]);
  return (
    <>
	  <input className="form-control" ref={inputRef} id={fieldName} defaultValue={defaultValue} {...rest} />	  
	  <label htmlFor={fieldName}>{label}</label>

      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}