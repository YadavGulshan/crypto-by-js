import { createContext, useContext } from "react";
import solanaProvider from "../provider/solanaProvider";

const myContext = createContext({});

export function MyProvider({children}) {
    const solana = solanaProvider();
    return (
        <myContext.Provider value={solana}>
            {children}
        </myContext.Provider>
    );
}

export function useMyContext() {
    return useContext(myContext);
}