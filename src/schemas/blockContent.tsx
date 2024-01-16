import { ReactElement, JSXElementConstructor } from 'react'
import { BlockStyleProps, defineArrayMember, defineType } from 'sanity'
import Highlight from '~/components/Highlight'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
        {
          title: 'Highlight',
          value: 'highlight',
          component: (props) => (
            <Highlight
              block={undefined}
              focused={false}
              renderDefault={function (
                props: BlockStyleProps,
              ): ReactElement<any, string | JSXElementConstructor<any>> {
                throw new Error('Function not implemented.')
              }}
              schemaType={undefined}
              selected={false}
              title={''}
              value={''}
            >
              {props.children}
            </Highlight>
          ),
        },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Code',
            value: 'code',
            component: (props) => (
              <span
                style={{
                  backgroundColor: '#52bad4',
                  color: 'white',
                }}
              >
                {props.children}
              </span>
            ),
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
  ],
})
