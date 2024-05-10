import {
	Product,
	ProductRequest,
	PurchaseProductRequest,
	PurchaseProductResponse
} from '@sportapp/sportapp-repository/src/businessPartner/interfaces'

export interface IBusinessPartnerStore
	extends IBusinessPartnerState,
		IBusinessPartnerActions {}

export interface IBusinessPartnerState {
	productToCheckout: Product | undefined
}

export interface IBusinessPartnerActions {
	getAvailableProducts: (
		request: ProductRequest
	) => Promise<Product[] | undefined>
	purchaseProduct: (
		payload: PurchaseProductRequest
	) => Promise<PurchaseProductResponse | undefined>
	setProductToCheckout: (product: Product | undefined) => void
	clearState: () => void
}
