import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();


  const getProvider = () =>{
    if("solana" in window){
      const provider = window.solana;
    }
  }
  return (
    <>
      <h1>
        Create your own token using JS
      </h1>

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
    </>
  );
}

export default App;
