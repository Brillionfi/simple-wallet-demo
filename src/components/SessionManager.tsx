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
  const time = Math.round((JSON.parse(json).exp - Date.now() / 1000) / 60);
  const expired = time < 0;
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Session</h2>
          <i className="text-xs">
            {" "}
            - {expired ? "expired" : `(expires in ${time}min)`}
          </i>
        </div>
        <Button onClick={() => logOut(jwt)} variant={"destructive"}>
          {expired ? "Log back in" : "Log Out"}
        </Button>
      </div>
      <div className={"relative"}>
        <pre className="text-gray-500 bg-slate-50 py-3 px-5 rounded-md border border-solid border-slate-200 text-xs">
          {json}
        </pre>
        <div
          className={
            "absolute right-1 top-1 p-1 border border-slate-200 rounded-md bg-white text-sm"
          }
        >
          <CopyHelper clipboard={JSON.parse(json).appId} content="appId" />
        </div>
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
