import { useState } from "react";
import "../StackingCard/StackingCard.css";
import { useWalletStore } from "../store";
import { useEffect } from "react";
import { getTotalStaked, invest,getContractBalance, getWalletBalance } from "../../util/interact";
import ReactLoading from 'react-loading';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { useSearchParams } from "react-router-dom"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export const StackingCard = (props) => {
  const title = props.plan.title;
  const days = props.plan.days;
  const daily = props.plan.daily;
  const locked = props.plan.locked;
  const roi = props.plan.roi;

  const [amount, setAmount] = useState(0);
  const [loading, setLoding] = useState(false);
  
  const currentWalletAddress = useWalletStore(
    (state) => state.currentWalletAddress
  );


  let [searchParams, setSearchParams] = useSearchParams();
  var referrer = searchParams.get("ref");
  referrer = referrer == null ? currentWalletAddress : referrer;
  console.log(referrer);
  
  const notstarted =  useWalletStore(
    (state) => state.notstarted
  );

  const updateTotalStaked = useWalletStore(
    (state) => state.updateTotalStaked
  );
  const updatecontractBalance = useWalletStore(
    (state) => state.updatecontractBalance
  );

  const updatestakedBnb = useWalletStore(
    (state) => state.updatestakedBnb
  );
  const updateWalletBalance = useWalletStore(
    (state) => state.updateWalletBalance
  );

  useEffect( async () => {
    console.log(props);
    const totalStakedAmount = await getTotalStaked();
    updateTotalStaked(totalStakedAmount);
  
  }, []);
  
  const investing = async () => {
    const data = {
      address : currentWalletAddress,
      plan : props.plan.plan,
      investAmount : amount * 1000000000000000000,
      referrer : referrer
    }
  if(currentWalletAddress){
      if(amount < 0.01){
        // alert("The investment amount is too small.");
        NotificationManager.warning('The investment amount is too small.', 'Warning', 1500);

      
        return;
      }else{
        if(referrer.length == 42){
            await setLoding(true);
            const sendTx = await invest(data);
            setLoding(false);
            if(sendTx){
              // alert("Your investment has been successful")
              NotificationManager.success('Your investment has been successful ', 'Success');

               var totalStaked = await getTotalStaked();
               updateTotalStaked(Number(totalStaked));
               
               const contractBalance = await getContractBalance();
               updatecontractBalance(contractBalance);
           
              const walletBal = await getWalletBalance(currentWalletAddress);
              updateWalletBalance(walletBal);

              const stakedBnb = await updatestakedBnb();
              updateTotalStaked(stakedBnb);
            }else 
            NotificationManager.error('Investment failure ', 'Error', 3000);

        }else NotificationManager.warning('Please enter the correct reference', 'Warning', 3000);
      }
    }else NotificationManager.warning('Please connect your wallet', 'Warning', 3000);
  }
  return (
    <>
      <BlockUi tag="div" blocking={loading} >
      <div className="plans-box-wrap">
        <div className="flex-div-wrap-header">
          <h3>{title}</h3>
            {locked ? (
              <img src="https://img.icons8.com/material/24/000000/lock--v1.png"/>
            ) : (
              <img src="https://img.icons8.com/material-outlined/24/000000/open-lock.png"/>
            )}
        </div>
        <div className="flex-div-wrap">
          <div>
            <p>Daily Earnings</p>
            <span style={{ color: 'black', fontWeight : "900" }}>{daily}</span>
          </div>
          <div>
            <p>Total ROI</p>
            <span style={{ color: 'black', fontWeight : "900" }}>{roi}</span>
          </div>
        </div>
        <div className="days-locked">
          <div>
            <h3 style={{ color: "#022A29" }}>{days}</h3>
            <p style={{ color: "#022A29" }}>DAYS</p>
          </div>
        </div>
        <div className="flex-div-wrap">
          <div>
            <p>Enter Amount BNB</p>
                <input type="number"  value={amount} step={0.01} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            {/* <p style="font-size: 12px;">ROI in 14 Days</p>
            <span style="color: rgb(221, 221, 250);">0</span> */}
            <p>ROI in {days} Days</p>
            <span>{(amount * parseFloat(roi) * 0.01).toFixed(3)}</span>
          </div>
        </div>
        <div className="stake-button-wrap">
          <button
            className="stake-button-wrap-btn"
            onClick={investing}
            disabled={notstarted}
          >
            DEPOSIT
          </button>
        </div>
      </div>
      </BlockUi>
      <NotificationContainer/>
    </>
  );
};
