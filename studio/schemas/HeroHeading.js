import { GiBookmark } from "react-icons/gi";

export default {
  name: 'HeroHeading',
  title: 'Hero Heading',
  type: 'document',
  icon: GiBookmark,
  initialValue: {
  },
  groups: [
    {
      name: 'HomePage',
      title: 'Home Page',
      default: true,
    },
    {
      name: 'DoctorsPage',
      title: 'Doctors Page',
    },

  ],
  fields: [
    {
      name: 'HomeHeading',
      title: 'Home Title (required)',
      type: 'text',
      group: ['HomePage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'HomeSubtitle',
      title: 'Home Subtitle (required)',
      type: 'text',
      group: ['HomePage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'Hometext',
      title: 'Home Text (required)',
      type: 'text',
      group: ['HomePage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'HomeImage',
      title: 'Home Image (required)',
      type: 'image',
      group: ['HomePage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'DoctorsHeading',
      title: 'Doctors Title (required)',
      type: 'text',
      group: ['DoctorsPage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'DoctorsSubtitle',
      title: 'Doctors Subtitle (required)',
      type: 'text',
      group: ['DoctorsPage'],
      validation: Rule => Rule.required()
    },
    {
      name: 'DoctorImage',
      title: 'Doctors Image (required)',
      type: 'image',
      group: ['DoctorsPage'],
      validation: Rule => Rule.required()
    },
  ]
}



