import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

export async function airDrop(provider: null) {
    const connection = new Connection(
      clusterApiUrl("devnet"),
      "confirmed"
    );
    // @ts-ignore
    const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(provider.publicKey), LAMPORTS_PER_SOL);
    await connection.confirmTransaction(fromAirDropSignature, "confirmed");
    alert("Airdrop Successful");
  }