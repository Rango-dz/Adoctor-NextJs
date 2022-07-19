import socialList from "./socialList";

export default {
  name: 'social',
  type: 'object',
  title: 'Social Websites',
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
      options: {
        list: [...socialList],
      },
    },
    {
      name: 'Url',
      type: 'url',
      title: 'Url'
    },

  ]
}