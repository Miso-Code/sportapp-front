import { AxiosRequestConfig } from 'axios'
import { Product } from './product'
import { ProductCreateRequest } from './product-create'

export interface ProductUpdateRequestPayload {
	options: AxiosRequestConfig
	data: Partial<ProductCreateRequest>
}

/* export interface ProductData extends ProductCreateRequest {
	
} */

export interface ProductUpdateResponse extends Product {}
