import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";

export async function sendToFriend(mintingWalletSecretKey: string, createdTokenPublicKey: PublicKey, provider: null) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const createMintingWallet = Keypair.fromSecretKey(Uint8Array.from(Object.values(JSON.parse(mintingWalletSecretKey))));
  const receiverWallet = new PublicKey('Cy8TxcmWeYmsJhQ9nouespFBbc9Uwj8sWiuJcbe9m6pp');

  const fromAirDropSignature = await connection.requestAirdrop(createMintingWallet.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(fromAirDropSignature, "confirmed");

  console.log('1 SOL airdropped to the wallet for fee');
  const creatorToken = new Token(connection, createdTokenPublicKey, TOKEN_PROGRAM_ID, createMintingWallet);

  // @ts-ignore
  const fromTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(provider.publicKey);
  const toTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(receiverWallet);

  const transaction = new Transaction().add(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      // @ts-ignore
      provider.publicKey,
      [],
      10000
    )
  );

  // @ts-ignore
  transaction.feePayer = provider.publicKey;

  let blockhashObj = await connection.getRecentBlockhash();
  console.log("blockhashObj", blockhashObj);

  transaction.recentBlockhash = blockhashObj.blockhash;
  if (transaction) {
    alert("Transaction created successfully");
  }

  // @ts-ignore
  let signed = await provider.signTransaction(transaction);
  let signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature);

  console.log("SIGNATURE: ", signature);
}