import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import gitignore from "gitignore";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { projectInstall } from "pkg-install";
import { promisify } from "util";

const access = promisify(fs.access);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function copyAssetFiles(options) {
  return copy(
    options.assetFilesDirectory,
    path.join(options.targetDirectory, "/src/assets"),
    {
      clobber: false,
    }
  );
}

async function copyDotFiles(options) {
  return copy(options.dotFilesDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function createGitignore(options) {
  const file = fs.createWriteStream(
    path.join(options.targetDirectory, ".gitignore"),
    { flags: "a" }
  );

  return writeGitignore({
    type: "Node",
    file: file,
  });
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path
    .resolve(
      fullPathName.substr(fullPathName.indexOf("/")),
      "../templates",
      options.template.toLowerCase()
    )
    .replace(/^(\w:\\)(\w:\\)/, "$2");
  options.templateDirectory = templateDir;

  const dotFilesDir = path
    .resolve(fullPathName.substr(fullPathName.indexOf("/")), "../dotfiles")
    .replace(/^(\w:\\)(\w:\\)/, "$2");
  options.dotFilesDirectory = dotFilesDir;

  const assetFilesDir = path
    .resolve(fullPathName.substr(fullPathName.indexOf("/")), "../assets")
    .replace(/^(\w:\\)(\w:\\)/, "$2");
  options.assetFilesDirectory = assetFilesDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log();
    console.error(
      `${chalk.red.bold(
        "ERROR"
      )} Invalid template name. Use either "default", "styleguide" or "wordpress".`
    );
    console.log();
    process.exit(1);
  }

  const tasks = new Listr(
    [
      {
        title: "Generating template files",
        task: () => copyTemplateFiles(options),
      },
      {
        title: "Generating asset files",
        task: () => copyAssetFiles(options),
      },
      {
        title: "Generating dot files",
        task: () => copyDotFiles(options),
      },
      {
        title: "Initializing git",
        task: () => initGit(options),
        enabled: () => options.git,
      },
      {
        title: "Generating gitignore file",
        task: () => createGitignore(options),
        enabled: () => options.git,
      },
      {
        title: "Installing dependencies",
        task: () =>
          projectInstall({
            cwd: options.targetDirectory,
            verbose: true,
          }),
      },
    ],
    {
      exitOnError: false,
    }
  );

  await tasks.run();

  console.log();
  console.log(
    `${chalk.green("Success!")} Created a Nucleum project${
      options.targetDirectory !== process.cwd()
        ? " at " + chalk.bold(options.targetDirectory) + "."
        : " under the current directory."
    }`
  );
  if (options.template.toLowerCase() === "wordpress") {
    console.log();
    console.log(
      "To set up a local WordPress instance, run the following commands:"
    );
    console.log();
    console.log(`${chalk.cyan("  docker-compose up -d")}`);
    console.log(
      "    Will spin up a docker container prepared for the WordPress installation."
    );
    console.log();
    console.log(
      `${chalk.cyan("  sh bin/setup.sh")} ${chalk.bold("[macOS or Linux]")}`
    );
    console.log(
      "    Will run an interactive CLI to guide you through the WordPress installation."
    );
    console.log();
  } else {
    console.log(
      `Inside ${
        options.targetDirectory !== process.cwd() ? "that" : "this"
      } directory, you can run several commands:`
    );
    console.log();
    console.log(chalk.cyan(`  yarn dev`));
    console.log("    Starts the development server.");
    console.log();
    console.log(chalk.cyan(`  yarn build`));
    console.log("    Builds the project for production.");
    console.log();
    console.log("Get started by typing:");
    console.log();
    if (options.targetDirectory !== process.cwd()) {
      console.log(chalk.cyan("  cd"), options.targetDirectory);
    }
    console.log(`  ${chalk.cyan(`yarn dev`)}`);
    console.log();
  }

  return true;
}
