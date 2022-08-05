import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Signup.css';
import UserService from '../Service/UserService';

function SignUp() {
	const [idValue, setIdValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [nameValue, setNameValue] = useState('');
	const [idCheckVal, setIdCheckVal] = useState(false);
	const [emailCheckVal, setEmailCheckVal] = useState(false);

	const signUpBtn = () => {
		if (idValue !== '' && passwordValue !== '') {
			signUp();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const idChange = (e) => setIdValue(e.target.value);
	const emailChange = (e) => setEmailValue(e.target.value);
	const passwordChange = (e) => setPasswordValue(e.target.value);
	const nameChange = (e) => setNameValue(e.target.value);

	const signUp = async () => {
		idCheck();
		emailCheck();
		if (!idCheckVal || !emailCheckVal) {
			alert('중복되는 id나 email를 사용할 수 없습니다');
			return;
		}
		let data = {
			'id': idValue,
			'pwd': passwordValue,
			'email': emailValue,
			'name': nameValue,
		};
		await UserService.register(data)
			.then((resp) => {
				if (resp.data === 'YES') {
					alert('회원가입이 완료되었습니다');
					window.location.replace('/login');
				} else {
					alert('회원가입에 실패했습니다. 입력한 정보를 확인해주세요');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	const idCheck = async () => {
		let data = {
			'id': idValue,
		};
		await axios
			.post('http://localhost:3000/member/idCheck', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				if (resp.data === 'YES') {
					setIdCheckVal(true);
				} else {
					setIdCheckVal(false);
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	const emailCheck = () => {
		let data = {
			'email': emailValue,
		};
		axios
			.post('http://localhost:3000/member/emailCheck', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				if (resp.data === 'YES') {
					setEmailCheckVal(true);
				} else {
					setEmailCheckVal(false);
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-3 mb-4">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-1 col-md-8 col-lg-6 col-xl-5">
						<div className="card text-dark bg-signup shadow p-3 mb-5 rounded">
							<div className="card-body p-4 text-center">
								<div className="mb-md-1 mt-md-4 pb-4">
									<h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
									<p className="text-dark mb-5">빈칸없이 기입해주세요!</p>

									<div className="form-outline form-white mb-4">
										<label className="form-label">ID</label>
										<input type="text" className="form-control form-control-lg" placeholder="example" required="required" value={idValue} onChange={idChange} onBlur={idCheck} />
										{!idCheckVal && (
											<div>
												<span>사용불가한 id입니다</span>
											</div>
										)}
									</div>

									<div className="form-outline form-white mb-4">
										<label className="form-label" htmlFor="userPassword">
											Password
										</label>
										<input type="password" className="form-control form-control-lg" placeholder="Enter password" value={passwordValue} onChange={passwordChange} />
									</div>

									<div className="form-outline form-white mb-4">
										<label className="form-label">Email</label>
										<input type="email" className="form-control form-control-lg" placeholder="example@naver.com" required="required" value={emailValue} onChange={emailChange} onBlur={emailCheck} />
										{!emailCheckVal && (
											<div>
												<span>사용불가한 email입니다</span>
											</div>
										)}
									</div>

									<div className="form-outline form-white mb-4">
										<label className="form-label">이름</label>
										<input type="text" className="form-control form-control-lg" placeholder="홍길동" required="required" value={nameValue} onChange={nameChange} />
									</div>

									<button className="btn btn-signup btn-lg px-5 mt-3" type="button" onClick={signUpBtn}>
										SignUp
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
