import './App.css';
import { useMyContext } from './context/context'
const App = () => {
  const { loading, walletConnected,
    walletConnectionHelper, provider,
    airDropHelper, initialMintHelper,
    supplyCapped, reMintHelper } = useMyContext();
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
                <li>
                  Mint More 100 tokens:
                  <button disabled={loading || supplyCapped} onClick={reMintHelper}>
                    Mint Again
                  </button>
                </li>
                <p>
                  Create your own token
                  <button disabled={loading} onClick={initialMintHelper}>Initial Mint </button>
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
