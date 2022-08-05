import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Login.css';
import UserService from '../Service/UserService';
import { useCookies } from 'react-cookie';

function Login() {
	const [idValue, setIdValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [isRememberChecked, setIsRememberChecked] = useState(false); //체크 여부
	const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']); //Cookies 이름

	/*페이지가 최초 렌더링 될 경우*/
	useEffect(() => {
		/*저장된 쿠키값이 있으면, CheckBox TRUE 및 UserID에 값 셋팅*/
		if (cookies.rememberUserId !== undefined) {
			setIdValue(cookies.rememberUserId);
			setIsRememberChecked(true);
		}
	}, [cookies.rememberUserId]);

	const loginBtn = () => {
		if (idValue !== '' && passwordValue !== '') {
			loginData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const idChange = (e) => setIdValue(e.target.value);
	const passwordChange = (e) => setPasswordValue(e.target.value);

	const checkHandler = (e) => {
		setIsRememberChecked(e.target.checked);
		console.log(isRememberChecked);
		if (!isRememberChecked) {
			setCookie('rememberUserId', idValue, { maxAge: 2000 });
		} else {
			removeCookie('rememberUserId');
		}
	};

	const loginData = () => {
		UserService.login(idValue, passwordValue)
			.then((resp) => {
				if (resp.data.msg === 'YES') {
					sessionStorage.setItem('userId', resp.data.memberDto.id);
					sessionStorage.setItem('userName', resp.data.memberDto.name);
					alert('안녕하세요 ' + resp.data.memberDto.name + '님');
					window.location.replace('/');
				} else {
					alert('로그인에 실패했습니다. id나 비밀번호를 확인해주세요');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="pb-3 mb-4">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-1 col-md-8 col-lg-6 col-xl-5">
						<div className="card bg-login text-black shadow p-3 mb-5 rounded">
							<div className="card-body p-5 text-center">
								<div className="mb-md-1 mt-md-4 pb-4">
									<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
									<p className="text-black-50 mb-5">이메일과 비밀번호를 입력하세요!</p>

									<div className="form-outline form-white mb-4">
										<label className="form-label">ID</label>
										<input type="text" className="form-control form-control-lg" placeholder="example" required="required" value={idValue || ''} onChange={idChange} />
									</div>

									<div className="form-outline form-white mb-4">
										<label className="form-label">Password</label>
										<input type="password" className="form-control form-control-lg" placeholder="Enter password" value={passwordValue} onChange={passwordChange} />
									</div>
									<div className="checkbox">
										<label>
											<input type="checkbox" value="remember" onChange={checkHandler} checked={isRememberChecked} /> Remember ID
										</label>
									</div>
									<p className="small mb-5 pb-lg-2">
										<a className="text-black-50" href="#!">
											Forgot password?
										</a>
									</p>

									<button className="btn btn-lg px-5 btn-outline-light" type="button" onClick={loginBtn}>
										Login
									</button>
								</div>

								<div>
									<div className="mb-0">
										<div className="mb-2">Don't have an account?</div>
										<Link className="btn btn-signup-1" to="/signup">
											Sign Up
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
