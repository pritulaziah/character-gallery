import useIconProps, { UseIconProps } from "hooks/useIconProps";

const Loading = (props: UseIconProps) => {
  const iconProps = useIconProps(props);

  return (
    <svg {...iconProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24H44C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4V8Z"
      />
    </svg>
  );
};

export default Loading;
