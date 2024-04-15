import 'components/SecondarySection/_index.scss'
import { Props } from 'components/SecondarySection/interfaces'

export default function SecondarySection({ image, altImage }: Props) {
	return (
		<section className='section-secondary'>
			<figure className='container-image'>
				<img className='image-register' src={image} alt={altImage} />
			</figure>
		</section>
	)
}
