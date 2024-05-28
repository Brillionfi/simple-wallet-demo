import { createOrganization } from "@/lib/createOrganization";
import { logOut } from "@/lib/logOut";
import { Link } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const CreateOrganization = ({ jwt }: { jwt: string }) => {
  const [isError, setError] = useState(false);
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[600px] justify-center">
      <div className="flex gap-5 flex-col pt-6 w-full">
        <h2>First create an organization</h2>
        <div className="flex justify-between gap-5 w-full">
          <Input
            type="text"
            placeholder="Organization name"
            id="name"
            autoComplete={"off"}
          />
          <Button asChild onClick={() => createOrganization(jwt, setError)}>
            <Link href="">Create</Link>
          </Button>
        </div>
        {isError && (
          <p className="py-1 px-3 bg-red-100 rounded-md border border-red-200 text-red-400 text-sm text-center">
            User already has org, or org name already exists
          </p>
        )}
      </div>
      <Button onClick={() => logOut(jwt)}>Log Out</Button>
    </div>
  );
};
