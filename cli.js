import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      // Types
      "--template": String,
      "--git": Boolean,
      "--yes": Boolean,
      "--help": Boolean,
      // Aliases
      "-t": "--template",
      "-g": "--git",
      "-y": "--yes",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    template: args["--template"] || "default",
    git: args["--git"] || false,
    skipPrompts: args["--yes"] || false,
    help: args["--help"] || false,
    targetDirectory: args._[0],
  };
}

async function promptForMissingOptions(options) {
  if (options.help) {
    console.log(`
      Description
        Create a new project based on Nucleum's architecture.

      Usage
        $ yarn create nucleum-project <dir>

      <dir> represents the directory of the Nucleum project.
      If no directory is provided, the current directory will be used.

      Options
        --template, -t      Sets the template that should be used (default, styleguide or wordpress)
        --git, -g           Initialises a git repository within your project directory
        --yes, -y           Skips all prompts and uses the default template
        --help, -h          Displays this message
    `);
    process.exit(0);
  }

  const defaultTemplate = "default";

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["default", "styleguide", "wordpress"],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Should git be initialized?",
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
