import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {WalletInfra} from "@brillionfi/wallet-infra-sdk";

type WalletInfraContextType = WalletInfra | null;

const WalletInfraContext = createContext<WalletInfraContextType>(null);

export const useWalletInfra = (): WalletInfraContextType => {
  return useContext(WalletInfraContext);
};

interface WalletInfraProviderProps {
  children: ReactNode;
  appId: string;
  baseUrl: string;
  jwt: string;
}

export const WalletInfraProvider: React.FC<WalletInfraProviderProps> = ({
  children,
  appId,
  baseUrl,
  jwt,
}) => {
  const [walletInfra, setWalletInfra] = useState<WalletInfraContextType>(null);

  useEffect(() => {
    const authenticate = async () => {
      const walletInfraInstance = new WalletInfra(appId, baseUrl);
      await walletInfraInstance.authenticateUser(jwt);
      setWalletInfra(walletInfraInstance);
    };

    authenticate();
  }, [appId, baseUrl, jwt]);

  return (
    <WalletInfraContext.Provider value={walletInfra}>
      {children}
    </WalletInfraContext.Provider>
  );
};
