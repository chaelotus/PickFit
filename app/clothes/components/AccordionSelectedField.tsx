import Accordion from "./Accordion";
import MultiSelectChipGroup from "./MultiSelectChipGroup";

type Props = {
  title: string;
  items: string[];
  selected: string[];
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
  return (
    <Accordion
      title={title}
      onClick={onToggle}
      selected={selected.join(",")}
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
