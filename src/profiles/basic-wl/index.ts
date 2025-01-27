import { getAsset } from '../../helper'
import { createProfile } from '../../profile'
import { InferSchema } from '../../types/schema'
import { MINIMUM } from '../minimum'
import { basicWlSchema } from './schema'

export const BASIC_WL = createProfile({
	contextParameter: 'urn:factur-x.eu:1p0:basicwl',
	extends: MINIMUM,
	schema: basicWlSchema,
	xsdPath: getAsset('Factur-X_1.07.2_BASICWL.xsd')
})

export type ProfileBasicWL = InferSchema<typeof BASIC_WL>