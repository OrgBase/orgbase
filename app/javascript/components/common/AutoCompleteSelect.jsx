import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const AutoCompleteSelect = ({users, updateSelection, placeholder}) => {
  const animatedComponents = makeAnimated()
  const handleChange = (newValue) => {
    updateSelection(newValue)
  };
  return (
    <CreatableSelect
      isMulti
      placeholder={placeholder || "Enter their names or email and press tab"}
      components={animatedComponents}
      onChange={handleChange}
      options={users}
      formatCreateLabel={(e) => `Invite '${e}' by email`}
    />
  );
}

export default AutoCompleteSelect;