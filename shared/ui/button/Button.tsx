interface ButtonProps {
  value: string;
  w: number | string;
  color: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button = ({ value, w, color, type = "button" }: ButtonProps) => {
  return (
    <button
      className={`w-${w} bg-${color} text-white py-[10px] text-lg rounded-md cursor`}
      type={`${type}`}
    >
      {value}
    </button>
  );
};

export default Button;
