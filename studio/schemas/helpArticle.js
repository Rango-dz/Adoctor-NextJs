import { GiTalk } from "react-icons/gi";

export default {
  name: 'Faq',
  title: 'Frequently asked question',
  type: 'document',
  icon: GiTalk,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title (required)',
      validation: Rule => Rule.required()

    },
    {
      name: 'faqs',
      type: 'array',
      title: 'Frequently Asked Questions (required)',
      of: [
        {
          type: 'faq'
        }
      ],
      validation: Rule => Rule.required()

    }
  ]
}