// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import doctors from './doctors'
import dayAndTime from './objects/dayAndTime'
import faq from './faq'
import helpArticle from './helpArticle'
import departments from './departments'
import reviews from './reviews'
import social from './social'
import HomeFeatures from './HomeFeatures'
import siteSettings from './siteSettings'
import TheDoctor from './TheDoctor'
import HeroHeading from './HeroHeading'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'adoctor',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    category,
    doctors,
    dayAndTime,
    faq,
    helpArticle,
    social,
    departments,
    reviews,
    HomeFeatures,
    siteSettings,
    TheDoctor,
    HeroHeading,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent
  ])
})