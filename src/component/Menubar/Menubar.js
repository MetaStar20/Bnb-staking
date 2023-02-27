import "../Menubar/Menubar.css";

export const Menubar = () => {
  return (
    <div className="menu-container">
      <a
        href="/"
      >
        DASHBOARD
      </a>
      <a href="https://hazecrypto.net/audit/STAKER-FINANCE"  target="_blank">
        AUDIT
      </a>
      <a href="https://t.me/stakorfinance"
       target="_blank" >
        TELEGRAM
      </a>
      <a href= "https://discord.gg/GGXZbh8u95" 
       target="_blank">
        DISCORD
      </a>
      <a
        href="https://bscscan.com/address/0x128883426E28b60349AaB495a68D541B808cf98F"
        target="_blank"
      >
        CONTRACT
      </a>
      <a
        href="https://medium.com/@gospod4ever/stakr-720a4d39e803?_branch_match_id=1033446742119885132&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9bLTU3JLM3VS87P1Y%2BwyM8sNo4oKctPAgAoRXETIwAAAA%3D%3D"
        target="_blank"
      >
        DOCUMENTATION
      </a>
    </div>
  );
};

export default Menubar;
