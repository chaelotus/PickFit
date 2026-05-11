import { ImageSourceOptionProps } from "@/modules/closet/type";

const ImageSourceOption = ({
  icon: Icon,
  label,
  type = "button",
  onChange,
  onClick,
  capture,
}: ImageSourceOptionProps) => {
  // 공통 스타일 클래스
  const containerClasses =
    "flex flex-col items-start gap-2 p-5 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors text-left w-full ";

  if (type === "file") {
    return (
      <label className={containerClasses}>
        <Icon className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
        <p className="font-medium text-gray-700 mt-1">{label}</p>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          capture={capture}
          onChange={onChange}
        />
      </label>
    );
  }
  return (
    <button type="button" className={containerClasses} onClick={onClick}>
      <Icon className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
      <p className="font-medium text-gray-700 mt-1">{label}</p>
    </button>
  );
};

export default ImageSourceOption;
