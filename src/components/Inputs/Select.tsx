import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";
import { useField } from "@unform/core";

import { IconBaseProps } from "react-icons";

import { FiAlertCircle } from "react-icons/fi";
import { Container, Error } from "./styles";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  dark?: boolean;
  border?: boolean;
  label?: string;
  required?: boolean;
}
const Select: React.FC<Props> = ({
  name,
  containerStyle = {},
  icon: Icon,
  dark = true,
  border = true,
  label,
  required = false,

  ...rest
}) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const defValue = useMemo(() => {
    if (defaultValue as Date) {
      return defaultValue.split("T")[0];
    }
    return defaultValue;
  }, [defaultValue]);
  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isField}
      isErrored={!!error}
      dark={dark}
      border={border}
    >
      {label && (
        <label htmlFor={fieldName}>
          {label}
          {required && <strong> *</strong>}
        </label>
      )}
      <div className={rest.disabled ? "disabled" : ""}>
        {Icon && <Icon size={16} />}

        <ReactSelect
          className="InputSelect"
          classNamePrefix="InputSelect"
          styles={{
            control: (styles) => ({
              ...styles,
              ":hover": {
                ...styles[":hover"],
                border: "0 !important",
                cursor: "pointer",
              },
              border: "0 !important",
              boxShadow: "0 !important",
            }),
          }}
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={selectRef}
          defaultValue={defValue}
          {...rest}
        />

        {error && (
          <Error title={error} className="err">
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default Select;
