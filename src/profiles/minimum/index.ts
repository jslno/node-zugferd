import { getAsset } from '../../helper'
import { createProfile } from '../../profiles'
import { InferSchema } from '../../types/schema'
import { minimumSchema } from './schema'

export const MINIMUM = createProfile({
	contextParameter: 'urn:factur-x.eu:1p0:minimum',
	schema: minimumSchema,
	xsdPath: getAsset('Factur-X_1.07.2_MINIMUM.xsd')
})

export type ProfileMinimum = InferSchema<typeof MINIMUM>