import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  selected?: string;
  onClick: () => void;
  isOpen: boolean;
  children: ReactNode;
};

const Accordion = ({ title, selected, onClick, isOpen, children }: Props) => {
  return (
    <div className="w-full py-2 px-4 my-2">
      <div
        className="flex justify-between items-center text-lg cursor-pointer"
        onClick={onClick}
      >
        <div className="font-medium">{title}</div>
        <div className="flex items-center">
          <span
            className="mr-2 text-blue-600 truncate max-w-[150px]"
            title={selected}
          >
            {selected}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "-rotate-180" : ""}`}
          />
        </div>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Accordion;
