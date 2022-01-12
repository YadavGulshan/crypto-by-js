import './App.css';
import { useState } from 'react';
import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import {getProvider} from './tools/provider'

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();



  const walletConnectionHelper = async () => {
    if (walletConnected) {
      //Disconnect Wallet
      setProvider();
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

      const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(provider.publicKey), LAMPORTS_PER_SOL);
      await connection.confirmTransaction(fromAirDropSignature, "confirmed");
      alert("Airdrop Successful");
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }
  return (
    <>
      <h1>
        Create your own token using JS
      </h1>

      {loading ? <div>Loading...</div> : (
        <div>
          {
            walletConnected ? (
              <div>
                <p>
                  <strong>
                    Public key:
                  </strong>
                  {provider.publicKey.toString()}
                </p>
                <p>
                  AirDrop 1 SOL into your wallet
                  <button onClick={airDropHelper} disabled={loading}>Drop</button>
                </p>
              </div>
            ) : (
              <p>
              </p>
            )
          }
          <button onClick={walletConnectionHelper} disabled={loading}>
            {!walletConnected ? "Connect Wallet" : "Disconnect Wallet"}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
