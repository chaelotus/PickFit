import { CodeOption } from "@/modules/closet/type";
import Accordion from "../../../shared/ui/accordion/Accordion";
import MultiSelectChipGroup from "../../../shared/ui/chip/MultiSelectChipGroup";

type Props = {
  title: string;
  items: CodeOption[];
  selected: string[]; // code_id 배열
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

const AccordionSelectedField = ({
  title,
  items,
  selected,
  isOpen,
  onToggle,
  onSelect,
}: Props) => {
  // 선택된 code_id들에 해당되는 code_name들은 찾아 콤마로 연결.
  const selectedNames = items
    .filter((item) => selected.includes(item.code_id))
    .map((item) => item.code_name)
    .join(",");
  return (
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
  );
};

export default AccordionSelectedField;
