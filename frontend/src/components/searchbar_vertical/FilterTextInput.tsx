import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
  stateValue: any;
  setStateValue: (v: any) => void;
  placeholder?: string;
}

export const FilterNumberInput = ({
  stateValue,
  setStateValue,
  placeholder = "",
}: Props) => {
  const stateNumber = parseFloat(stateValue);
  const inputRef = useRef(null);
  const [value, setValue] = useState<string>(
    Number.isNaN(stateNumber) ? "" : stateValue
  );

  const onSubmit = (e: any) => {
    e.preventDefault();

    const v = parseFloat(e.target.value);

    if (!Number.isNaN(v)) {
      setStateValue(v);
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    setValue(Number.isNaN(stateNumber) ? "" : stateValue);
  }, [stateValue]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        (inputRef as any).current.blur();
      }}
    >
      <Form.Control
        ref={inputRef}
        value={value}
        type="number"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onSubmit(e)}
      />
    </Form>
  );
};

export default FilterNumberInput;
