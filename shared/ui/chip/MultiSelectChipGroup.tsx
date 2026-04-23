import { CodeOption } from "@/modules/closet/type";

type Props = {
  items: CodeOption[];
  selected: string[]; // code_id값이 들어오게
  onClick: (value: string) => void;
};

const MultiSelectChip = ({ items, selected, onClick }: Props) => {
  return items.map((item) => {
    const isColorItem = item.p_id === "COLOR";
    // 선택 여부는 code_id로 확인
    const isActive = selected.includes(item.code_id);
    return (
      <button
        type="button"
        key={item.code_id}
        onClick={() => onClick(item.code_id)}
        className={`inline-flex items-center gap-2 mb-2 border px-2 py-1 rounded-lg mr-2 ${isActive ? "bg-blue-600 text-white" : ""} cursor-pointer`}
      >
        {isColorItem && (
          <span
            className="inline-block w-3 h-3 rounded-sm border border-black/10"
            style={{ backgroundColor: item.intro }}
          ></span>
        )}
        <span className="text-sm font-medium">{item.code_name}</span>
      </button>
    );
  });
};

export default MultiSelectChip;
