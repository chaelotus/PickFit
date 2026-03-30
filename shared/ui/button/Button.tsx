const Button = ({
  value,
  w,
  color,
}: {
  value: string;
  w: number | string;

  color: string;
}) => {
  return (
    <button
      className={`w-${w} bg-${color} text-white py-[10px] text-lg rounded-md cursor`}
    >
      {value}
    </button>
  );
};

export default Button;
