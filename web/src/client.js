import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID || '25jlwdnp', // find this at manage.sanity.io or in your sanity.json
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', // this is from those question during 'sanity init'
  apiVersion: '2021-10-21',
  useCdn: true,
});