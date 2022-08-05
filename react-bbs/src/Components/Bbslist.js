import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './CSS/Bbslist.css';
import './CSS/page.css';

function Bbslist() {
	const [bbsList, setBbsList] = useState([]);

	// 검색용
	const [choiceValue, setChoiceValue] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [page, setPage] = useState(1);
	const [bbsLen, setBbsLen] = useState(0);

	// link용 (함수)
	let history = useNavigate();

	const fetchData = async (choice, search, page) => {
		let data = {
			'page': page,
			'choice': choice,
			'search': search,
		};
		await axios
			.post('http://localhost:3000/bbs/list', data, {
				headers: {
					'Content-Type': `application/json`,
				},
			})
			.then(function (resp) {
				console.log(resp.data);
				setBbsList(resp.data.list);
				setBbsLen(resp.data.bbsLen);
			})
			.catch(function (error) {
				console.log('error');
			});
	};

	useEffect(() => {
		fetchData('', '', 1);
	}, []);

	const choiceChange = (e) => setChoiceValue(e.target.value);
	const searchChange = (e) => setSearchValue(e.target.value);

	const searchBtn = () => {
		history('/bbslist');

		fetchData(choiceValue, searchValue, 1);
	};

	const handlePageChange = (page) => {
		setPage(page);
		fetchData(choiceValue, searchValue, page);
	};

	return (
		<div className="pb-3 mb-4">
			<div className="h3">게시글 목록</div>
			{/* 검색 */}
			<table className="search">
				<tbody>
					<tr>
						<td>
							<select className="custom-select" value={choiceValue} onChange={choiceChange}>
								<option defaultValue>선택</option>
								<option value="title">제목</option>
								<option value="content">내용</option>
								<option value="writer">작성자</option>
							</select>
						</td>
						<td>
							<input type="text" className="form-control" placeholder="검색어" value={searchValue} onChange={searchChange} />
						</td>
						<td>
							<button type="button" className="btn btn-violet" onClick={searchBtn}>
								검색
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<table className="table table-hover">
				<thead className="thead-primary">
					<tr>
						<th>num</th>
						<th>제목</th>
						<th>id</th>
						<th>등록일</th>
						<th>조회수</th>
					</tr>
				</thead>
				<tbody>
					{bbsList.map(function (obj, i) {
						return <TableRow obj={obj} key={i} cnt={i + 1} />;
					})}
				</tbody>
			</table>
			<Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={bbsLen} pageRangeDisplayed={5} prevPageText={'‹'} nextPageText={'›'} onChange={handlePageChange} />

			<div className="my-5 d-flex justify-contents-center">
				<Link className="btn btn-violet" to="/bbswrite">
					글쓰기
				</Link>
			</div>
		</div>
	);
}

function TableRow(props) {
	let url = `../bbsdetail/${props.obj.seq}`;
	return (
		<tr>
			<th>{props.cnt}</th>
			<td className="flex-container">
				<div dangerouslySetInnerHTML={{ __html: arrow(props.obj.depth) }}></div>
				<Link className="underline" to={url}>
					{props.obj.title}
				</Link>
			</td>
			<td>{props.obj.id}</td>
			<td>{props.obj.wdate}</td>
			<td>{props.obj.readcount}</td>
		</tr>
	);
}

function arrow(depth) {
	let img = "<img src='../arrow.png' width='20px' height='20px'/>";
	let nbsp = '&nbsp;&nbsp;&nbsp;&nbsp;';

	let ts = '';
	for (var i = 0; i < depth; i++) {
		ts += nbsp;
	}
	return depth === 0 ? '' : ts + img;
}

// function titleSummary(title) {
// 	if(t)
// }

export default Bbslist;
