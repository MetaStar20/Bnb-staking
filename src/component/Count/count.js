import React, { useEffect, useState } from "react";
import { useWalletStore } from "../store";
import "../Count/count.css";
import { blockStamp } from "../../util/interact";

var timeFormat = ["d", "h", "m", "s"];
var diff;
function CountdownTimer() {
  const [expiryTime, setExpiryTime] = useState("22 mar 2022 21:00:00 GMT");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [currentBlockTime, setCurrentBlockTime] = useState();

  useEffect( async () => {
    const currentBCTime = await blockStamp();
    const currentJsTime = new Date().getTime();
    diff = currentBCTime * 1000 - currentJsTime;
  },[]);

  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownlMinutes: "",
    countdownSeconds: "",
  });
  const updateNotstarted = useWalletStore((state) => state.updateNotstarted);

  const zeroPadding = (num, digit) => {
    var zero = "";
    for (var i = 0; i < digit; i++) {
      zero += "0";
    }
    return (zero + num).slice(-digit);
  };

  const countdownTimer = () => {
    const timeInterval = setInterval(async() => {
  
      var cd = new Date();

      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };
      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
        updateNotstarted(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });

  return (
    <div className="row">
      <div className="col-sm-6">
        {expiryTime !== false ? (
          <h4 className="text-center text-primary">Staking start in</h4>
        ) : (
          <></>
        )}
        <div className="btn-group my-3">
          {expiryTime !== false ? (
            <>
              <div className="clock">
                <div className="time">
                  {Object.keys(countdownTime).map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div className="item">
                          <p>{("00" + countdownTime[item]).slice(-2)}</p>
                          <p className="format">{timeFormat[i]}</p>
                        </div>
                        {i !== 3 && ":"}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default CountdownTimer;
