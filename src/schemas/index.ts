import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import category from './category'
import author from './author'

export const schemaTypes = [post, blockContent, category, author]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, category, author],
}
