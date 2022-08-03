import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

function Bbsdetail() {
	const params = useParams();

	const [seq, setSeq] = useState();
	const [bbsDetail, setBbsDetail] = useState([]);

	// link용 (함수)
	let history = useNavigate();

	useEffect(() => {
		//const params = new URLSearchParams(window.location.search);
		setSeq(params.seq);
		// console.log(params.seq);
		// console.log(seq);
		readData(seq);
	}, [params, seq]);

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

	const deleteBtn = () => {
		let check = window.confirm('삭제하시겠습니까?');
		if (check) {
			deleteData();
		}
	};

	const deleteData = async () => {
		let data = {
			id: 'abc',
			seq: seq,
		};
		await axios
			.post('http://localhost:3000/bbs/deleteBbs', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				if (resp.data === 'YES') {
					alert('글 삭제 완료');
					history('/bbslist');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	return (
		<div className="pb-5 mb-5">
			<div className="h3">게시글</div>
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
			<div className="my-5 d-flex justify-contents-center">
				<Link className="btn btn-outline-secondary mr-2" to="/bbslist">
					글 목록
				</Link>
				<Link className="btn btn-outline-secondary mr-2" to={`/bbsupdate/${seq}`}>
					글 수정
				</Link>
				<button className="btn btn-outline-secondary mr-2" onClick={deleteBtn}>
					글 삭제
				</button>
				<Link className="btn btn-outline-secondary mr-2" to={`/answer/${seq}`}>
					답글 달기
				</Link>
			</div>
		</div>
	);
}

export default Bbsdetail;
