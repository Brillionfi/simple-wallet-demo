import { logOut } from "@/lib/logOut";
import { Button } from "./ui/button";
import { CopyHelper } from "./ui/copy";

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
        <Button onClick={() => logOut(jwt)} variant={"destructive"}>
          Log Out
        </Button>
      </div>
      <div className={"relative"}>
        <pre className="text-gray-500 bg-slate-50 py-3 px-5 rounded-md border border-solid border-slate-200 text-xs">
          {json}
        </pre>
        <div
          className={
            "absolute right-1 bottom-1 p-1 border border-slate-200 rounded-md bg-white"
          }
        >
          <CopyHelper clipboard={jwt} content="JWT" />
        </div>
      </div>
    </div>
  );
};
