import { Typography } from '@mui/material'
import MarkdownEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { Props } from './interfaces'

export default function InputMarckDown({
	label,
	value: markdown,
	onChange: setMarkdown
}: Props) {
	return (
		<div data-color-mode='light' className='w-full'>
			<Typography
				component='label'
				className='text-[#00000099] leading-8'
				variant='body1'>
				{label}
			</Typography>
			<div className='wmde-markdown-var'> </div>
			<MarkdownEditor
				value={markdown}
				height='477px'
				onChange={setMarkdown}
				previewOptions={{
					rehypePlugins: [[rehypeSanitize]]
				}}
			/>
		</div>
	)
}
