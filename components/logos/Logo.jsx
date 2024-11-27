const Logo = ({
  children,
  width = "100",
  height = "100",
  viewBox = "0 0 100 100",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Logo;
