import React from "react";

export default function Field({ label, value, setItem, item }) {

  const handleTextChange = (key, event) => {
    setItem({ ...item, [key]: event.target.value });
  };

  const handleCheckboxChange = (key, event) => {
    setItem({ ...item, [key]: event.target.checked });
  };

  const renderCheckbox = (key, value) => {
    return (
      <div>
        <input name={key} type='checkbox' checked={value} onChange={(event) => handleCheckboxChange(key, event)} />
      </div>
    );
  };

  const renderInputText = (key, value) => {
    return (
      <div>
        <input name={key} type='text' value={value} onChange={(event) => handleTextChange(key, event)} />
      </div>
    );
  };

  const renderField = (key, value) => {

    if (typeof value == 'string' || typeof value == 'number') {
      return (renderInputText(key, value));
    }

    if (typeof value == 'boolean') {
      return (renderCheckbox(key, value));
    }
  };

  return (
    <div>
      <label>{label}
        <span>{renderField(label, value)}</span>
      </label>
    </div>
  );
}
