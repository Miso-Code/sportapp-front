import { InferType, object, string } from 'yup'
import 'config/lang/form.ts'

const schema = object().shape({
	lang: string().oneOf(['en', 'es']).required()
})

export default schema

export type FormData = InferType<typeof schema>
