import { styled } from '@mui/system'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Container from '@mui/material/Container'
import { Props } from './interfaces'
import { Controller, FieldValues } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'

const DAYS = [
	{ key: 'sunday', label: 'SUNDAY' },
	{ key: 'monday', label: 'MONDAY' },
	{ key: 'tuesday', label: 'TUESDAY' },
	{ key: 'wednesday', label: 'WEDNESDAY' },
	{ key: 'thursday', label: 'THURSDAY' },
	{ key: 'friday', label: 'FRIDAY' },
	{ key: 'saturday', label: 'SATURDAY' }
]

const localesStartingMonday = [
	'af-ZA', // Afrikaans (South Africa)
	'am-ET', // Amharic (Ethiopia)
	'ar-DZ', // Arabic (Algeria)
	'ar-LY', // Arabic (Libya)
	'ar-MA', // Arabic (Morocco)
	'az-Cyrl-AZ', // Azerbaijani (Cyrillic, Azerbaijan)
	'az-Latn-AZ', // Azerbaijani (Latin, Azerbaijan)
	'be-BY', // Belarusian (Belarus)
	'bg-BG', // Bulgarian (Bulgaria)
	'bn-BD', // Bengali (Bangladesh)
	'bs-Cyrl-BA', // Bosnian (Cyrillic, Bosnia and Herzegovina)
	'bs-Latn-BA', // Bosnian (Latin, Bosnia and Herzegovina)
	'ca-ES', // Catalan (Spain)
	'cs-CZ', // Czech (Czech Republic)
	'cy-GB', // Welsh (United Kingdom)
	'da-DK', // Danish (Denmark)
	'de-AT', // German (Austria)
	'de-CH', // German (Switzerland)
	'de-DE', // German (Germany)
	'de-LI', // German (Liechtenstein)
	'de-LU', // German (Luxembourg)
	'el-CY', // Greek (Cyprus)
	'el-GR', // Greek (Greece)
	'en-AU', // English (Australia)
	'en-GB', // English (United Kingdom)
	'en-IE', // English (Ireland)
	'en-NZ', // English (New Zealand)
	'es', // Spanish
	'es-CO', // Spanish (Colombia)
	'es-ES', // Spanish (Spain)
	'et-EE', // Estonian (Estonia)
	'eu-ES', // Basque (Spain)
	'fi-FI', // Finnish (Finland)
	'fo-FO', // Faroese (Faroe Islands)
	'fr-BE', // French (Belgium)
	'fr-CH', // French (Switzerland)
	'fr-FR', // French (France)
	'fr-LU', // French (Luxembourg)
	'ga-IE', // Irish (Ireland)
	'gl-ES', // Galician (Spain)
	'hr-HR', // Croatian (Croatia)
	'hu-HU', // Hungarian (Hungary)
	'hy-AM', // Armenian (Armenia)
	'is-IS', // Icelandic (Iceland)
	'it-CH', // Italian (Switzerland)
	'it-IT', // Italian (Italy)
	'ka-GE', // Georgian (Georgia)
	'kk-KZ', // Kazakh (Kazakhstan)
	'kl-GL', // Kalaallisut (Greenland)
	'lt-LT', // Lithuanian (Lithuania)
	'lv-LV', // Latvian (Latvia)
	'mk-MK', // Macedonian (North Macedonia)
	'mn-MN', // Mongolian (Mongolia)
	'nb-NO', // Norwegian Bokmål (Norway)
	'nl-BE', // Dutch (Belgium)
	'nl-NL', // Dutch (Netherlands)
	'nn-NO', // Norwegian Nynorsk (Norway)
	'pl-PL', // Polish (Poland)
	'pt-PT', // Portuguese (Portugal)
	'ro-RO', // Romanian (Romania)
	'ru-RU', // Russian (Russia)
	'sk-SK', // Slovak (Slovakia)
	'sl-SI', // Slovenian (Slovenia)
	'sq-AL', // Albanian (Albania)
	'sr-Cyrl-RS', // Serbian (Cyrillic, Serbia)
	'sr-Latn-RS', // Serbian (Latin, Serbia)
	'sv-FI', // Swedish (Finland)
	'sv-SE', // Swedish (Sweden)
	'tr-TR', // Turkish (Turkey)
	'uk-UA' // Ukrainian (Ukraine)
]

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	'.MuiToggleButtonGroup-grouped': {
		margin: theme.spacing(0.5),
		border: '1px solid',
		borderColor: theme.palette.primary.main,
		borderRadius: '50%',
		'&:not(:first-of-type)': {
			marginLeft: theme.spacing(0)
		}
	}
}))

const StyledToggle = styled(ToggleButton)(({ theme }) => ({
	color: theme.palette.primary.main,
	'&.Mui-selected': {
		color: 'white',
		backgroundColor: theme.palette.primary.main
	},
	'&:hover': {
		borderColor: theme.palette.primary.light,
		backgroundColor: theme.palette.primary.light
	},
	'&:hover.Mui-selected': {
		backgroundColor: theme.palette.primary.light,
		borderColor: theme.palette.primary.light
	},
	'&.Mui-disabled': {
		color: theme.palette.text.disabled,
		border: 'none'
	},
	'&.Mui-disabled.Mui-selected': {
		backgroundColor: theme.palette.action.disabledBackground
	},
	minWidth: 32,
	maxWidth: 32,
	height: 32,
	fontSize: '0.75rem',
	lineHeight: 0
}))
const CenteredContainer = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%; // Or any other value depending on your layout
`

export default function DayOfTheWeekController<
	T extends FieldValues = FieldValues
>({ control, name, label, disabled }: Props<T>) {
	const { t, i18n } = useTranslation()

	if (
		localesStartingMonday.includes(i18n.language) &&
		DAYS[0].key !== 'monday'
	) {
		DAYS.push(DAYS.shift() as (typeof DAYS)[number]) // Move Sunday to the end
	}
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value, onChange, ref },
				fieldState: { error }
			}) => (
				<Container fixed className='px-0'>
					<Typography
						color={disabled ? 'GrayText' : 'InfoText'}
						variant='subtitle2'
						className='mb-2'>
						{label}
					</Typography>
					<CenteredContainer>
						<StyledToggleButtonGroup
							size='small'
							aria-label='Days of the week'
							value={value}
							exclusive={false}
							onChange={(_, newDays) => {
								onChange(newDays)
							}}
							ref={ref}
							disabled={disabled}>
							{DAYS.map((day) => (
								<StyledToggle
									key={day.key}
									value={day.key}
									aria-label={day.key}
									selected={value?.includes(day.key)}>
									{t(`form.daysOfTheWeekValues.${day.label}`)}
								</StyledToggle>
							))}
						</StyledToggleButtonGroup>
					</CenteredContainer>
					{error && (
						<FormHelperText error>
							{t(error.message as string)}
						</FormHelperText>
					)}
				</Container>
			)}
		/>
	)
}
