import {  useState } from "react";
import { PublicKey } from '@solana/web3.js'


// Import functions
import { sendToFriend } from "../functions/sendToFirend";
import { mintAgain } from "../functions/mintAgain";
import { MintTokens } from "../functions/mintToken";
import { airDrop } from "../functions/airdrop";
import { capSupply } from "../functions/capsupply";
export default function useSolanaProvider() {

  // Basic stuff such as connection, provider, etc.
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);

  // For minting the token
  const [isTokenCreated, setIsTokenCreated] = useState(false);
  const [createdTokenPublicKey, setCreatedTokenPublicKey] = useState(PublicKey.default);
  const [mintingWalletSecretKey, setMintingWalletSecretKey] = useState('');

  // You cannot mint more, 
  // when the supply for the tokens is capped. 
  // Thus, for that we will be using the supplyCapped state.
  const [isSupplyCapped, setIsSupplyCapped] = useState(false);



  // Basic stuff such as connection, provider, etc. goes here..
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
      setProvider(null);
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
      await airDrop(provider);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  // Minting the token
  const initialMintHelper = async () => {
    try {
      setLoading(true);
      // Setting up the new connection.
      await MintTokens(provider, setMintingWalletSecretKey, setCreatedTokenPublicKey, setIsTokenCreated);
      setLoading(false);

    }
    catch (err) {
      console.log(err);
      alert(err);
      setLoading(false)
    }
  }

  // Re-minting the token
  const reMintHelper = async () => {
    try {
      setLoading(true);

      // Setting up the connection with devnet
      await mintAgain(mintingWalletSecretKey, provider, createdTokenPublicKey);

      setLoading(false);

    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const transferTokenHelper = async () => {
    try {
      setLoading(true);
      await sendToFriend(mintingWalletSecretKey, createdTokenPublicKey, provider);
      setLoading(false);

    } catch (error) {
      alert(error);
      console.log(error);
      setLoading(false);
    }
  }

  const capTheSupply =async()=>{
    try{
      setLoading(true);
      capSupply(mintingWalletSecretKey, createdTokenPublicKey);
      setIsSupplyCapped(true);
      setLoading(false);
    }catch(error){
      alert(error);
      console.log(error);
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
    initialMintHelper,
    isTokenCreated,
    createdTokenPublicKey,
    mintingWalletSecretKey,
    reMintHelper,
    transferTokenHelper,
    capTheSupply,
    isSupplyCapped,
  }
}


