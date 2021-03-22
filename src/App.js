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

	async function fetchData(url, channel) {
		try {
			setChannel(channel)

			//if (channel === 'worker') {
				console.log(url)
			//}
			let options = {
				method: 'GET',
				headers: {"Content-Type": "application/json"}
			}
			await fetch(url, options)
				.then(response => response.json())
        .then(data => setResponse(data));
				
		} catch (error) {
			setError(error);
		}
	};

	/* First time load, let's get the work order data! */
	useEffect(() => {
		fetchData(
			'https://api.hatchways.io/assessment/work_orders',
			'work-orders'
		)
	}, [] )

	useEffect(() => {
		if (channel === 'work-orders') {
			setWorkOrders(response.orders)
		}
		if (channel === 'worker') {
			let newWorkers = workers
			newWorkers.push(response.worker)
			setWorkers(newWorkers) 
		}
	}, [response])

	useEffect(() => {
		console.log(workers)
	}, [workers])

	// useEffect(() => {
	// 	console.log(workOrders)
	// }, [workOrders])

	useEffect(() => {
		console.log(response)
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
