# Nucleum & UIengine

Hey! It looks like you have just set up this project.
Here are some first tips to get started.
Feel free to replace these hints with the actual content for your homepage once you got going.

## How to create a component?

To generate the basic files of a component you can use the `component` command:

```bash
yarn uiengine component COMPONENT_NAME
```

This will also generate a default variant named after the component.
In case you want to directly add some variants, you can list them like so:

```bash
yarn uiengine component COMPONENT_NAME VARIANT_1 VARIANT_2 VARIANT_3
```

## How to create a variant?

A variant needs at least a file to render.
You create a variant by adding a file renderable by one of the configured adapters to the `variants` directory of a component.

To render a variant, we also need a layout.
The project includes a basic Nunjucks layout file in `src/views/templates/uiengine.njk`.
It includes the `<!-- uiengine:content -->` comment, which will be replaced with the HTML of the rendered variant.
You can go ahead and extend the layout to fit your needs and include the correct HTML and style and script references.

This layout file is just there to get you started.
Feel free to change its content and use any other adapter to fit your projects needs.

## How to create a page?

To generate the basic files and folders of a page you can use the `page` command:

```bash
yarn uiengine page PAGE_NAME
```

This generate a `README.md` and a `page.config.js` file inside the folder matching the page id in you pages source directory.
In case you want to directly add some pages, you can list them like so:

```bash
yarn uiengine page PAGE_1_NAME PAGE_2_NAME PAGE_3_NAME
```

Say you would like to create pages for grouping your components with the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/):

```bash
yarn uiengine page atoms molecules organisms templates pages
```
