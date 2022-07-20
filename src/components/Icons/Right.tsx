import useIconProps, { UseIconProps } from "hooks/useIconProps";

const Right = (props: UseIconProps) => {
  const iconProps = useIconProps(props);

  return (
    <svg {...iconProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4142 40.927L14.5858 38.0986L28.7279 23.9564L14.5858 9.8143L17.4142 6.98588L32.9704 22.5421C32.9705 22.5422 32.9705 22.5422 31.5563 23.9564L32.9704 22.5421L34.3847 23.9564L17.4142 40.927Z"
      />
    </svg>
  );
};

export default Right;
