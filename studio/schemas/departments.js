import { GiHospital } from "react-icons/gi";

export default {
  name: 'departments',
  title: 'Departments / Services',
  type: 'document',
  icon: GiHospital,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Doctor',
      name: 'doctor',
      type: 'reference',
      to: [{ type: 'doctor' }],

    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
  ]
}