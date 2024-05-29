import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createApp } from "@/lib/createApplication";

export const ApplicationInput = ({
  jwt,
  setLastAppName,
}: {
  jwt: string;
  setLastAppName: Dispatch<SetStateAction<string>>;
}) => {
  const [appName, setAppName] = useState("");
  const [pk, setPk] = useState("");
  return (
    <div className="flex justify-between gap-5 w-full">
      <Input
        autoComplete={"off"}
        type="text"
        placeholder="Application name"
        onChange={(value) => setAppName(value.target.value)}
        id="app"
        value={appName}
      />
      <Input
        autoComplete={"off"}
        type="text"
        placeholder="Public key"
        onChange={(value) => setPk(value.target.value)}
        id="pkey"
        value={pk}
      />
      <Button
        onClick={() => {
          createApp(jwt, setLastAppName);
          setPk("");
          setAppName("");
        }}
        disabled={appName.length === 0 || pk.length === 0}
      >
        Create
      </Button>
    </div>
  );
};
