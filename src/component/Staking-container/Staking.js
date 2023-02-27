import { Deposit } from "../Deposit/Deposit";
import Earning from "../Earning/Earning";
import { StackingCard } from "../StackingCard/StackingCard";
import "../Staking-container/Staking.css";
import DateCountdown from 'react-date-countdown-timer';
import { Count } from "../Count/count";


export const Staking = () => {
  const plan = {
    "plan1": {
        'plan' : 0,
        'title' : "Bronze",
        'daily' : "8%",
        'days' : '14 ',
        'roi' : "112%",
        'locked' : false
    },
    "plan2": {
        'plan' : 1,
        'title' : "Silver",
        'daily' : "6.47%",
        'days' : '21 ',
        'roi' : "136%",
        'locked' : false
    },
    "plan3": {
        'plan' : 2,
        'title' : "Gold",
        'daily' : "5%",
        'days' : '28 ',
        'roi' : "140%",
        'locked' : false
    },
    "plan4": {
        'plan' : 3,
        'title' : "LOCKED Bronze",
        'daily' : "13.71%",
        'days' : '14 ',
        'roi' : "193%",
        'locked' : true
    },  
    "plan5": {
        'plan' : 4,
        'title' : "LOCKED Silver",
        'daily' : "13.1%",
        'days' : '21 ',
        'roi' : "275%",
        'locked' : true
    },   
    "plan6": {
        'plan' : 5,
        'title' : "LOCKED Gold",
        'daily' : "10.42%",
        'days' : '28 ',
        'roi' : "292%",
        'locked' : true
    },       
  };

  return (
    <>
      <div className="staking-plans-container">
        <h5 className="pannel-title">PACKAGES</h5>
        <div className="anytime-plans-wrap">
          <StackingCard plan = {Object.values(plan)[0]}/>
          <StackingCard plan = {Object.values(plan)[1]}/>
          <StackingCard plan = {Object.values(plan)[2]}/>
        </div>
        <div className="anytime-plans-wrap LOCKED-PLANS">
        <StackingCard  plan = {Object.values(plan)[3]}/>
          <StackingCard plan = {Object.values(plan)[4]}/>
          <StackingCard plan = {Object.values(plan)[5]}/>
        </div>
        <Earning />
        <Deposit />
      </div>
    </>
  );
};
export default Staking;
