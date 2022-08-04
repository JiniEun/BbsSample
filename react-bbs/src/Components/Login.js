import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/login.css';
import UserService from '../Service/UserService';

function Login() {
	const [idValue, setIdValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [user, setUser] = useState([]);

	const loginBtn = () => {
		if (idValue !== '' && passwordValue !== '') {
			loginData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const idChange = (e) => setIdValue(e.target.value);
	const passwordChange = (e) => setPasswordValue(e.target.value);

	// link용 (함수)
	let navigate = useNavigate();

	const loginData = async () => {
		let data = {
			'id': idValue,
			'pwd': passwordValue,
		};
		console.log(data);
		await UserService.login(idValue, passwordValue)
			.then((resp) => {
				setUser(resp.data.memberDto);
				localStorage.setItem('userId', resp.data.memberDto.id);
				if (resp.data.msg === 'YES') {
					alert('안녕하세요 ' + resp.data.memberDto.name + '님');
					window.location.replace('/');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-5 mb-5">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-1 col-md-8 col-lg-6 col-xl-5">
						<div className="card bg-secondary text-white">
							<div className="card-body p-5 text-center">
								<div className="mb-md-1 mt-md-4 pb-4">
									<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
									<p className="text-white-50 mb-5">이메일과 비밀번호를 입력하세요!</p>

									<div className="form-outline form-white mb-4">
										<label className="form-label" htmlFor="userEmail">
											Email
										</label>
										<input type="email" className="form-control form-control-lg" placeholder="example@naver.com" required="required" value={idValue} onChange={idChange} />
									</div>

									<div className="form-outline form-white mb-4">
										<label className="form-label" htmlFor="userPassword">
											Password
										</label>
										<input type="password" className="form-control form-control-lg" placeholder="Enter password" value={passwordValue} onChange={passwordChange} />
									</div>
									<div className="checkbox">
										<label>
											<input type="checkbox" name="c_id" value="Y" /> Remember ID
										</label>
									</div>
									<p className="small mb-5 pb-lg-2">
										<a className="text-white-50" href="#!">
											Forgot password?
										</a>
									</p>

									<button className="btn btn-outline-light btn-lg px-5" type="button" onClick={loginBtn}>
										Login
									</button>
								</div>

								<div>
									<div className="mb-0">
										<div>Don't have an account?</div>
										<Link className="btn btn-outline-secondary btn-signup" to="/signup">
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
