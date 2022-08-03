import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Bbswrite.css';

function Bbswrite() {
	const [titleValue, setTitleValue] = useState('');
	const [contentValue, setContentValue] = useState('');

	const insertBtn = () => {
		if (titleValue !== '' && contentValue !== '') {
			insertData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const titleChange = (e) => setTitleValue(e.target.value);
	const contentChange = (e) => setContentValue(e.target.value);

	// link용 (함수)
	let history = useNavigate();

	const insertData = async () => {
		let data = {
			'id': 'abc',
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
					history('/bbslist');
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
							<input className="form-control" type="text" id="title" size={50} value="abc" readOnly />
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
				<Link className="btn btn-outline-secondary mr-2" to="/bbslist">
					글 목록
				</Link>
				<button type="button" className="btn btn-outline-secondary" onClick={insertBtn}>
					글 작성
				</button>
			</div>
		</div>
	);
}

export default Bbswrite;
