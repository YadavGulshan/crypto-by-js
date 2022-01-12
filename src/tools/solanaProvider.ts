import { useState } from "react";
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'


export default function useSolanaProvider() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(false);

  const getProvider = () => {
    // Property 'solana' does not exist on type 'Window & typeof globalThis'.ts(2339)
    // @ts-ignore
    if (window.solana) {
      // @ts-ignore
      return window.solana;
    }
    // @ts-ignore
    if (globalThis.solana) {
      // @ts-ignore
      return globalThis.solana;
    }

    else {
      window.open("https://www.phantom.app/", "_blank")
    }
  }
  const walletConnectionHelper = async () => {
    if (walletConnected) {
      //Disconnect Wallet
      setProvider('');
      setWalletConnected(false);
    } else {
      setLoading(true);
      const userWallet = await getProvider();
      if (userWallet) {
        await userWallet.connect();
        userWallet.on("connect", async () => {
          setProvider(userWallet);
          setWalletConnected(true);
        });
      }
      setLoading(false);
    }
  }

  const airDropHelper = async () => {
    try {
      setLoading(true);
      const connection = new Connection(
        clusterApiUrl("devnet"),
        "confirmed"
      );
      // @ts-ignore
      const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(provider.publicKey), LAMPORTS_PER_SOL);
      await connection.confirmTransaction(fromAirDropSignature, "confirmed");
      alert("Airdrop Successful");
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  return {
    walletConnected,
    setWalletConnected,
    provider,
    setProvider,
    loading,
    setLoading,
    getProvider,
    walletConnectionHelper,
    airDropHelper,
  }
}