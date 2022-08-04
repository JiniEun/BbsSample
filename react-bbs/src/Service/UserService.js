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

	getCurrentUser() {
		return localStorage.getItem('userId');
	}

	isUserLoggedIn() {
		const isLogin = localStorage.getItem('userId');

		if (isLogin === undefined || isLogin === null) {
			return false;
		}

		return true;
	}

	logout() {
		localStorage.removeItem('userId');
	}
}

export default new UserService();
