import { GiNewShoot, GiNewspaper } from "react-icons/gi"

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: GiNewspaper,
  initialValue: {
    Featured: false,
  },
  groups: [
    {
      name: 'SEO',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title (required)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (required)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'doctor' },
    },
    {
      name: 'mainImage',
      title: 'Main image (required)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories (required)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',

    },
    {
      name: 'body',
      title: 'Body (required)',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'Tags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromRelated: "Tags",
        allowCreate: true,
      },
    },
    {
      name: 'Featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'titleSeo',
      title: 'Title Seo',
      type: 'string',
      group: 'SEO',
    },
    {
      name: 'keywordsSeo',
      title: 'keywords Seo',
      type: 'string',
      group: 'SEO',
    },
    {
      name: 'descriptionSeo',
      title: 'Description Seo',
      type: 'text',
      group: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
