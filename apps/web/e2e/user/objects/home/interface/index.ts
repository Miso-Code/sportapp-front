export enum allergyType {
	LACTOSE_FREE = 'Sin lactosa',
	NO_MARISKS = 'Sin mariscos',
	NO_DRY_FRUITS = 'Sin frutos secos',
	SUGAR_FREE = 'Sin azucar',
	GLUTEN_FREE = 'Sin gluten'
}

export type AllergyType = `${allergyType}`

export enum preferenceType {
	VEGETARIAN = 'Vegetariano',
	VEGAN = 'Vegano',
	OMNIVOROUS = 'Omnivoro'
}

export enum preferenceTypeValue {
	VEGETARIAN = 'vegetarian',
	VEGAN = 'vegan',
	OMNIVOROUS = 'everything'
}

export type PreferenceType = `${preferenceType}`

export enum favoriteSportType {
	CYCLING = 'Ciclismo',
	ATHLETICS = 'Atletismo'
}

export type FavoriteSportType = `${favoriteSportType}`

export enum trainingObjective {
	WEIGHT_LOSS = 'Pérdida de peso',
	MASS_GAIN = 'Aumento de masa muscular',
	TONING = 'Tonificación',
	KEEP_FIT = 'Mantener la forma física'
}

export type TrainingObjective = `${trainingObjective}`

export enum trainingDays {
	MONDAY = 'monday',
	TUESDAY = 'tuesday',
	WEDNESDAY = 'wednesday',
	THURSDAY = 'thursday',
	FRIDAY = 'friday',
	SATURDAY = 'saturday',
	SUNDAY = 'sunday'
}

export type TrainingDays = `${trainingDays}`
