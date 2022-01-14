import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function capSupply(mintingWalletSecretKey: string, createdTokenPublicKey: PublicKey) {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


    const createMintingWallet = Keypair.fromSecretKey(Uint8Array.from(Object.values(JSON.parse(mintingWalletSecretKey))));
    const fromAirDropSignature = await connection.requestAirdrop(createMintingWallet.publicKey, LAMPORTS_PER_SOL);

    await connection.confirmTransaction(fromAirDropSignature);

    const creatorToken = new Token(connection, createdTokenPublicKey, TOKEN_PROGRAM_ID, createMintingWallet);
    await creatorToken.setAuthority(createdTokenPublicKey, null, "MintTokens", createMintingWallet.publicKey, [createMintingWallet]);
}