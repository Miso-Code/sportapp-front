import { Product } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product'
import { ProductCreateRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'

export interface IProductStore extends IProductState, IProductActions {}

export interface IProductState {
	products?: Product[] | undefined
	error: string | undefined
	loading: boolean
	selectedProduct?: Product | undefined
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
	deleteProduct: (productId: string) => Promise<boolean>
}
