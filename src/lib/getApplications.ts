import { BASE_URL } from "@/utils/constants";
import { LoginTypes, type TApplication } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const getApplications = (
  role: LoginTypes,
  jwt: string,
  lastAppName: string
) => {
  const { data } = useQuery({
    enabled: role === LoginTypes.OrgOwner,
    queryKey: ["GetApplicationsList", lastAppName],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/organizations/apps`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const answer = await response.json();
      const apps = answer.applications as TApplication[];
      return apps;
    },
  });
  return data;
};
