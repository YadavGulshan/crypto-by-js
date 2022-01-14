import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

export async function mintAgain(mintingWalletSecretKey: string, provider: null, createdTokenPublicKey: PublicKey) {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const createMintingWallet = Keypair.fromSecretKey(Uint8Array.from(Object.values(JSON.parse(mintingWalletSecretKey))));
  
    // @ts-ignore
    const mintRequester = await provider.publicKey;
    const fromAirDropSignature = await connection.requestAirdrop(createMintingWallet.publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(fromAirDropSignature, "confirmed");
  
    const creatorToken = new Token(connection, createdTokenPublicKey, TOKEN_PROGRAM_ID, createMintingWallet);
    const fromTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(createMintingWallet.publicKey);
    const toTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintRequester);
    await creatorToken.mintTo(fromTokenAccount.address, createMintingWallet.publicKey, [], 100000000);
  
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        createMintingWallet.publicKey,
        [],
        100000000
      )
    );
  
    await sendAndConfirmTransaction(connection, transaction, [createMintingWallet]);
  }
  
  
  