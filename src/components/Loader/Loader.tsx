import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import IconLoading from "components/Icons/Loading";

type Sizes = "small" | "medium" | "large";

interface IProps {
  size?: Sizes;
  color?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoaderWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const StyledLoader = styled("span")`
  display: flex;
  animation: ${spin} 1.3s linear infinite;
`;

const sizes: { [key in Sizes]: string } = {
  small: "24px",
  medium: "48px",
  large: "60px",
};

const Loader = ({ size = "medium", color = "#4E5969" }: IProps) => {
  return (
    <StyledLoaderWrapper>
      <StyledLoader>
        <IconLoading size={sizes[size]} color={color} />
      </StyledLoader>
    </StyledLoaderWrapper>
  );
};

export default Loader;
