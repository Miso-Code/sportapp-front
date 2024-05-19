/* eslint-disable no-unused-vars */
enum IdentificationTypeEs {
	CC = 'Cédula de ciudadanía',
	CE = 'Cédula de extranjería',
	PA = 'Pasaporte'
}

enum GenderEs {
	M = 'Masculino',
	F = 'Femenino',
	O = 'Otro'
}

export const identificationTypeToText = (key: 'CC' | 'CE' | 'PA') => {
	return IdentificationTypeEs[key]
}

export const genderToText = (key: 'M' | 'F' | 'O') => {
	return GenderEs[key]
}
