import IconWrapper, { IconWrapperProps } from "./IconWrapper";

const Link = (props: IconWrapperProps) => (
  <IconWrapper  {...props}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.565 31.7781C9.00288 33.3402 9.00288 35.8729 10.565 37.435C12.1271 38.9971 14.6597 38.9971 16.2218 37.435L24.7071 28.9497C26.2692 27.3876 26.2692 24.855 24.7071 23.2929L27.5355 20.4644C30.6597 23.5886 30.6597 28.6539 27.5355 31.7781L19.0503 40.2634C15.9261 43.3876 10.8607 43.3876 7.73655 40.2634C4.61236 37.1392 4.61236 32.0739 7.73655 28.9497L12.6863 24L15.5147 26.8284L10.565 31.7781ZM20.4645 27.5355C17.3403 24.4113 17.3403 19.346 20.4645 16.2218L28.9498 7.73651C32.0739 4.61232 37.1393 4.61232 40.2635 7.73651C43.3877 10.8607 43.3877 15.926 40.2635 19.0502L35.3137 24L32.4853 21.1715L37.435 16.2218C38.9971 14.6597 38.9971 12.127 37.435 10.5649C35.8729 9.00284 33.3403 9.00284 31.7782 10.5649L23.2929 19.0502C21.7308 20.6123 21.7308 23.145 23.2929 24.7071L20.4645 27.5355Z"
      />
    </svg>
  </IconWrapper>
);

export default Link;