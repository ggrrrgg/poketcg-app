import { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiContext";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Card } from "react-bootstrap";


export default function CardSearchByName() {

	// search results 
	const [searchResults, setSearchResults] = useState([]);

	// api URL 
	const {apiUrl} = useContext(ApiContext);

	// route param for the pokemon name 
	const {pokemonName} = useParams();

	// api key 
	let apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
		console.log("Card search component has mounted! Making a fetch request now...");

		async function apiRequest(){
			let queryParams = new URLSearchParams({
				q: 'name:' + pokemonName
			})
			let response = await fetch(apiUrl + 'cards?' + queryParams, {
				headers: {
					'X-Api-Key': apiKey
				}
			});
			
			console.log(response);

			let responseData = await response.json();

			setSearchResults(responseData.data);
		}

		apiRequest();

        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiUrl, pokemonName]);

	return (
		<div>
			<h1>Card Search</h1>
			{searchResults.length > 0 && 
			<div>
				<h1>{searchResults[0].name} - {searchResults[0].id}</h1>

				{/* Containers here in rows and colums */}
				<Container fluid className="mx-auto"  style={{padding: "5%"}}>
					<Row style={{display: 'flex', flexWrap:'wrap'}}>
						{searchResults.map(result => {
							return <Col className="my-2">
							<PokemonCard key={result.id} 
								cardTitle={result.name} 
								imageUrl={result.images.small} 
								cardDescription={result.flavorText} 
							/>
							</Col>
						})}
					</Row>
				</Container>

				
			</div>
			}
		</div>
	)
}