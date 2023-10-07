import { type SchemaTypeDefinition } from 'sanity'
import product from './product';
import productImage from './productImage'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productImage, product],
}
