import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../contexts/ApiContext';
import { useParams } from 'react-router-dom';

function CardSearchByName() {

// search results

const [searchResults, setSearchResults] = useState([]);


// apiURL

const {api} = useContext(ApiContext);

// route param for the pookemon name

const {pokemonName} = useParams();


// api key
let apiKey = process.env.REACT_APP_API_KEY;

useEffect(() => {
    console.log(`Card Search compoentnt mounted`);
    
    async function apiRequest(){
        let queryParams = new URLSearchParams({
            q: 'name:' + pokemonName
        })
        let response = await fetch(api + 'cards', + queryParams,{
            headers: {
                'X-api-Key': apiKey
            }
        });
        
        let responseData = await response.json();

        setSearchResults(responseData.data)

    }

    apiRequest();

}, []);

  return (
    <div>

    {searchResults.length > 0 && 
			<div>
				<h1>{searchResults[0].name} - {searchResults[0].id}</h1>
			</div>
			}
    </div>
    
  )
}

export default CardSearchByName