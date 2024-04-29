import { Product } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product'
import { ProductCreateRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { ProductPurchased } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-purchased'

export interface IProductStore extends IProductState, IProductActions {}

export interface IProductState {
	products?: Product[] | undefined
	error: string | undefined
	loading: boolean
	selectedProduct?: Product | undefined
	purchasedProducts?: ProductPurchased[] | undefined
}

export interface getProductsPayload {
	offset: number
	limit: number
}

export interface IProductActions {
	setError: (error: string) => void
	setLoading: (isLoading: boolean) => void
	clearState: () => void
	setProducts: (products: Product[]) => void
	createProduct: (product: ProductCreateRequest) => Promise<boolean>
	getProducts: (payload: getProductsPayload) => Promise<Product[] | false>
	getProduct: (id: string) => Promise<Product | false>
	deleteProduct: (productId: string) => Promise<boolean>
	updateProduct: (product: Partial<Product>, id: string) => Promise<boolean>
	getPurchasedProducts: (
		params: getProductsPayload
	) => Promise<ProductPurchased[] | false>
}
