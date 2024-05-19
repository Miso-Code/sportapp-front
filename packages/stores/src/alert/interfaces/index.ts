export interface IAlertStore extends IAlertState, IAlertActions {}

export interface IAlertState {
	alert: Alert | undefined
	alertHistory: Alert[]
}

export interface Alert {
	type: 'error' | 'success' | 'info' | 'warning'
	message: string
	ttl?: number
	position?: 'top' | 'bottom' | 'center'
	createAt?: Date
}

export interface IAlertActions {
	setAlert: (alert: Alert | undefined) => void
	addHiddenAlertToHistory: (alert: Alert) => void
	clearState: () => void
}
