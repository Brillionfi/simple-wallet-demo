import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export const CopyHelper = ({
  clipboard,
  content,
  action,
  selected,
}: {
  clipboard: string;
  content: string;
  action?: () => void;
  selected?: boolean;
}) => {
  const [validated, showValidated] = useState(false);
  useEffect(() => {
    if (validated) {
      setTimeout(() => showValidated(false), 800);
    }
  }, [showValidated, validated]);
  return (
    <div
      className={`my-1 py-1 px-3 transition-colors rounded-md flex gap-2 justify-center items-center p-1 text-gray-500 ${
        action ? "hover:cursor-pointer hover:bg-slate-300" : ""
      } ${selected ? "bg-slate-300" : ""}`}
    >
      <div onClick={action} className={``}>
        {content}
      </div>
      {validated ? (
        <Check size={15} />
      ) : (
        <Copy
          size={15}
          className="hover:cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(clipboard);
            showValidated(true);
          }}
        />
      )}
    </div>
  );
};
