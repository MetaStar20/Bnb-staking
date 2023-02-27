import "../Earning/Earning.css";
import copy from "copy-to-clipboard";  
import { useWalletStore } from "../store";
import {
  getContractBalance,
  getUserDividends,
  getUserReferralBonus,
  getUserTotalDeposits,
  withdraw,
  getUserReferralTotalBonus,
  getUserReferralWithdrawn,
  getTotalStaked,
  getWalletBalance,
  notstarted
} from "../../util/interact";
import { useEffect } from "react";
import { useState } from "react";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export const Earning = () => {
  const gwei = 0.000000000000000001;
  
  const currentWalletAddress = useWalletStore(
    (state) => state.currentWalletAddress
  );
  // const [stakedBnb, setStakedBnb] = useState(0.0);
  const [available, setAvailable] = useState(0);
  const [totalReferal, setTotalReferal] = useState(0);
  const [totalReferalWithdrawn, setTotalReferalWithdrawn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [referrer, setReferrer] = useState();

  const notstarted =  useWalletStore(
    (state) => state.notstarted
  );

  const updatestakedBnb =  useWalletStore(
    (state) => state.updatestakedBnb
  );

  const updateTotalStaked = useWalletStore(
    (state) => state.updateTotalStaked
  );
  const updatecontractBalance = useWalletStore(
    (state) => state.updatecontractBalance
  );

  const updateWalletBalance = useWalletStore(
    (state) => state.updateWalletBalance
  );

  const stakedBnb =  useWalletStore(
    (state) => state.stakedBnb
  );
  useEffect(async () => {
    setReferrer("http://stakor.finance?ref=");
    if(currentWalletAddress){
      setReferrer("http://stakor.finance?ref=" + currentWalletAddress);

      const staked = await getUserTotalDeposits(currentWalletAddress);
      updatestakedBnb((staked  * gwei).toFixed(3))

      // setStakedBnb((staked  * gwei).toFixed(3));

      const dividends = await getUserDividends(currentWalletAddress);
      const referralBonus = await getUserReferralBonus(currentWalletAddress);
      const contractBalance = parseFloat (await getContractBalance());
      var avaliabelAmount = parseFloat(dividends) + parseFloat(referralBonus);
      avaliabelAmount > contractBalance ? setAvailable((contractBalance * gwei).toFixed(3)) : setAvailable((avaliabelAmount * gwei).toFixed(3));

      const total = await getUserReferralTotalBonus(currentWalletAddress);
      setTotalReferal((total * gwei).toFixed(3));
      const totalRefWithdrawn = await getUserReferralWithdrawn(currentWalletAddress);
      setTotalReferalWithdrawn((totalRefWithdrawn *gwei).toFixed(3));
    }
  });

      const copyToClipboard = () => {
        copy(referrer);
        NotificationManager.success(`Your Referral Link is "${referrer}"`, 'Copied', 1500);
        
        // alert(`Your Referral Link is "${referrer}"`);
    }

  const handleClick = async ( ) => {
    if(currentWalletAddress){
      setLoading(true);
      const res = await withdraw();
      setLoading(false);
      if(res.tx){
        // alert("Withdrawal success")
        NotificationManager.success(`Withdrawal success`, 'Success');

        const staked = await getUserTotalDeposits(currentWalletAddress);
        updatestakedBnb((staked  * gwei).toFixed(3))

        const totalStaked = await getTotalStaked();
        updateTotalStaked(totalStaked);
        
        const contractBalance = await getContractBalance();
        updatecontractBalance(contractBalance);
    
       const walletBal = await getWalletBalance(currentWalletAddress);
       updateWalletBalance(walletBal);

       const stakedBnb = await updatestakedBnb();
       updateTotalStaked(stakedBnb);

      }else NotificationManager.error('Withdrawal failed ', 'Error', 3000);
    }
  }

  return (
    <>
      <h5 className="pannel-title">EARNINGS</h5>
      <div className="withdraw-referal-container">
      <BlockUi tag="div" blocking={loading} >
        <div className="withdraw-wrap">
          <div className="earning-div-flex">
            <p>Staked BNB</p>
            <span>
              <span>{stakedBnb}</span>
            </span>
          </div>
          <div className="earning-div-flex">
            <p>Available BNB for withdraw</p>
            <span>
              <span>{available}</span>
            </span>
          </div>
          <div className="withdraw-btn">
            <button onClick={handleClick}  disabled={notstarted}>WITHDRAW</button>
          </div>
        </div>
      </BlockUi>
        <div className="referal-div-wrap">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "12px" }}>Your Referral Link</p>
          </div>
          <div className="flex-div-wrap">
            <div className="ref-link-div">
                <p>{referrer}</p>
            </div>
            <div className="copy-div-wrap">
            <a href={referrer}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                onClick={copyToClipboard}>
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
              </svg>
            </a>
            </div>
          </div>
          <div className="flex-div-wrap" style={{ alignItem: "flex-start" }}>
            <div>
              <div className="ref-earning-wrap">
                <p>Total Referral Earned</p>
                <span>
                  <span>{totalReferal}</span>
                </span>
              </div>
              {/* <div className="ref-earning-wrap">
                <p>Users Invited by You</p>
                <span></span>
              </div> */}
            </div>
            <div className="ref-earning-wrap">
              <p>Total Referral Withdrawn</p>
              <span>
                <span>{totalReferalWithdrawn}</span>
              </span>
            </div>
            <div className="ref-info-wrap">
              <p>Stakor Referral Information</p>
              <br />
              <p>You will receive:</p>
              <div style={{ marginTop: "5px" }}>
                <p>
                  5% from each level 1 referral deposits <br />
                  2.5% from each level 2 referral deposits
                  <br />
                  0.5% from each level 3 referral deposits
                  <br />
                </p>
                <br />
                <p>
                  <em>
                    Note! You need to have at least <br /> 1 deposit to start
                    receive earnings
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Earning;
