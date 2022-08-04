import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import UserService from '../Service/UserService';

function BbsAnswer() {
	const params = useParams();

	const [seq, setSeq] = useState();
	const [bbsDetail, setBbsDetail] = useState([]);
	const [titleValue, setTitleValue] = useState('');
	const [contentValue, setContentValue] = useState('');
	const [userId, setUserId] = useState(UserService.getCurrentUser);

	// link용 (함수)
	let history = useNavigate();

	const titleChange = (e) => setTitleValue(e.target.value);
	const contentChange = (e) => setContentValue(e.target.value);

	const answerBtn = () => {
		if (titleValue !== '' && contentValue !== '') {
			answerData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const readData = async (seq) => {
		await axios
			.get(`http://localhost:3000/bbs/detail/${seq}`, {})
			.then(function (resp) {
				setBbsDetail(resp.data);
				console.log('success');
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	useEffect(() => {
		setSeq(params.seq);
		readData(seq);
	}, [params, seq]);

	const answerData = async () => {
		let dtoData = {
			id: userId,
			'title': titleValue,
			'content': contentValue,
		};
		let data = { 'seq': seq, 'bbsDto': dtoData };

		console.log(dtoData);
		console.log(data);
		await axios
			.post('http://localhost:3000/bbs/answerBbs', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				if (resp.data === 'YES') {
					alert('답글 등록 완료');
					history('/bbslist');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-5 mb-5">
			<div className="h3">답글 달기</div>
			<div className="h4 my-3">본문</div>
			<table className="table">
				<tbody>
					<tr>
						<td>제목</td>
						<td>
							<p>{bbsDetail.title}</p>
						</td>
					</tr>
					<tr>
						<td>작성자</td>
						<td>
							<p>{bbsDetail.id}</p>
						</td>
					</tr>
					<tr>
						<td>내용</td>
						<td>
							<p>{bbsDetail.content}</p>
						</td>
					</tr>
					<tr>
						<td>작성일</td>
						<td>
							<p>{bbsDetail.wdate}</p>
						</td>
					</tr>
					<tr>
						<td>조회수</td>
						<td>
							<p>{bbsDetail.readcount}</p>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="h4 my-3">답글</div>
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
				<Link className="btn btn-outline-secondary mr-2" to="/bbslist">
					글 목록
				</Link>
				<Link className="btn btn-outline-secondary mr-2" to={`/bbsdetail/${seq}`}>
					본문으로
				</Link>
				<button className="btn btn-outline-secondary mr-2" onClick={answerBtn}>
					답글 달기
				</button>
			</div>
		</div>
	);
}

export default BbsAnswer;
