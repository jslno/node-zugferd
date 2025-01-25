import { getAsset } from '../../helper'
import { createProfile } from '../../profiles'
import { InferSchema } from '../../types/schema'
import { BASIC_WL } from '../basic-wl'
import { basicSchema } from './schema'

export const BASIC = createProfile({
	contextParameter: 'urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic',
	extends: BASIC_WL,
	schema: basicSchema,
	xsdPath: getAsset('Factur-X_1.07.2_BASIC.xsd')
})

export type ProfileBasic = InferSchema<typeof BASIC>
