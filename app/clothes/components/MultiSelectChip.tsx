type Props = {
  content: string;
  isActive: boolean;
  onClick: (value: string) => void;
};

const MultiSelectChip = ({ content, isActive, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(content)}
      className={`border px-2 py-1 rounded-lg mr-2 ${isActive ? "bg-blue-600 text-white" : ""} cursor-pointer`}
    >
      {content}
    </div>
  );
};

export default MultiSelectChip;
