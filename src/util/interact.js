import { ethers } from "ethers";
import Web3 from "web3";
import { contractAddress, chainId, rContractAddress} from "../constants/address";
import axios from "axios";
import abi from "../constants/contract.json";
import rAbi from "../constants/rContract.json";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://bsc-dataseed1.ninicoin.io"
  )
);

const contract = new web3.eth.Contract(abi, contractAddress);
const rContract = new web3.eth.Contract(rAbi, rContractAddress);


export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer)
  return contract
}

export const getRcontract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(rContractAddress, rAbi, signer)
  return contract
}


export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      const chain = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (addressArray.length > 0 && chain === chainId) {
        return {
          address: addressArray[0],
          status: "Connected.",
        };
      } else {
        return {
          address: "",
          status:
            "Connect to Metamask and choose the correct chain using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
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
            {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
            {/* </a> */}
          </p>
        </span>
      ),
    };
  }
};
const sendTransaction = async (data) => {
  try {
    const txHash = await window.ethereum.request({
      method: data.method,
      params: [data.params],
    });
    return {
      txHash : txHash,
      success: true,
      // status: (
      //   <span>
      //     <p>
      //       ✅ Please check your transaction on rinkeby.etherscan.io
      //       <br />
      //       <a
      //         target="_blank"
      //         href={`https://rinkeby.etherscan.io/tx/` + txHash}
      //         rel="noreferrer"
      //       >
      //         {"https://rinkeby.etherscan.io/tx/" + txHash}
      //       </a>
      //     </p>
      //   </span>
      // ),
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};

// export const invest = async (data) => {
//   const res = await sendTransaction({
//     method: "eth_sendTransaction",
//     params: {
//       from: data.address,
//       to: contractAddress,
//       value: ethers.BigNumber.from(data.investAmount.toString())._hex,
//       data: contract.methods.invest(data.referrer, data.plan).encodeABI(),
//     },
//   })
//   console.log(res)
// };
export const invest = async (data) => {
  const contract = getContract();
  try {
      let tx = await contract.invest(data.referrer, data.plan, { value: ethers.BigNumber.from(data.investAmount.toString())._hex, from: data.address });
      let res = await tx.wait()
      if (res.transactionHash) {
        console.log(res.transactionHash)
        return res.transactionHash;
      }
  } catch (err) {
    console.log(err)
  }
} 



// export const withdraw = async (walletAddress) => {
//   const res = await sendTransaction({
//     method: "eth_sendTransaction",
//     params: {
//       from: walletAddress,
//       to: contractAddress,
//       data: contract.methods.withdraw().encodeABI(),
//     },
//   });
//   return res;
// };


export const withdraw = async () => {
  const contract = getRcontract();
  try {
      let tx = await contract.withdraw();
      let res = await tx.wait()
      if (res.transactionHash) {
        return {tx : res.transactionHash, success:true};
      }
  } catch (err) {
    console.log(err)
  }
} 


export const getTotalStaked = async () => {
  const totalStaked = await rContract.methods.totalStaked().call();
  return totalStaked;
};

export const getContractBalance = async () => {
  const contractBalance = await rContract.methods.getContractBalance().call();
  return contractBalance;
};

export const getWalletBalance = async (walletAddress) => {
  var walletBalance = await web3.eth.getBalance(walletAddress);
  walletBalance = web3.utils.fromWei(walletBalance);
  return walletBalance;
};

export const getUserTotalDeposits = async (walletAddress) => {
  const stakedBnb = await contract.methods
    .getUserTotalDeposits(walletAddress)
    .call();
  return stakedBnb;
};

export const getUserDividends = async (walletAddress) => {
  const stakedBnb = await contract.methods
    .getUserDividends(walletAddress)
    .call();
  return stakedBnb;
};

export const getUserReferralBonus = async (walletAddress) => {
  const stakedBnb = await contract.methods
    .getUserReferralBonus(walletAddress)
    .call();
  return stakedBnb;
};

export const getUserReferralTotalBonus = async (walletAddress) => {
  const stakedBnb = await contract.methods
    .getUserReferralTotalBonus(walletAddress)
    .call();
  return stakedBnb;
};
export const getUserReferralWithdrawn = async (walletAddress) => {
  const stakedBnb = await contract.methods
    .getUserReferralWithdrawn(walletAddress)
    .call();
  return stakedBnb;
};

export const blockStamp = async () => {
  const blockObj = await web3.eth.getBlock(await web3.eth.getBlockNumber());
  const curBlockTimestamp = blockObj.timestamp;
  return curBlockTimestamp;
}
