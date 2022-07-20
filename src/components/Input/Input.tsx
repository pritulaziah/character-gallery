import { ChangeEvent, InputHTMLAttributes, FocusEvent, useState } from "react";
import useUncontrolled from "hooks/useUncontrolled";
import styled from "@emotion/styled/macro";

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  disabled?: boolean;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  after?: React.ReactNode;
}

const StyledInput = styled("input")`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: 0;
  outline: none;
  background: none;
  border: none;
  border-radius: 0;
  font-size: inherit;
`;

const StyledContainerInput = styled("div")<{ isFocused: boolean }>`
  background-color: #f2f3f5;
  border-radius: 2px;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
  display: flex;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  border: 1px solid transparent;

  ${(props) =>
    props.isFocused &&
    `
      background-color: #FFFFFF;
      border-color: #165DFF;
  `}

  &::placeholder {
    color: #86909c;
  }
`;

const StyledAfter = styled("div")`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

const Input = (props: IProps) => {
  const [isFocused, setFocused] = useState(false);
  const { value, onChange, disabled, after, ...other } = useUncontrolled<
    IProps,
    {
      value: string;
      onChange: (value: string) => void;
    }
  >(props, "value", "onChange", "");

  const onFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    other.onFocus?.(event);
    setFocused(true);
  };
  const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    other.onBlur?.(event);
    setFocused(false);
  };

  return (
    <StyledContainerInput isFocused={isFocused}>
      <StyledInput
        {...other}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value, event)}
        value={value}
      />
      <StyledAfter>{after}</StyledAfter>
    </StyledContainerInput>
  );
};

export default Input;
