import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './CSS/Bbsupdate.css';
import UserService from '../Service/UserService';

function Bbsupdate() {
	const params = useParams();

	const [seq, setSeq] = useState();
	const [bbsDetail, setBbsDetail] = useState([]);
	const [userId] = useState(UserService.getCurrentUserId);

	// link용 (함수)
	let history = useNavigate();

	const readData = async (seq) => {
		await axios
			.get(`http://localhost:3000/bbs/detail/${seq}`, {})
			.then(function (resp) {
				setBbsDetail(resp.data);
				setTitleValue(resp.data.title);
				setContentValue(resp.data.content);
				console.log('success');
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	useEffect(() => {
		setSeq(params.seq);
		// console.log(seq);
		readData(seq);
	}, [params, seq]);

	const [titleValue, setTitleValue] = useState('');
	const [contentValue, setContentValue] = useState('');

	const updateBtn = () => {
		if (titleValue !== '' && contentValue !== '') {
			updateData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const titleChange = (e) => setTitleValue(e.target.value);
	const contentChange = (e) => setContentValue(e.target.value);

	const updateData = async () => {
		console.log('updateData');
		let data = {
			'seq': seq,
			'id': userId,
			'title': titleValue,
			'content': contentValue,
		};
		console.log(data);
		await axios
			.post('http://localhost:3000/bbs/updateBbs', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				console.log(resp.data);
				if (resp.data === 'YES') {
					alert('글 수정 완료');
					history(`/bbsdetail/${seq}`);
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-5 mb-5">
			<div className="h3">게시글 수정</div>
			<table className="table">
				<tbody>
					<tr>
						<td>작성자</td>
						<td>
							<input type="text" className="form-control" id="title" size={50} value={bbsDetail.id || ''} readOnly />
						</td>
					</tr>
					<tr>
						<td>제목</td>
						<td>
							<input type="text" className="form-control" id="title" size={50} value={titleValue || ''} onChange={titleChange} />
						</td>
					</tr>
					<tr>
						<td>내용</td>
						<td>
							<textarea className="form-control textarea" rows={5} cols={80} onChange={contentChange} value={contentValue || ''}></textarea>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="my-5 d-flex justify-contents-center">
				<Link className="btn btn-violet mr-2" to="/bbslist">
					글 목록
				</Link>
				<button type="button" className="btn btn-violet" onClick={updateBtn}>
					글 수정
				</button>
			</div>
		</div>
	);
}

export default Bbsupdate;
