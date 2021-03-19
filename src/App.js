import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import Workorder from './component/Workorder/Workorder';

function App() {

	const [workOrders, setWorkOrders] = useState([]);
	const [workers, setWorkers] = useState([]);
	const [error, setError] = useState();
	const [response, setResponse] = useState();
	const [channel, setChannel] = useState();

	async function fetchData(
		url, 
		channel
	) {
		setChannel(channel)
		try {
			let options = {
				method: 'GET',
				headers: {"Content-Type": "application/json"}
			}
			console.log(url)
			const response = await fetch(url, options)
				.then(res => res.json())
				.then(json => setResponse(json))
		} catch (error) {
			setError(error);
		}
	};

	function handleChannel(json) {

	}

	/* First time load, let's get the work order data! */
	useEffect(() => {
		setWorkers([
			{
				"id": 4,
				"name": "Ashien Galier",
				"email": "agalier4@@@@wordify.com",
				"companyName": "Wordify",
				"image": "http://dummyimage.com/250x250.jpg/ff4444/ffffff"
			}
		])
		fetchData(
			'https://api.hatchways.io/assessment/work_orders',
			'workOrders'
		)
	}, [] )

	useEffect(() => {
		if (channel === 'workOrders') {
			setWorkOrders(response.orders)
			return;
		}
		if (channel === 'workers') {
			console.log(response)
			// setWorkers(...workers, json.worker) 
		}
	}, [response])

  return (
    <div className="App">

			<div className="flexcontainer">
				{
					workOrders.length > 0 ?
						workOrders.map((order, index) => (
							<div>
								<Workorder
									key={index}
									deadline={order.deadline}
									description={order.description}
									id={order.id}
									name={order.name}
									workers={workers}
									workerId={order.workerId}
									fetchData={fetchData}
								/>
							</div>
						))
						:
						<h1>Loading Data</h1>
				}
			</div>

    </div>
  );
}

export default App;
