import { CodeOption } from "@/modules/closet/type";
import Accordion from "../../../shared/ui/accordion/Accordion";
import MultiSelectChipGroup from "../../../shared/ui/chip/MultiSelectChipGroup";

type Props = {
  id: string;
  title: string;
  items: CodeOption[];
  selected: string[]; // code_id 배열
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  error?: string;
};

const AccordionSelectedField = ({
  id,
  title,
  items,
  selected,
  isOpen,
  onToggle,
  onSelect,
  error,
}: Props) => {
  // 선택된 code_id들에 해당되는 code_name들은 찾아 콤마로 연결.
  const selectedNames = items
    .filter((item) => selected.includes(item.code_id))
    .map((item) => item.code_name)
    .join(",");
  return (
    <div id={`field-${id}`} className="flex flex-col gap-1">
      <Accordion
        title={title}
        onClick={onToggle}
        selected={selectedNames || ""}
        isOpen={isOpen}
      >
        <MultiSelectChipGroup
          items={items}
          selected={selected}
          onClick={onSelect}
        />
      </Accordion>
      {error && (
        <p className="text-red-500 text-xs px-1 font-medium animate-in fade-in duration-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default AccordionSelectedField;
