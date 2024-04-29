const BASE_URL = '/business-partners'

const endpoints = {
	getAvailableProducts: `${BASE_URL}/products/available`,
	purchaseProduct: (productId: string) =>
		`${BASE_URL}/products/${productId}/purchase`
}

export default endpoints
