import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './main.css';
import Bbslist from './Components/Bbslist';
import Bbswrite from './Components/Bbswrite';
import Bbsdetail from './Components/Bbsdetail';
import Bbsupdate from './Components/Bbsupdate';
import BbsAnswer from './Components/BbsAnswer';
import Login from './Components/Login';
import UserService from './Service/UserService';
import SignUp from './Components/SignUp';

function App() {
	const [onLogin, setOnLogin] = useState(UserService.isUserLoggedIn);
	const [userName] = useState(UserService.getCurrentUserName);

	function doLogout() {
		UserService.logout();
		alert('로그아웃 되었습니다.');
		setOnLogin(false);
	}

	return (
		<>
			<div className="wrap-container">
				<header>
					<div>
						<img alt="" src="header3.png" className="header-img" />
					</div>
				</header>

				<BrowserRouter>
					<nav className="navbar navbar-expand-md navbar-light bg-white sticky-top underline-border">
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
							</ul>
							<div className="nav-item d-flex justify-content-end">
								{!onLogin && (
									<Link className="btn btn-header-login" to="/login">
										Login
									</Link>
								)}
								{onLogin && (
									<>
										<div className="d-flex align-items-center mr-3">{userName}님</div>
										<button className="btn btn-logout" onClick={doLogout}>
											LOGOUT
										</button>
									</>
								)}
							</div>
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
									<Route path="/signup" element={<SignUp />}></Route>
								</Routes>
							</div>
						</div>
					</main>
				</BrowserRouter>
			</div>
			<footer className="p-2">
				<div className="text-center d-flex align-items-center justify-content-center">
					<small>Copyright &copy;Jini</small>
				</div>
			</footer>
		</>
	);
}

function Home() {
	return (
		<div className="home-container">
			<h2>Home</h2>
		</div>
	);
}

export default App;
