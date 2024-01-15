import { defineField, defineType } from 'sanity'

const settings = {
  maxSlugLength: 128,
  maxExcerptLength: 256,
}

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: settings.maxSlugLength,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.max(settings.maxExcerptLength).error(
          `Maximal excerpt length is ${settings.maxExcerptLength}`,
        ),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'postCategory',
      title: 'Post Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'postAuthor',
      title: 'Post Author',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'author' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
