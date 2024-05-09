export interface SportEvent {
	event_id: string,
	sport_id: string,
	location_latitude: number,
	location_longitude: number,
	start_date: string,
	end_date: string,
	title: string,
	capacity: number,
	description: string
}