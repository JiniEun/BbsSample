import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './main.css';
import Bbslist from './Components/Bbslist';
import Bbswrite from './Components/Bbswrite';
import Bbsdetail from './Components/Bbsdetail';
import Bbsupdate from './Components/Bbsupdate';
import BbsAnswer from './Components/BbsAnswer';
import Login from './Components/Login';
import UserService from './Service/UserService';

function App() {
	const [onLogin, setOnLogin] = useState(UserService.isUserLoggedIn);

	function doLogout() {
		UserService.logout();
		alert('로그아웃 되었습니다.');
		setOnLogin(false);
	}

	return (
		<div>
			<header className="py-4">
				<div className="container text-center">
					<img alt="" src="header.jpeg" width="960" height="150" />
				</div>
			</header>

			<BrowserRouter>
				<nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
					<div className="collapse navbar-collapse" id="navbar-content">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
							<li className="nav-item dropdown">
								<div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									게시판
								</div>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link className="dropdown-item" to="/bbslist">
										글 목록
									</Link>
									<Link className="dropdown-item" to="/bbswrite">
										글 추가
									</Link>
								</div>
							</li>
							<li className="nav-item d-flex justify-content-end">
								{!onLogin && (
									<Link className="nav-link" to="/login">
										Login
									</Link>
								)}
								{onLogin && (
									<button className="btn" onClick={doLogout}>
										LOGOUT
									</button>
								)}
							</li>
						</ul>
					</div>
				</nav>
				<main>
					<div className="py-4">
						<div className="container my-4">
							<Routes>
								<Route path="/" element={<Home />}></Route>
								<Route path="/bbslist" element={<Bbslist />}></Route>
								<Route path="/bbswrite" element={<Bbswrite />}></Route>
								<Route path="/bbsdetail/:seq" element={<Bbsdetail />}></Route>
								<Route path="/bbsupdate/:seq" element={<Bbsupdate />}></Route>
								<Route path="/answer/:seq" element={<BbsAnswer />}></Route>
								<Route path="/login" element={<Login />}></Route>
							</Routes>
						</div>
					</div>
				</main>
			</BrowserRouter>

			<footer className="py-4 bg-info text-light">
				<div className="container text-center">
					<ul className="nav justify-content-center mb-3">
						<li className="nav-item">
							<a className="nav-link" href="/">
								Top
							</a>
						</li>
					</ul>

					<p>
						<small>Copyright &copy;Graphic Arts</small>
					</p>
				</div>
			</footer>
		</div>
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}

export default App;
