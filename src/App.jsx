import './App.css';
import Typing from './components/typing';
import { useMyContext } from './context/context'
const App = () => {
  const { loading, walletConnected,
    walletConnectionHelper, provider,
    airDropHelper, initialMintHelper,
    supplyCapped, reMintHelper,
    transferTokenHelper, mintingWalletSecretKey,
    isSupplyCapped, capTheSupply } = useMyContext();
  return (
    <>
      <Typing />
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
                <p>
                  Transfer Token
                  <button disabled={loading} onClick={transferTokenHelper}>Transfer</button>
                </p>
                <p>
                  Minting Wallet Secret key:
                  {mintingWalletSecretKey}
                </p>
                {isSupplyCapped ? (<div>
                  Fuck, Supply is capped
                </div>) : (<div>
                  <p>Cap the supply
                    <button onClick={capTheSupply} disabled={isSupplyCapped}>Cap it!</button>
                  </p>
                </div>)}
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
