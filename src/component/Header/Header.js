import "./Header.css";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { chainId } from "../../constants/address";
import { useWalletStore } from "../store";

import {
  getContract,
  getTotalStaked,
  getCurrentWalletConnected,
  getContractBalance,
  getWalletBalance,
} from "../../util/interact";
import { useEffect } from "react";

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chain = await window.ethereum.request({
        method: "eth_chainId",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      if (addressArray.length > 0 && chain === chainId) {
        return obj;
      } else {
        return {
          address: "",
          status: "😥 ",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const Header = () => {
  const gwei = 0.000000000000000001;

  const [totalStaked, setTotalStaked] = useState(0);
  const [walletAddress, setWalletAddress] = useState();

  const currentWalletAddress = useWalletStore(
    (state) => state.currentWalletAddress
  );
  const updateWalletAddress = useWalletStore(
    (state) => state.updateWalletAddress
  );
  const totalStakedAmount = useWalletStore((state) => state.totalStaked);
  const contractBalance = useWalletStore((state) => state.contractBalance);

  const updatecontractBalance = useWalletStore(
    (state) => state.updatecontractBalance
  );

  const walletBalance = useWalletStore((state) => state.walletBalance);
  const updateWalletBalance = useWalletStore(
    (state) => state.updateWalletBalance
  );

  const updateTotalStaked = useWalletStore((state) => state.updateTotalStaked);

  useEffect(async () => {
    const getWalletConnected = async () => {
      const { address } = await getCurrentWalletConnected();
      updateWalletAddress(address);
    };
    const contractBal = await getContractBalance();
    updatecontractBalance(contractBal);

    const totalStaked = await getTotalStaked();
    updateTotalStaked(totalStaked);

    if (currentWalletAddress) {
      const walBal = await getWalletBalance(currentWalletAddress);
      updateWalletBalance(walBal);
    }

    getWalletConnected();
    addWalletListener();
  }, []);

  useEffect(async () => {
    if (currentWalletAddress) {
      const walBal = await getWalletBalance(currentWalletAddress);
      updateWalletBalance(walBal);
    }
  }, [currentWalletAddress]);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", async (id) => {
        console.log(id, chainId);
        if (id !== chainId) {
          updateWalletAddress("");
        } else {
          const res = await getCurrentWalletConnected();
          updateWalletAddress(res.address);
        }
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          updateWalletAddress(accounts[0]);
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          updateWalletAddress("");
          // setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      // setStatus(
      //   <p>
      //     {" "}
      //     🦊{" "}
      //     <a
      //       target="_blank"
      //       rel="noreferrer"
      //       href={`https://metamask.io/download.html`}
      //     >
      //       You must install Metamask, a virtual Ethereum wallet, in your
      //       browser.
      //     </a>
      //   </p>
      // );
    }
  };

  return (
    <div className="header-container">
      <div className="logo-cover">
        <img className="logo" alt="logo" src={logo}></img>
      </div>
      <div className="top-prices-wrap">
        <div className="top-prices">
          <p>Total Staked</p>
          <span>
            <span style={{ color: "#fbcf0f" }}>
              {(totalStakedAmount * gwei).toFixed(2)} BNB
            </span>
          </span>
        </div>
        <div className="top-prices">
          <p>Contract Balance</p>
          <span>
            <span style={{ color: "#fbcf0f" }}>
              {(contractBalance * gwei).toFixed(2)} BNB
            </span>
          </span>
        </div>
        <div className="top-prices">
          <p>Your Balance</p>
          <span>
            <span style={{ color: "#fbcf0f" }}>
              {Number(walletBalance).toFixed(3)} BNB
            </span>
          </span>
        </div>
      </div>
      <div className="connect-button-wrap">
        <button
          className="connect-wallet-btn"
          onClick={async () => {
            const res = await connectWallet();
            res.status && setWalletAddress(res.address);
            updateWalletAddress(res.address);
          }}
        >
          {currentWalletAddress
            ? currentWalletAddress.slice(0, 5) +
              "..." +
              currentWalletAddress.slice(38, 42)
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
