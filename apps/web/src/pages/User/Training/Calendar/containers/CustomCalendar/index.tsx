import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import es from 'date-fns/locale/es'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'
import { Props } from './interfaces'
import { components } from './utils'

import './_index.scss'

const locales = {
	es: es,
	en: enUS
}

export default function CustomCalendar({ events, onSelectEvent }: Props) {
	const { t, i18n } = useTranslation()

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales
	})

	return (
		<Calendar
			components={components}
			localizer={localizer}
			events={events}
			culture={i18n.language}
			startAccessor='start'
			endAccessor='end'
			messages={{
				allDay: t('training.allDay'),
				previous: t('training.previous'),
				next: t('training.next'),
				today: t('training.today'),
				month: t('training.month'),
				week: t('training.week'),
				day: t('training.day'),
				date: t('training.date'),
				time: t('training.hour'),
				event: t('training.event'),
				showMore: (total) => t('training.showMore', { total }),
				agenda: t('training.schedule'),
				noEventsInRange: t('training.nextEventsEmpty'),
				tomorrow: t('training.tomorrow'),
				yesterday: t('training.yesterday'),
				work_week: t('training.workWeek')
			}}
			onSelectEvent={onSelectEvent}
			className='training-calendar-component'
			style={{ maxHeight: 'calc(100vh - 200px)' }}
		/>
	)
}
