export const globalVariables = (): NodeJS.ProcessEnv | ImportMetaEnv => {
	const processEnv = typeof window === 'undefined' ? process : undefined

	return processEnv ? process.env : import.meta.env
}
