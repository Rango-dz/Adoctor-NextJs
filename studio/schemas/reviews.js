import { GiBubbles } from "react-icons/gi";

export default {
  name: 'Reviews',
  title: 'Patients Reviews',
  type: 'document',
  icon: GiBubbles,
  fields: [
    {
      name: 'name',
      title: 'Name (required)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'review',
      title: 'Review (required)',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating (required)',
      type: 'rating',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image (required)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
  ]
}