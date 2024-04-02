import { useAuthStore } from '@sportapp/stores/src/auth'

export const useAuthValidation = () => {
	const { isAuth } = useAuthStore()

	console.log('isAuth', isAuth)

	return isAuth
}
