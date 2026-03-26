import { PencilLine } from "lucide-react";

type Props = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({ value, onChange, placeholder }: Props) => {
  return (
    <div className="relative w-full mb-2">
      <input
        value={value}
        onChange={onChange}
        className="w-full rounded border px-3 py-2"
        placeholder={placeholder}
      />
      <PencilLine
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default Input;
