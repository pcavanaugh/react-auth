import React from 'react';
import styles from './join.module.css';

const InputField = ({
  label,
  placeholder,
  errorMessage,
  inputRef,
  name,
  type
}) => (
  <div className={ styles.formInput }>
    <div>{ label }</div>
    <input
      placeholder={ placeholder }
      className={ styles.input }
      name={ name }
      ref={ inputRef }
      type={ type || 'text' }
    />
    <div className="errorMessage">{ errorMessage }</div>
  </div>
);

export default InputField;
