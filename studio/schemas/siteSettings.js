export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  groups: [
    {
      name: 'Main',
      title: 'Main',
      default: true
    },
    {
      name: 'Seo',
      title: 'Seo',
    },
    {
      name: 'Social',
      title: 'Social',
    },
    {
      name: 'Header',
      title: 'Header',
    },
    {
      name: 'Footer',
      title: 'Footer',
    },
    {
      name: 'Heading',
      title: 'Heading',
    }

  ],
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
      title: 'Site SubTitle',
      group: 'Main',
    },
    {
      name: 'keywords',
      type: 'string',
      title: 'Site Keywords',
      group: 'Seo',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Site Description',
      group: 'Seo',
    },

    {
      name: 'logo',
      type: 'image',
      title: 'Site Logo (required)',
      options: {
        hotspot: true,
      },
      group: 'Header',
      validation: Rule => Rule.required()
    },
    {
      name: 'logoDark',
      type: 'image',
      title: 'Site Logo Dark (required)',
      options: {
        hotspot: true,
      },
      group: 'Header',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Site Image',
      options: {
        hotspot: true,
      },
      group: 'Seo',
    },
    {
      name: 'footer',
      type: 'text',
      title: 'Site Footer (required)',
      group: 'Footer',
      validation: Rule => Rule.required()
    },
    {
      name: 'footerMenuOne',
      type: 'array',
      title: 'Footer Menu One',
      group: 'Footer',
      of: [
        {
          type: 'menu'
        }
      ],
    },
    {
      name: 'footerMenuTwo',
      type: 'array',
      title: 'Footer Menu Two',
      group: 'Footer',
      of: [
        {
          type: 'menu'
        }
      ],
    },
    {
      name: 'MainMenu',
      type: 'array',
      title: 'Main Menu',
      group: 'Header',
      of: [
        {
          type: 'menu'
        }
      ],
    },
    {
      name: 'phoneNumber',
      title: 'Phone',
      type: 'number',
      group: 'Main',
    },
    {
      name: 'siteemail',
      title: 'Email',
      type: 'string',
      group: 'Main',
      validation: (Rule) =>
        Rule.regex(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
    },
    // social
    {
      name: 'Website',
      title: 'Website',
      type: 'url',
      group: 'Social',
      option: {
        placeholder: 'https://www.example.com',
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'Facebook',
      title: 'Facebook',
      type: 'url',
      group: 'Social',
      initialValue: {
        name: 'https://www.facebook.com/',
      }
    },
    {
      name: 'Instagram',
      title: 'Instagram',
      type: 'url',
      group: 'Social',
    },
    {
      name: 'Twitter',
      title: 'Twitter',
      type: 'url',
      group: 'Social',
    },
    {
      name: 'Pinterest',
      title: 'Pinterest',
      type: 'url',
      group: 'Social',
    },
    {
      name: 'Youtube',
      title: 'Youtube',
      type: 'url',
      group: 'Social',
    },

    {
      name: 'HomeHeading',
      title: 'Home Title (required)',
      type: 'text',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'HomeSubtitle',
      title: 'Home Subtitle (required)',
      type: 'text',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'Hometext',
      title: 'Home Text (required)',
      type: 'text',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'HomeImage',
      title: 'Home Image (required)',
      type: 'image',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'AboutHeading',
      title: 'About Title (required)',
      type: 'text',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'AboutSubtitle',
      title: 'About Subtitle (required)',
      type: 'text',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
    {
      name: 'AboutImage',
      title: 'About Image (required)',
      type: 'image',
      group: ['Heading'],
      validation: Rule => Rule.required()
    },
  ]
}
// Compare this snippet from blog\schemas\doctor.js:
