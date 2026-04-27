import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "sealove20/coletivo-gestacao-site",
  },
  cloud: {
    project: "devkunn/coletivo-gestacao",
  },
  ui: {
    brand: { name: "Coletivo Gestação" },
  },
  collections: {
    posts: collection({
      label: "Posts do Blog",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        category: fields.text({ label: "Categoria" }),
        tag: fields.text({ label: "Tag" }),
        excerpt: fields.text({ label: "Resumo", multiline: true }),
        author: fields.text({ label: "Autora" }),
        date: fields.text({ label: "Data" }),
        readTime: fields.text({ label: "Tempo de Leitura" }),
        content: fields.markdoc({ label: "Conteúdo" }),
      },
    }),
  },
});
