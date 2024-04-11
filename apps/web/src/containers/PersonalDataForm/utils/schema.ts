import defaultRegisterSchema from '@/containers/Register/Default/utils/schema'
import fullRegisterSchema from '@/containers/Register/Full/utils/schema'
import 'config/lang/form.ts'
import { InferType } from 'yup'

const personalDataSchema = defaultRegisterSchema.concat(fullRegisterSchema)

export default personalDataSchema

export type FormData = InferType<typeof personalDataSchema>
