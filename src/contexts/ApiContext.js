import { createContext, useState } from "react";


export const ApiContext = createContext(null);

export default function ApiProvider ({children}){

	const [apiUrl, setApiUrl] = useState("https://api.pokemontcg.io/v2/");

	// useEffect(() => {
	// 	setApiUrl("https://api.pokemontcg.io/");
	// }, []);

	return (
		<ApiContext.Provider value={
			{
				apiUrl: apiUrl, 
				setApi: setApiUrl
			}
		}>

			{children}

		</ApiContext.Provider>
	)

}