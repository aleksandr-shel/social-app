import React from 'react';
import {Routes, Route} from 'react-router-dom'
import NotFound from '../features/errors/NotFound';
import Main from '../features/Main';
import Messages from '../features/messages/Messages';
import News from '../features/news/News';
import Profile from '../features/profile/Profile';
import Layout from './layout/Layout';

function App() {

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route path='*' element={<NotFound/>}/>
					<Route index element={<Main/>}/>
					<Route path='profile' element={<Profile/>}/>
					<Route path='news' element={<News/>}/>
					<Route path='messages' element={<Messages/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
