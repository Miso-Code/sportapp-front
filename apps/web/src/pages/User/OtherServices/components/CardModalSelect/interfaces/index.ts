import { Product } from '@sportapp/sportapp-repository/src/businessPartner/interfaces'

export interface Props {
	selectedProduct: Product
	quantity: string
	handleQuantityChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	handleClose: () => void
	handleSuccess: () => void
}
