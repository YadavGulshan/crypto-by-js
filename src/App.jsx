import './App.css';
import Card from './components/card';
import { useMyContext } from './context/context'
const App = () => {
  const { loading, walletConnected, walletConnectionHelper, provider} = useMyContext();
  return (
    <div className="h-screen relative overflow-x-clip">
      <Card />
      <div className="mr-44 ml-44 flex justify-between items-center absolute md:m-44 gap-10 bg-black opacity-90 p-20 rounded-xl">
        <div className="text-center w-60 md:text-left md:w-1/3 flex flex-col gap-10">
          <p className="text-lg">
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            <br/>
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
            <br/>
            Culpa ipsum exercitation esse labore Lorem mollit. Quis magna consectetur duis id consectetur esse eiusmod. Aliqua cillum commodo consequat ea aliqua consequat veniam labore ad amet.
          </p>
          <button className="title w-40 h-10 rounded-lg">
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
