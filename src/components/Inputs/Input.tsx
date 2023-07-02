import { useField } from "@unform/core";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

import { Container, Error } from "./styles";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  dark?: boolean;
  border?: boolean;
  label?: string;
  required?: boolean;
}
const Input: React.FC<IInputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  dark = true,
  border = true,
  label,
  required = false,

  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

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

        <input
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
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

export default Input;
