import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import './CSS/Bbsdetail.css';
import UserService from '../Service/UserService';

function Bbsdetail() {
	const params = useParams();

	const [seq, setSeq] = useState();
	const [bbsDetail, setBbsDetail] = useState([]);

	const [idValue, setIdValue] = useState('');
	const [contentValue, setContentValue] = useState('');

	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);

	const [userId] = useState(UserService.getCurrentUserId);

	const contentChange = (e) => setContentValue(e.target.value);
	const idChange = (e) => setIdValue(e.target.value);

	// link용 (함수)
	let history = useNavigate();

	const updateRead = useCallback(
		async (seq) => {
			console.log('updateRead');
			if (seq === undefined) {
				return;
			}
			if (userId === undefined || userId === null) {
				return;
			}
			let data = {
				'reader': userId,
				'bbsseq': seq,
			};
			console.log(data);
			await axios
				.post('http://localhost:3000/bbs/updateRead', data, {
					headers: {
						'Content-Type': `application/json`,
					},
				})
				.then(function (resp) {
					console.log('updateRead');
					console.log(resp);
					if (resp.data === 'YES') {
						readData(seq);
					}
				})
				.catch(function (error) {
					console.log('error');
				});
		},
		[userId]
	);

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

	const readReplyData = async (seq) => {
		await axios
			.get(`http://localhost:3000/bReply/getBReplyList/${seq}`, {})
			.then(function (resp) {
				setIsLoading(false);
				setComments(resp.data);
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
			id: userId,
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

	const insertReplyBtn = () => {
		if (userId === '' || userId === null) {
			alert('로그인 후 이용가능합니다.');
			window.location.replace('/login');
			return;
		}
		if (contentValue !== '') {
			insertReplyData();
		} else {
			alert('빈칸을 채워주세요!');
		}
	};

	const insertReplyData = async () => {
		let data = {
			'id': idValue,
			'content': contentValue,
			'bbsseq': seq,
		};
		await axios
			.post('http://localhost:3000/bReply/writeBReply', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				console.log(resp.data);
				if (resp.data === 'YES') {
					alert('댓글 등록 완료');
					readReplyData(seq);
					setContentValue('');
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	function deleteReplyBtn(replySeq) {
		let check = window.confirm('댓글을 삭제하시겠습니까?');
		if (check) {
			deleteReplyData(replySeq);
		}
	}

	const deleteReplyData = async (replySeq) => {
		let data = {
			seq: replySeq,
		};
		await axios
			.post('http://localhost:3000/bReply/deleteBReply', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				if (resp.data === 'YES') {
					alert('댓글 삭제 완료');
					readReplyData(seq);
				}
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	useEffect(() => {
		setSeq(params.seq);
		updateRead(seq);
		readData(seq);
		readReplyData(seq);
		setIdValue(userId);
	}, [params, seq, userId, updateRead]);

	return (
		<div className="pb-3 mb-4">
			<div className="h3">게시글</div>
			<table className="table table-width">
				<tbody>
					<tr>
						<th>제목</th>
						<td>
							<p>{bbsDetail.title}</p>
						</td>
					</tr>
					<tr>
						<th>작성자</th>
						<td>
							<p>{bbsDetail.id}</p>
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<p>{bbsDetail.content}</p>
						</td>
					</tr>
					<tr>
						<th>작성일</th>
						<td>
							<p>{bbsDetail.wdate}</p>
						</td>
					</tr>
					<tr>
						<th>조회수</th>
						<td>
							<p>{bbsDetail.readcount}</p>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="my-5 d-flex justify-contents-center">
				<Link className="btn btn-violet mr-2" to="/bbslist">
					글 목록
				</Link>
				{userId === bbsDetail.id && (
					<>
						<Link className="btn btn-violet mr-2" to={`/bbsupdate/${seq}`}>
							글 수정
						</Link>
						<button className="btn btn-violet mr-2" onClick={deleteBtn}>
							글 삭제
						</button>
					</>
				)}
				<Link className="btn btn-violet mr-2" to={`/answer/${seq}`}>
					답글 달기
				</Link>
			</div>
			<div className="my-5 justify-contents-center">
				<div className="h4 mb-5">댓글</div>
				<div className="reply-table-container shadow-sm p-3 mb-5 bg-white rounded">
					<table className="table table-borderless reply-table">
						<tbody>
							<tr>
								<th>
									<label>작성자</label>
								</th>
								<td>
									<input type="text" size="20" className="form-control" value={idValue || ''} onChange={idChange} readOnly />
								</td>
								<td className="td-btn">
									<button id="addReply" className="btn btn-violet" onClick={insertReplyBtn}>
										댓글 추가
									</button>
								</td>
							</tr>
							<tr>
								<th>
									<label>내용</label>
								</th>
								<td colSpan={2}>
									<textarea className="form-control" value={contentValue} onChange={contentChange}></textarea>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				{isLoading
					? 'Loading...'
					: comments.length === 0
					? '등록된 댓글이 없습니다'
					: comments.map((commentArr, i) => {
							return <CommentList replySeq={commentArr.seq} id={commentArr.id} content={commentArr.content} key={i} userId={userId} onClick={deleteReplyBtn.bind(this, commentArr.seq)} />;
					  })}
			</div>
		</div>
	);
}

const CommentList = (props) => {
	return (
		<div className="userCommentBox">
			<input type="hidden" value={props.replySeq} />
			<table className="table table-borderless reply-table">
				<tbody>
					<tr>
						<th>
							<label>작성자</label>
						</th>
						<td>
							<div className="flex-container-for-btn">
								<p>{props.id}</p>
								{props.userId === props.id && (
									<button className="btn btn-violet" onClick={props.onClick}>
										댓글 삭제
									</button>
								)}
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<p className="p-content">{props.content}</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Bbsdetail;
