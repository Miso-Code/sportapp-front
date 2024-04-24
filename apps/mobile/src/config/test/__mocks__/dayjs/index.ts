class DayJs {
	private date: string

	constructor(date: string | Date = new Date()) {
		this.date = new Date(date).toISOString().slice(0, -7) + '00Z'
	}

	toDate() {
		return new Date(this.date)
	}

	add(_duration: number, _unit: string) {
		if (_unit === 'days') {
			const date = new Date(this.date)
			date.setDate(date.getDate() + _duration)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'years') {
			const date = new Date(this.date)
			date.setFullYear(date.getFullYear() + _duration)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'months') {
			const date = new Date(this.date)
			date.setMonth(date.getMonth() + _duration)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'hours') {
			const date = new Date(this.date)
			date.setHours(date.getHours() + _duration, 0, 0, 0)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'minutes') {
			const date = new Date(this.date)
			date.setMinutes(date.getMinutes() + _duration, 0, 0)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'seconds') {
			const date = new Date(this.date)
			date.setSeconds(date.getSeconds() + _duration, 0)
			this.date = new Date(date).toISOString()
		} else if (_unit === 'week') {
			const date = new Date(this.date)
			const day = date.getDay()
			if (day + _duration * 7 > 31) {
				date.setMonth(date.getMonth() + 1)
				date.setDate(1)
			} else {
				date.setDate(date.getDate() + _duration * 7)
			}
			this.date = new Date(date).toISOString()
		}
		return this
	}

	locale(_language: string) {
		return this
	}

	format(_format: string) {
		return this.date.substring(0, 6)
	}

	extend() {
		return this
	}
	isAfter(other: DayJs) {
		return this.toDate() > other.toDate()
	}

	isBefore(other: DayJs) {
		return this.toDate() < other.toDate()
	}

	isSame(other: DayJs) {
		return this.toDate() === other.toDate()
	}

	isSameOrAfter(other: DayJs) {
		return this.toDate() >= other.toDate()
	}

	isSameOrBefore(other: DayJs) {
		return this.toDate() <= other.toDate()
	}

	isBetween(start: DayJs, end: DayJs) {
		return this.isAfter(start) && this.isBefore(end)
	}

	diff(other: DayJs, _unit: string) {
		return this.toDate().getTime() - other.toDate().getTime()
	}

	clone() {
		return this
	}

	startOf(_unit: string) {
		const date = new Date(this.date)
		date.setHours(0, 0, 0, 0)
		return this
	}

	hour(hour: number) {
		const date = new Date(this.date)
		date.setHours(hour, 0, 0, 0)
		this.date = new Date(date).toISOString()
		return this
	}

	minute(minute: number) {
		const date = new Date(this.date)
		date.setMinutes(minute, 0, 0)
		this.date = new Date(date).toISOString()
		return this
	}

	weekday(day = 1) {
		const date = new Date(this.date).setDate(day)
		this.date = new Date(date).toISOString()
		return this
	}
}

const dayjs = (date: string | Date) => new DayJs(date)
dayjs.extend = () => dayjs

export default dayjs
