export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title (required)',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Site SubTitle'
    },
    {
      name: 'website',
      type: 'url',
      title: 'Website URl',
      validation: Rule => Rule.required()
    },
    {
      name: 'keywords',
      type: 'string',
      title: 'Site Keywords',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Site Description',

    },

    {
      name: 'logo',
      type: 'image',
      title: 'Site Logo (required)',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'logoDark',
      type: 'image',
      title: 'Site Logo Dark (required)',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Site Image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'footer',
      type: 'text',
      title: 'Site Footer (required)',
      validation: Rule => Rule.required()
    },
  ]
}
// Compare this snippet from blog\schemas\doctor.js:
