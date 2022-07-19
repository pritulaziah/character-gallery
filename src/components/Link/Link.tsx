import styled from "@emotion/styled/macro";
import React, { AnchorHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  children: React.ReactNode;
}

const StyledLink = styled("a")<{ disabled?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #165dff;
  opacity: 1;
  transition: color 0.3s;
  text-decoration: none;

  ${(props) =>
    props.disabled &&
    `
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
  `}

  &:hover {
    color: #0e42d2;
  }
`;

const Link = ({ disabled, children, ...other }: IProps) => {
  const navigate = useNavigate();
  const isExternal = /(https?:\/\/)(www\.)?/;
  const isTargetBlank = other.target === "_blank";

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isTargetBlank || isExternal) {
      return;
    }

    event.preventDefault();
    other.href && navigate(other.href);
  };

  if (isTargetBlank && !("rel" in other)) {
    other.rel = "noopener noreferrer";
  }

  if (disabled) {
    other.tabIndex = -1;
    other["aria-disabled"] = true;
  }

  return (
    <StyledLink {...other} onClick={onClick} disabled={disabled}>
      {children}
    </StyledLink>
  );
};

export default Link;
