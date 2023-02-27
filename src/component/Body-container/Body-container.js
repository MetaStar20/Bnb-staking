import "../Body-container/Body-container.css";
import { getContractBalance, getWalletBalance } from "../../util/interact";
import { useEffect, useState } from "react";
import { useWalletStore } from "../store";


export const BodyContainer = () => {
  const gwei = 0.000000000000000001;
  const [balance, setBlance] = useState(0);
  const [walletBal, setWalletBal] = useState(0);

  const currentWalletAddress = useWalletStore(
    (state) => state.currentWalletAddress
  );

  useEffect( async () => {
    
    
    const contractBalance = await getContractBalance(); 
    setBlance((contractBalance * gwei).toFixed(2));

    if(currentWalletAddress){
      const walletBalance = await getWalletBalance(currentWalletAddress);
      setWalletBal(walletBalance)
    }
    
  })
  return (
    <>
      <div className="body-container">
        <h1 className="top-title">
          Stake Your BNB &amp; Earn up to 20% Daily
        </h1>
      {/* <div className="global-stats-container">
        <div className="global-stats-box global-stats-wrap">
          <h5>GLOBAL STATS</h5>
          <hr/>
          <div className="stat-box-wrap">
            <div>
              <p>Total Contract Balance</p>
              <span>
                <span>{balance} BNB</span>
              </span>
            </div>
          </div>
        </div>
        <div className="global-stats-box wallet-stats-wrap">
          <h5>WALLET BALANCE</h5>
          <hr/>
          <div className="stat-box-wrap">
            <div>
              <p >BNB</p>
              <span>
                <span>{walletBal}</span>
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </>
  );
};
