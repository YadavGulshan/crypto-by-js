import './App.css';
import Typing from './components/animation/typing';
import { useMyContext } from './context/context'
const App = () => {
  const { loading, walletConnected,
    walletConnectionHelper, provider,
    airDropHelper, initialMintHelper,
    supplyCapped, reMintHelper,
    transferTokenHelper, mintingWalletSecretKey,
    isSupplyCapped, capTheSupply } = useMyContext();
  return (
    <div className="h-screen">
      <Typing />
      <div className="mr-10 ml-10 translate-y-1/2 flex justify-between align-middle items-center">
        <div className="w-1/4 ">
          <p className="font-medium text-lg">
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
          </p>
        </div>

        {/* Card here! */}
        <div className="bg-slate-700 text-white w-1/3 h-96 rounded-lg">
          {
          loading ?
          <div>Loading...</div> :
          (
            <div className="flex flex-row justify-between p-10">
              {
                walletConnected ? (
                  <div className="flex flex-col">
                      <strong>
                      {provider.publicKey.toString()}
                      </strong>


                      AirDrop 1 SOL into your wallet
                      <button onClick={airDropHelper} disabled={loading}>Drop</button>
                    <li>
                      Mint More 100 tokens:
                      <button disabled={loading || supplyCapped} onClick={reMintHelper}>
                        Mint Again
                      </button>
                    </li>
                      Create your own token
                      <button disabled={loading} onClick={initialMintHelper}>Initial Mint </button>
                      Transfer Token
                      <button disabled={loading} onClick={transferTokenHelper}>Transfer</button>
                      Minting Wallet Secret key:
                      {mintingWalletSecretKey}
                    {isSupplyCapped ? (<div>
                      Fuck, Supply is capped
                    </div>) : (<div>
                        <button onClick={capTheSupply} disabled={isSupplyCapped}>Cap it!</button>
                    </div>)}
                  </div>
                ) : (
                  <p></p>
                )
              }
              <button onClick={walletConnectionHelper} disabled={loading} className="bg-slate-500 h-20">
                {!walletConnected ? "Connect Wallet" : "Disconnect Wallet"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
