import 'components/Spinner/_index.scss'
import { Props } from 'components/Spinner/interfaces'

export default function Spinner({ className, ...props }: Props) {
	return (
		<div className={`sk-chase ${className}`} {...props}>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
		</div>
	)
}
