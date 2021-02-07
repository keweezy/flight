import React from 'react';
import './styles.scss';


const Textbox = ({
  label,
  onChange,
  name,
  value,
  placeholder,
  boxClasses,
  type,
  error,
  disabled,
  min,
  customRef,
}) => {
  return (
    <div className={`${boxClasses} textbox`}>
      <fieldset
        className={`${error && 'error'} ${disabled && 'disabled-input'}`}
      >
        <legend
          id="label-legend"
          className={` ${error && 'label-error'}`}
        >
          {label}
        </legend>
        <div >
          <input
            autoComplete="off"
            min={min && min}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            disabled={disabled && disabled}
            ref={customRef}
          />
        </div>
      </fieldset>
      <p className={`${error ? '' : ''} input-error`}>
        {error}
      </p>
    </div>
  );
};

export default Textbox;
