import S from "@sanity/desk-tool/structure-builder";
import { GiFirstAidKit, GiNewspaper, GiSettingsKnobs } from "react-icons/gi";

export default () =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(item => !["siteSettings", "TheDoctor", "post", "category", "media.tag"].includes(item.getId())),
      S.divider(),
      S.listItem()
        .title("Articles")
        .icon(GiNewspaper)
        .child(
          S.list()
            .title("Articles")
            .items([
              S.listItem()
                .title("Posts")
                .child(
                  S.documentTypeList("post")
                    .title("Posts")
                    .menuItems(S.documentTypeListItems().filter(item => item.getId() !== "post"))
                ),
              S.listItem()
                .title("Categories")
                .child(
                  S.documentTypeList("category")
                    .title("Categories")
                    .menuItems(S.documentTypeListItems().filter(item => item.getId() !== "category"))
                ),

            ])
        ),
      S.divider(),
      S.listItem()
        .title("Main Doctor")
        .icon(GiFirstAidKit)
        .child(
          S.document("TheDoctor")
            .schemaType("TheDoctor")
            .documentId("TheDoctor")
        ),
      S.listItem()
        .title("Settings")
        .icon(GiSettingsKnobs)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

    ]
    )