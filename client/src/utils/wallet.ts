export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || "", 10);
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "bnb",
              decimals: 18,
            },
            rpcUrls: [
              process.env.REACT_APP_NODE_1,
              process.env.REACT_APP_NODE_2,
              process.env.REACT_APP_NODE_3,
            ],
            blockExplorerUrls: ["https://bscscan.com/"],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};
