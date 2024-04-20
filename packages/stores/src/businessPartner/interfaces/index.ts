import {
	Product,
	ProductRequest
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
	setProductToCheckout: (product: Product) => void
	clearState: () => void
}
