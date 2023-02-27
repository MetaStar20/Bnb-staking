import "./Footer.css";
import haze from '../../assets/images/haze.png';
import dappradar from '../../assets/images/dappradar.png';

export const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <p>Powered by</p>
        <a href="#">BSC Network</a>
      </div>
      <div>
        <div className="partners-wrap-ft">
          <div>
            <img className="hazeImg" src={haze}/>
          </div>
          <div>
            <img className="dappradarImg" src={dappradar} />
          </div>
        </div>
      </div>
      <div>
        <p>@ 2022 by AV. All rights reserved.</p>
        <a href="_blank">https://stakor.finance</a>
      </div>
    </div>
  );
};

export default Footer;
