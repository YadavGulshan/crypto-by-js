import { useState } from "react";
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, Keypair, sendAndConfirmTransaction } from '@solana/web3.js'
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export default function useSolanaProvider() {

  // Basic stuff such as connection, provider, etc.
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(false);

  // For minting the token
  const [isTokenCreated, setIsTokenCreated] = useState(false);
  const [createdTokenPublicKey, setCreatedTokenPublicKey] = useState('');
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

  // Minting the token
  const initialMintHelper = async () => {
    try {
      setLoading(true);
      // Setting up the new connection.
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      /*
      // Creating a minting wallet, where all the minted tokens will be stored.
      // We can also directly mint tokens in our wallet 
      // but it requires the secret key of the wallet, 
      // thus we create a new wallet.
      */
      // @ts-ignore
      const mintRequester = await provider.publicKey;
      const mintingFromWallet = Keypair.generate();
      setMintingWalletSecretKey(JSON.stringify(mintingFromWallet.secretKey));


      // Requesting an air drop to the minting wallet.
      const fromAirDropSignature = await connection.requestAirdrop(mintingFromWallet.publicKey, LAMPORTS_PER_SOL);

      // Confirming the transaction in the minting wallet.
      await connection.confirmTransaction(fromAirDropSignature, "confirmed");

      // createMint is assigning the token to the minting wallet
      const creatorToken = await Token.createMint(connection, mintingFromWallet, mintingFromWallet.publicKey, null, 6, TOKEN_PROGRAM_ID);

      // Creating association between the token and the minting wallet
      const fromTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintingFromWallet.publicKey);

      /* 
      // Number of tokens to be minted
      // The address of the account to send it to ( fromTokenAccount.address)
      // Multiple-signers (null since we don’t require validation from anyone else)
      // The public key of the person that has the minting authority over the token (mintingFromWallet.publicKey)
      // ( Since the number of decimal places mentioned earlier is 6, now 1000000 will mean 1 token mint)
      */
      await creatorToken.mintTo(fromTokenAccount.address, mintingFromWallet.publicKey, [], 1000000)

      // Setting the associated account with the public key of the phantom wallet
      const toTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintRequester);

      const transaction = new Transaction().add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromTokenAccount.address,
          toTokenAccount.address,
          mintingFromWallet.publicKey,
          [],
          100000
        )
      );
      const signature = await sendAndConfirmTransaction(connection, transaction, [mintingFromWallet]);
      console.log(signature); //TODO: Remove this line
      setCreatedTokenPublicKey(creatorToken.publicKey.toString());
      setIsTokenCreated(true);
      setLoading(false);

    }
    catch (err) {
      console.log(err);
      alert(err);
      setLoading(false)
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
    mintingWalletSecretKey
  }
}