import { logOut } from "@/lib/logOut";
import { Button } from "./ui/button";

export const SessionManager = ({
  json,
  jwt,
}: {
  json: string;
  jwt: string;
}) => {
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <h2>Session</h2>
        <Button onClick={() => logOut(jwt)}>Log Out</Button>
      </div>
      <pre className="text-gray-500 bg-slate-50 py-3 px-5 rounded-md border border-solid border-slate-200 text-xs">
        {json}
      </pre>
    </div>
  );
};
