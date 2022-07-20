import useIconProps, { UseIconProps } from "hooks/useIconProps";

const Search = (props: UseIconProps) => {
  const iconProps = useIconProps(props);

  return (
    <svg {...iconProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.6565 11.8578C26.1892 6.39049 17.3249 6.39049 11.8576 11.8578C6.39021 17.3252 6.39021 26.1895 11.8576 31.6568C17.3249 37.1242 26.1892 37.1242 31.6565 31.6568C37.1239 26.1895 37.1239 17.3252 31.6565 11.8578ZM9.02913 9.0294C16.0586 1.99996 27.4555 1.99996 34.485 9.0294C41.0364 15.5808 41.4819 25.926 35.8215 32.9933L42.9703 40.1421L40.1418 42.9705L32.9931 35.8218C25.9257 41.4822 15.5805 41.0367 9.02913 34.4852C1.99969 27.4558 1.99969 16.0588 9.02913 9.0294Z"
      />
    </svg>
  );
};

export default Search;
