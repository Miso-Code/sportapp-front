const BASE_URL = '/business-partners'

const endpoints = {
	register: `${BASE_URL}/registration`,
	login: `${BASE_URL}/login`,
	product: {
		create: `${BASE_URL}/products`,
		update: (id: string) => `${BASE_URL}/products/${id}`,
		delete: (id: string) => `${BASE_URL}/products/${id}`,
		get: (id: string) => `${BASE_URL}/products/${id}`,
		getAll: `${BASE_URL}/products`,
		getPurchased: `${BASE_URL}/products/purchase`,
	}
}

export default endpoints
