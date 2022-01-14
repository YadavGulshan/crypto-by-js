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
    <div className="bg-[#002233]  h-screen relative">
      <Typing />
      <div className="mr-52 ml-52 flex justify-between items-center absolute top-1/3">
        <div className="w-1/3 flex flex-col gap-10">
          <p className="text-lg">
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
          </p>
          <button className="bg-white w-40 h-10 rounded-lg text-[#0066FF]">
            Show More!
          </button>
        </div>

        {/* Card here! */}
        <div className="wallet-card rounded-lg">
          {
          loading ?
          <div>Loading...</div> :
          (
            <div className="flex flex-row justify-between p-10  h-96">
              {
                walletConnected ? (
                  <div className="flex flex-col justify-end">
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
