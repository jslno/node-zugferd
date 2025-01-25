import { getAsset } from '../../helper'
import { createProfile } from '../../profiles'
import { InferSchema } from '../../types/schema'
import { EN16931 } from '../en16931'
import { extendedSchema } from './schema'

export const EXTENDED = createProfile({
	contextParameter: 'urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended',
	extends: EN16931,
	schema: extendedSchema,
	xsdPath: getAsset('Factur-X_1.07.2_EXTENDED.xsd')
})

export type ExtendedSchema = InferSchema<typeof EXTENDED>