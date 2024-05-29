import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export const CopyHelper = ({
  clipboard,
  content,
}: {
  clipboard: string;
  content: string;
}) => {
  const [validated, showValidated] = useState(false);
  useEffect(() => {
    if (validated) {
      setTimeout(() => showValidated(false), 800);
    }
  }, [showValidated, validated]);
  return (
    <div
      className="flex gap-2 justify-center items-center hover:cursor-pointer p-1 text-gray-500"
      onClick={() => {
        navigator.clipboard.writeText(clipboard);
        showValidated(true);
      }}
    >
      <div>{content}</div>
      {validated ? <Check size={15} /> : <Copy size={15} />}
    </div>
  );
};
