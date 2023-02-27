import create from "zustand";

export const useWalletStore = create((set) => (
  {
  currentWalletAddress: "",
  updateWalletAddress: (value) => {
    set({ currentWalletAddress: value });
  },
  totalStaked : 0,
  updateTotalStaked : (value) => {
    set({ totalStaked: value });
  },
  contractBalance : "",
  updatecontractBalance : (value) => {
    set({ contractBalance: value });
  },
  walletBalance : "0",
  updateWalletBalance : (value) => {
    set({ walletBalance: value });
  },
  stakedBnb : "0",
  updatestakedBnb : (value) => {
    set({ stakedBnb: value });
  },
  notstarted : true,
  updateNotstarted : (value) => {
    set({ notstarted: value });
  }
}
));
