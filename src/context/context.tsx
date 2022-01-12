import { createContext, useContext } from "react";


const myContext = createContext({});

export function MyProvider(props: any) {
    return (
        <myContext.Provider value={props.value}>
            {props.children}
        </myContext.Provider>
    );
}

export function useMyContext() {
    return useContext(myContext);
}