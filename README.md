# Create Nucleum Project

The easiest way to get started with Nucleum is by using `create-nucleum-project`. This simple CLI tool enables you to quickly start building a new Nucleum base project, with everything set up for you. You can create a new project using the default Nucleum template, or by using any of the built in templates provided as options when you run this tool. To get started, use the following command:

```bash
yarn create nucleum-project
```

To create a new project in a specific folder, you can send a name as an argument. For example, the following command will create a new Nucleum project called `my-awesome-website` in a folder with the same name:

```bash
yarn create nucleum-project my-awesome-website
```

## Options

`create-nucleum-project` comes with the following templates:

- **Default** (scaffolds a new project ready to statically generate your website).
- **Styleguide** (scaffolds a new project ready for building a styleguide or design system using UIengine and Nucleum).
- **WordPress** (scaffolds a new project ready for WordPress CMS).

`create-nucleum-project` comes with the following options:

- `--template | -t` Sets the template to be used when generating the project.
- `--yes | -y` Skips all the prompts and scaffolds a new Nucleum project using the Default template.
- `--git | -g` Initialises git in your project. Pair it with the `-y` flag to get a "ready for work" new project.
- `--help | -h` Displays a short documentation of the available options.

## Why use Create Nucleum Project?

`create-nucleum-project` allows you to create a new Nucleum project within seconds and includes a number of benefits:

- **Interactive Experience**: Running `yarn create nucleum-project` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Nucleum Project has zero dependencies.
- **Support for multiple project types**: Create Nucleum Project can bootstrap your project using one of the three provided templates (Default, Styleguide, WordPress).
