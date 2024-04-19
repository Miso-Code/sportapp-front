export interface IAlertStore extends IAlertState, IAlertActions {}

export interface IAlertState {
	alert: Alert | undefined
}

export interface Alert {
	type: 'error' | 'success' | 'info' | 'warning'
	message: string
	ttl?: number
	position?: 'top' | 'bottom' | 'center'
}

export interface IAlertActions {
	setAlert: (alert: Alert) => void
	clearState: () => void
}
