import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Bbswrite.css';
import UserService from '../Service/UserService';

function Bbswrite() {
	const [titleValue, setTitleValue] = useState('');
	const [contentValue, setContentValue] = useState('');
	const [userId] = useState(UserService.getCurrentUserId);
	const [onLogin] = useState(UserService.isUserLoggedIn);

	// link용 (함수)
	let navigate = useNavigate();

	const titleChange = (e) => setTitleValue(e.target.value);
	const contentChange = (e) => setContentValue(e.target.value);

	if (!onLogin) {
		window.location.href = '/login';
	}

	const insertBtn = () => {
		if (titleValue !== '' && contentValue !== '') {
			insertData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const insertData = async () => {
		let data = {
			'id': userId,
			'title': titleValue,
			'content': contentValue,
		};
		await axios
			.post('http://localhost:3000/bbs/writeBbs', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				console.log(resp.data);
				if (resp.data === 'YES') {
					alert('글 등록 완료');
					navigate('/bbslist');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-5 mb-5">
			<div className="h3">게시글 작성</div>
			<table className="table">
				<tbody>
					<tr>
						<td>작성자</td>
						<td>
							<input className="form-control" type="text" id="title" size={50} value={userId} readOnly />
						</td>
					</tr>
					<tr>
						<td>제목</td>
						<td>
							<input className="form-control" type="text" id="title" size={50} value={titleValue} onChange={titleChange} />
						</td>
					</tr>
					<tr>
						<td>내용</td>
						<td>
							<textarea className="form-control textarea" rows={5} cols={80} onChange={contentChange}></textarea>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="my-5 d-flex justify-contents-center">
				<Link className="btn btn-violet mr-2" to="/bbslist">
					글 목록
				</Link>
				<button type="button" className="btn btn-violet" onClick={insertBtn}>
					글 작성
				</button>
			</div>
		</div>
	);
}

export default Bbswrite;
