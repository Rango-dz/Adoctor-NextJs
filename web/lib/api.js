import sanityClient from './client';

export async function getAlldata() {
  const response = await sanityClient.fetch(
    `{
     "siteSettings": *[_type == "siteSettings"]{
  "logoimage":logo{asset->{url}},
  "logoDarkimage":logoDark{asset->{url}},
  "socialimage":image{asset->{url}},
  ...
     },
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
"herohome":* [_type == "HeroHeading"]{
        'homeImage': HomeImage{ asset->{ url } },
        HomeHeading,
        HomeSubtitle,
        Hometext,
  },
  "doctorSettings":* [_type == "TheDoctor"]{
    "image":mainImage{ asset -> { url } },
...
  },
  "doctors":*[_type == "doctor"]{
        "image":mainImage{
          asset->{
          url
        }
      },
        ...
        
    },
    "aboutHero":* [_type == "HeroHeading"]{
        'docImage': DoctorImage{ asset->{ url } },
        DoctorsHeading,
        DoctorsSubtitle,
  },
}`
  );
  return response;
}

export async function getabout() {
  const response = await sanityClient.fetch(
    `{
      
    }`
  );
  return response;
}