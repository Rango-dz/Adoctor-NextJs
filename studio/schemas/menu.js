export default {
  name: 'menu',
  type: 'object',
  title: 'Main Menu',
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: 'Url',
      type: 'url',
      title: 'Url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel', '/'],
      })
    },

  ]
}