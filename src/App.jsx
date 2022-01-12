import './App.css';
import { useState } from 'react';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();


  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };

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
  return (
    <>
      <h1>
        Create your own token using JS
      </h1>

      {loading ? <div>Loading...</div> : (
        <div>
          {
            walletConnected ? (
              <p>
                <strong>
                  Public key:
                </strong>
                {provider.publicKey.toString()}
              </p>
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
