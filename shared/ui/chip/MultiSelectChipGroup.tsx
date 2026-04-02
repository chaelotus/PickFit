import { CodeOption } from "@/modules/closet/type";

type Props = {
  items: CodeOption[];
  selected: string[]; // code_id값이 들어오게
  onClick: (value: string) => void;
};

const MultiSelectChip = ({ items, selected, onClick }: Props) => {
  return items.map((item) => {
    // 선택 여부는 code_id로 확인
    const isActive = selected.includes(item.code_id);
    return (
      <button
        type="button"
        key={item.code_id}
        onClick={() => onClick(item.code_id)}
        className={`mb-2 border px-2 py-1 rounded-lg mr-2 ${isActive ? "bg-blue-600 text-white" : ""} cursor-pointer`}
      >
        {item.code_name}
      </button>
    );
  });
};

export default MultiSelectChip;
