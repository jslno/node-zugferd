import { getAsset } from '../../helper'
import { createProfile } from '../../profiles'
import { InferSchema } from '../../types/schema'
import { BASIC } from '../basic'
import { en16931Schema } from './schema'

export const EN16931 = createProfile({
	contextParameter: 'urn:cen.eu:en16931:2017',
	extends: BASIC,
	schema: en16931Schema,
	xsdPath: getAsset('Factur-X_1.07.2_EN16931.xsd')
})

export type ProfileEN16931 = InferSchema<typeof EN16931>

export { EN16931 as COMFORT }

export type { ProfileEN16931 as ProfileComfort }
