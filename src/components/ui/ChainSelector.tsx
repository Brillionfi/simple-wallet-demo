import { useState } from "react";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { Chain, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains';

const dropdown: React.CSSProperties = {
  minWidth: "10rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "1rem",
  borderWidth: "1px",
  borderColor: "#e4e4e7",
  height: "2.5rem",
  padding: "0.5rem",
  paddingLeft: "1rem",
  fontSize: "1rem",
  lineHeight: "2rem",
  borderRadius: "0.375rem",
  backgroundColor: "#292d27",
  color: "white",
}

const dropdownContainer: React.CSSProperties = {
  position: "absolute",
  // marginTop: "2.5rem",
  zIndex: 2
}

const dropdownList: React.CSSProperties = {
  width: "10rem",
  height: "auto",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  borderRadius: "0.375rem",
  borderWidth: "1px",
  backgroundColor: "#444444",
};

const dropdownOption: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.5rem",
  paddingLeft: "1rem",
  fontSize: "1rem",
  lineHeight: "2rem",
  borderRadius: "0.375rem",
  color: "white",
  cursor: "pointer",
  backgroundColor: "#292d27",
}

export const ChainSelector = () => {
  const chains = [mainnet, polygon, polygonAmoy, sepolia]

  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain()
  const { connectors } = useConnect();
  const [open, setOpen] = useState(false);
  const [chain, setChain] = useState<Chain>(chains.find(chain => chain.id === chainId) || mainnet);

  const changeChain = (number: number) => {
    switchChain({connector: connectors[0], chainId: number});
  }
  
  return (
    <div>
      <button
        style={dropdown}
        onClick={() => setOpen(!open)}
      >
        {chain.name}
      </button>
      {open && (
        <div style={dropdownContainer}>
          <ul style={dropdownList}>
            {chains.map((chain) => {
              return (
                <li
                  key={`chain-selector-${chain.id}`}
                  style={dropdownOption}
                  onClick={() => {
                    setOpen(false)
                    setChain(chain)
                    changeChain(chain.id)
                  }}
                >
                  {chain.name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
};