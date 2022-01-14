import './App.css';
import Card2 from './components/card2';
import { useMyContext } from './context/context'
const App = () => {
  const { loading, walletConnected, walletConnectionHelper, provider } = useMyContext();
  const { airDropHelper, supplyCapped, reMintHelper, initialMintHelper, transferTokenHelper, mintingWalletSecretKey, isSupplyCapped, capTheSupply } = useMyContext()
  return (
    <div className="h-screen relative overflow-x-clip">
      {/* <Card /> */}
      <Card2 />
      <div className="mr-52 ml-52 flex justify-between items-center absolute md:m-44 gap-10 bg-black opacity-90 p-20 rounded-xl">
        <div className=" w-60 md:text-left md:w-1/3 flex flex-col gap-5 ">
          <button onClick={airDropHelper} disabled={loading} className="bg-white text-black w-40 h-10 rounded-lg">AirDrop</button>
          <button disabled={loading || supplyCapped} onClick={reMintHelper} className="bg-white text-black w-40 h-10 rounded-lg">Mint Again</button>
          <button disabled={loading} onClick={initialMintHelper} className="bg-white text-black w-40 h-10 rounded-lg">Create Your Own Token</button>
          <button disabled={loading} onClick={transferTokenHelper} className="bg-white text-black w-40 h-10 rounded-lg">Transfer Token</button>
          {isSupplyCapped ? (<div>
            Fuck, Supply is capped
          </div>) : (<div>
            <button onClick={capTheSupply} disabled={isSupplyCapped} className="bg-white text-black w-40 h-10 rounded-lg">Cap it!</button>
          </div>)}
          <button className="bg-white text-black w-40 h-10 rounded-lg">
            Show More!
          </button>
        </div>

        {/* Card here! */}
        <div className="wallet-card text-white font-medium rounded-lg ">
          {
            loading ?
              <div className="h-96 w-96 text-center">Loading...</div> :
              (
                <div className="flex flex-row justify-between p-10 h-96">
                  {
                    walletConnected ? (
                      <div className="flex flex-col justify-end text-black">
                        <strong>
                          {provider.publicKey.toString()}
                        </strong>

                      </div>
                    ) : (
                      <div className="w-96"></div>
                    )
                  }
                  <button onClick={walletConnectionHelper} disabled={loading} className="h-5">
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
