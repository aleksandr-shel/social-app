import React from 'react';
import {Routes, Route} from 'react-router-dom'
import NotFound from '../features/errors/NotFound';
import Main from '../features/Main';
import Layout from './layout/Layout';

function App() {

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route path='*' element={<NotFound/>}/>
					<Route index element={<Main/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
