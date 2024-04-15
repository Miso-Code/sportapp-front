class DayJs {
	private date: string

	constructor(date: string | Date = new Date()) {
		this.date = new Date(date).toISOString()
	}

	toDate() {
		return new Date(this.date)
	}

	add(_duration: number, _unit: string) {
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
}

export default (date) => new DayJs(date)
