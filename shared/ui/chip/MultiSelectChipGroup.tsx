type Props = {
  items: string[];
  selected: string[];
  onClick: (value: string) => void;
};

const MultiSelectChip = ({ items, selected, onClick }: Props) => {
  return items.map((item) => {
    const isActive = selected.includes(item);
    return (
      <button
        type="button"
        key={item}
        onClick={() => onClick(item)}
        className={`mb-2 border px-2 py-1 rounded-lg mr-2 ${isActive ? "bg-blue-600 text-white" : ""} cursor-pointer`}
      >
        {item}
      </button>
    );
  });
};

export default MultiSelectChip;
