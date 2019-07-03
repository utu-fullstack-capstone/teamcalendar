import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
	const [message, setData] = useState();

	useEffect(() => {
		async function fetchData() {
			// You can await here
			const result = await axios('/api/test/');
			setData(result.data.message);
			console.log(result.data.message);
		}
		fetchData();
	}, []);

	return <h1 className='plapla'>{message}</h1>;
}

export default App;
