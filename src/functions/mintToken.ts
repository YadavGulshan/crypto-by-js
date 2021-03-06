import { SetStateAction } from "react";
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, Keypair, sendAndConfirmTransaction } from '@solana/web3.js'
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";



export async function MintTokens(provider: null, setMintingWalletSecretKey: { (value: SetStateAction<string>): void; (arg0: string): void; }, setCreatedTokenPublicKey: { (value: SetStateAction<PublicKey>): void; (arg0: PublicKey): void; }, setIsTokenCreated: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) {
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
  const creatorToken = await Token.createMint(connection, mintingFromWallet, mintingFromWallet.publicKey, null, 1, TOKEN_PROGRAM_ID);

  // Creating association between the token and the minting wallet
  const fromTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintingFromWallet.publicKey);

  /*
  // Number of tokens to be minted
  // The address of the account to send it to ( fromTokenAccount.address)
  // Multiple-signers (null since we don’t require validation from anyone else)
  // The public key of the person that has the minting authority over the token (mintingFromWallet.publicKey)
  // ( Since the number of decimal places mentioned earlier is 6, now 1000000 will mean 1 token mint)
  */
  await creatorToken.mintTo(fromTokenAccount.address, mintingFromWallet.publicKey, [], 1000000);

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
  setCreatedTokenPublicKey(creatorToken.publicKey);
  setIsTokenCreated(true);
}

