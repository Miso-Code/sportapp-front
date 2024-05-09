/* eslint-disable no-console */
import { User, BusinessPartner, Product } from './interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'
import BusinessPartnerApi from '@sportapp/sportapp-repository/src/business-partner'

const userApi = new UserApi()
const businessPartnerApi = new BusinessPartnerApi()

export const registerUser = async (user: User) => {
	const { first_name, last_name, email, password, ...completeRegister } = user
	await userApi.register({
		first_name,
		last_name,
		email,
		password
	})

	const auth = await userApi.login({
		email,
		password
	})

	await userApi.registerFull(completeRegister, {
		headers: {
			Authorization: `Bearer ${auth.access_token}`
		}
	})
}

export const registerBusisnessPartner = async (partner: BusinessPartner) => {
	await businessPartnerApi.register({ ...partner })
	const auth = await businessPartnerApi.login({
		email: partner.email,
		password: partner.password
	})
	if (!auth) return
	partner.token = auth.access_token
}

export const createProduct = async (product: Product, token: string) => {
	console.log('Creating product', product)
	await businessPartnerApi.createProduct({
		product,
		options: {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	})
}

export const deleteAllProducts = async (token: string) => {
	const products = await businessPartnerApi.getAllProducts({
		options: {
			headers: {
				Authorization: `Bearer ${token}`
			}
		},
		params: {
			offset: 0,
			limit: 100
		}
	})
	console.log('Deleting products', products)
	if (!products) return
	await Promise.all(
		products.map(async (product) => {
			await businessPartnerApi.deleteProduct({
				product_id: product.product_id,
				options: {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			})
		})
	)
}
