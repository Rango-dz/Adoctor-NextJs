import doctorSpeacialties from './doctor-speacialties';
import gender from './gender';
import countries from './countries';
import { GiFirstAidKit } from 'react-icons/gi';

export default {
  name: 'doctor',
  title: 'List of Doctors',
  type: 'document',
  icon: GiFirstAidKit,
  initialValue: {
    phoneNumber: 5554204035,
    openingHours:
      [
        { _type: "dayAndTime", day: "Monday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Tuesday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Wednesday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Thursday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Friday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Saturday", opensAt: '08:00', closesAt: '17:00' },
        { _type: "dayAndTime", day: "Sunday", opensAt: '08:00', closesAt: '17:00' },
      ],
    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: 'image-e8c3aeeb6cf54f3b96b460647e91d1e8fd25414d-512x512-png' } },
    location: { _type: 'geopoint', lat: 40.5142539, lng: -74.251135, alt: 15 },

  },
  groups: [
    {
      name: 'Main',
      title: 'Main',
      default: true
    },
    {
      name: 'Doctor Info',
      title: 'Doctor Info',
    },
    {
      name: 'Address',
      title: 'Address',
    },
    {
      name: 'Social',
      title: 'Social',
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Full Name (required)',
      type: 'string',
      group: 'Main',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (required)',
      type: 'slug',
      group: 'Main',
      options: {
        // Change to schema title to automatically populate
        source: 'name',
        maxLength: 200,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'Speicialties',
      title: 'Specialties (required)',
      type: 'string',
      group: 'Main',
      options: {
        list: [...doctorSpeacialties],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'phoneNumber',
      title: 'Phone',
      type: 'number',
      group: 'Main',
    },
    {
      name: 'doctoremail',
      title: 'Email',
      type: 'string',
      group: 'Main',
      validation: (Rule) =>
        Rule.regex(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
    },
    {
      title: 'Opening Hours (required)',
      name: 'openingHours',
      group: 'Main',
      type: 'array',
      of: [{ type: 'dayAndTime' }],
      validation: Rule => Rule.required()
    },
    {
      title: 'Text (required)',
      name: 'text',
      type: 'array',
      group: 'Main',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Image (required)',
      type: 'image',
      group: 'Main',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },

    // doctor info
    {
      name: 'Gender',
      title: 'Gender (required)',
      type: 'string',
      group: 'Doctor Info',
      options: {
        list: [...gender],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'Languages',
      title: 'Language (required)',
      type: 'tags',
      group: 'Doctor Info',
      options: {
        includeFromRelated: 'Languages',
        predefinedTags: [
          { label: 'Arabic', value: 'Arabic' },
          { label: 'French', value: 'French' },
          { label: 'English', value: 'English' },
        ],
        allowCreate: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'Expertise',
      title: 'Expertise',
      type: 'tags',
      group: 'Doctor Info',
      options: {
        includeFromRelated: 'Expertise',
        allowCreate: true,
      },
    },
    {
      name: 'Services',
      title: 'Services',
      type: 'tags',
      group: 'Doctor Info',
      options: {
        includeFromRelated: 'Services',
        allowCreate: true,
      },
    },
    {
      name: 'Education',
      title: 'Education',
      type: 'tags',
      group: 'Doctor Info',
      options: {
        includeFromRelated: 'Education',
        allowCreate: true,
      },
    },
    {
      name: 'Awards',
      title: 'Awards',
      type: 'tags',
      group: 'Doctor Info',
      options: {
        includeFromRelated: 'Awards',
        allowCreate: true,
      },
    },


    // address
    {
      title: 'Country (required)',
      name: 'Country',
      type: 'string',
      group: 'Address',
      options: {
        list: [...countries],
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'City (required)',
      name: 'city',
      type: 'string',
      group: 'Address',
      validation: Rule => Rule.required()
    },
    {
      title: 'Zip Code (required)',
      name: 'zipcode',
      type: 'number',
      group: 'Address',
      validation: Rule => Rule.required()
    },
    {
      name: 'Office',
      title: 'Office Address (required)',
      type: 'string',
      group: 'Address',
      validation: Rule => Rule.required()
    },
    {
      title: 'Geo Location (required)',
      name: 'location',
      type: 'geopoint',
      group: 'Address',
      validation: Rule => Rule.required()
    },


    // social
    {
      name: 'Website',
      title: 'Website',
      type: 'url',
      group: 'Social',
    },
    {
      name: 'Facebook',
      title: 'Facebook',
      type: 'url',
      group: 'Social',
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
      name: 'Youtube',
      title: 'Youtube',
      type: 'url',
      group: 'Social',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage'
    }
  }
};
