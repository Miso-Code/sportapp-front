import { format } from 'date-fns'
import fs from 'node:fs'
import path from 'path'

export const generateJsonFile = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	obj: any,
	options: {
		browserName: string
		title: string
		flowName: string
	}
) => {
	const data = JSON.stringify(obj, null, 2)
	const date = format(new Date(), 'yyyy-MM-dd HH-mm-ss')
	const { pathname: root } = new URL('../exports', import.meta.url)
	const file = path.join(
		root,
		`${options.flowName}-${date}-${options.browserName}_${options.title}.json`
	)
	fs.writeFileSync(file, data, { mode: 0o600 })
}
