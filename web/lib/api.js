import sanityClient from './client';

export async function getAlldata() {
  const response = await sanityClient.fetch(
    `{
      "allPostsData":*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      },
      "categories": categories[]->{
      title,
      slug,
       },
       "tag":Tags[]{value},
      body[0],
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      
    },
    "sectionReview":*[_type == "Reviews"]{
   name,
   rating,
   review,
   image{
   asset->{
   url
 }
 },
_id},
"sectionService": *[_type == "departments"]{
        title,
  "image": image{
    asset->{
    url
  }
  },
"doc":doctor->{
  name
}  , 
"text":text[]{
  children[]{
    text,
  }
}
},
"serviceOne": *[_type == "HomeFeatures"]{
        name,
        image{
          asset->{
          url
          }
        }
},
  "doctors":*[_type == "doctor"]{
        "image":mainImage{
          asset->{
          url
        }
      },
        ...
        
    },
  "doctorSettings":* [_type == "TheDoctor"]{
    "image":mainImage{ asset -> { url } },
...
  },
}`
  );
  return response;
}

export async function siteSettings() {
  const response = await sanityClient.fetch(
    `*[_type == "siteSettings"]{
  "logoimage":logo{asset->{url}},
  "logoDarkimage":logoDark{asset->{url}},
  "socialimage":image{asset->{url}},
  "homeImage": HomeImage{asset->{url}},
  "aboutImage": AboutImage{asset->{url}},
  "homeImage": HomeImage{asset->{url}},
  ...
    }
    `
  );
  return response;
}

export async function articles() {
  const response = await sanityClient.fetch(
    `*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      },
      "categories": categories[]->{
      title,
      slug,
       },
       "tag":Tags[]{value},
      body[0],
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      
    }
    `
  );
  return response;
}

