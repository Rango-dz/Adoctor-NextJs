import { GiHouse } from "react-icons/gi";

export default {
  name: 'HomeFeatures',
  type: 'document',
  title: 'Home Features',
  icon: GiHouse,
  fields: [
    {
      name: 'name',
      title: 'Name (required)',
      type: 'string',
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