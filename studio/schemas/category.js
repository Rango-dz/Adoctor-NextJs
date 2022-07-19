export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    // add a unique slug field for queries, permalinks etc
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        // auto generates a slug from the title field
        source: 'title',
        auto: true
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Poster',
      name: 'poster',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ]
}