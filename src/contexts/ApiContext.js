import { createContext, useState } from "react";


export const ApiContext = createContext(null)

export default function ApiProvider({children}){

    const [ApiUrl, setApiUrl] = useState("https://api.pokemontcg.io");

    // useEffect(() => {
    //     setApiUrl("https://api.pokemontcg.io");

    // }, [])
    return (

        <ApiContext.Provider value={
            {
                ApiUrl: ApiUrl, 
                setApi: setApiUrl
            }
        }>
            {children}
    
        </ApiContext.Provider>
    );
}