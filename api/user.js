import http from '../utils/interface.js'

export const user = {
	getUserDetail: (data) => {
		return http.request({
			url: '/api/v1/admin/auth',
			method: 'GET', 
			data
		})
	},
	login: (data) => {
		return http.request({
			url: '/api/v1/admin/login',
			method: 'POST', 
			data
		})
	},
	userEdit: (data) => {
		return http.request({
			url: '/api/v1/admin/edit',
			method: 'PUT',
			data
		})
	}
}