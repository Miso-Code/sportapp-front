class DayJs {
	private date: string

	constructor(date: string | Date = new Date(), format?: string) {
		if (format === 'hh:mm A' && typeof date === 'string') {
			const today = new Date()
			const [hours, minutes, period] = date.split(/[:\s]/)
			let hour = parseInt(hours, 10)

			if (period === 'PM' && hour !== 12) {
				hour += 12
			} else if (period === 'AM' && hour === 12) {
				hour = 0
			}

			today.setHours(hour, parseInt(minutes, 10), 0, 0)
			this.date = today.toISOString().slice(0, -7) + '00Z'
		} else {
			this.date = new Date(date).toISOString().slice(0, -7) + '00Z'
		}
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
		if (_format === 'hh:mm A') {
			const date = new Date(this.date)
			let hours: string | number = date.getHours()
			const period = hours >= 12 ? 'PM' : 'AM'
			hours = hours % 12
			hours = hours ? hours : 12
			let minutes: string | number = date.getMinutes()
			if (hours < 10) hours = '0' + hours
			if (minutes < 10) minutes = '0' + minutes
			return `${hours}:${minutes} ${period}`
		}
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
		if (hour === undefined) {
			return new Date(this.date).getHours()
		}
		const date = new Date(this.date)
		date.setHours(hour, 0, 0, 0)
		this.date = new Date(date).toISOString()
		return this
	}

	minute(minute: number) {
		if (minute === undefined) {
			return new Date(this.date).getMinutes()
		}
		const date = new Date(this.date)
		date.setMinutes(minute, 0, 0)
		this.date = new Date(date).toISOString()
		return this
	}

	weekday(day = 1) {
		// defaults to monday
		const date = new Date(this.date).setDate(day)
		this.date = new Date(date).toISOString()
		return this
	}
}

const dayjs = (date: string | Date, format?: string) => new DayJs(date, format)
dayjs.extend = () => dayjs

export default dayjs
