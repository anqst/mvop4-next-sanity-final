import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import category from './category'

export const schemaTypes = [post, blockContent, category]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, category],
}
