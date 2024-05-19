export enum documentType {
	'Cédula de ciudadanía' = 'CC',
	'Cédula de extranjería' = 'CE',
	Pasaporte = 'PA'
}

export type DocumentType = `${documentType}`
export type DocumentTypeKey = keyof typeof documentType

export enum genderType {
	Masculino = 'M',
	Femenino = 'F',
	Otro = 'O'
}

export type GenderType = `${genderType}`
export type GenderTypeKey = keyof typeof genderType
