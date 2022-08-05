import axios from 'axios';

// const API_URL = "/api/auth/";
const USER_API_BASE_URL = 'http://localhost:3000/member';

class UserService {
	login(idValue, passwordValue) {
		let data = {
			'id': idValue,
			'pwd': passwordValue,
		};
		// console.log(data);
		return axios.post(USER_API_BASE_URL + '/login', data, {
			headers: {
				'Content-Type': `application/json`,
			},
		});
	}

	register(data) {
		// console.log(data);
		return axios.post(USER_API_BASE_URL + '/regi', data, {
			headers: {
				'Content-Type': `application/json`,
			},
		});
	}

	getCurrentUserId() {
		return sessionStorage.getItem('userId');
	}

	getCurrentUserName() {
		return sessionStorage.getItem('userName');
	}

	isUserLoggedIn() {
		const isLogin = sessionStorage.getItem('userId');

		if (isLogin === undefined || isLogin === null) {
			return false;
		}

		return true;
	}

	logout() {
		sessionStorage.clear();
	}
}

export default new UserService();
