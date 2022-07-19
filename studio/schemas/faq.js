import { GiTalk } from "react-icons/gi";

export default {
  name: 'faq',
  type: 'object',
  title: 'Frequently asked question',
  icon: GiTalk,
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question'
    },
    {
      name: 'answer',
      type: 'text',
      title: 'Answer',
    }
  ]
}