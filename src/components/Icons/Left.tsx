import useIconProps, { UseIconProps } from "hooks/useIconProps";

const Left = (props: UseIconProps) => {
  const iconProps = useIconProps(props);

  return (
    <svg {...iconProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5858 6.9856L33.4142 9.81402L19.2721 23.9562L33.4142 38.0983L30.5858 40.9267L15.0296 25.3705C15.0295 25.3704 15.0295 25.3704 16.4437 23.9562L15.0296 25.3705L13.6153 23.9562L30.5858 6.9856Z"
      />
    </svg>
  );
};

export default Left;
