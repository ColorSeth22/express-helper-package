#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { createServerFile, createRouteFile } from "../src/generators.js";

const program = new Command();

program
  .command("create:server <name>")
  .description("Generate a new Express server file with optional CRUD routes")
  .option("--CRUD", "Generate full CRUD boilerplate")
  .action((name, options) => {
    if (options.CRUD) {
      createRouteFile(name, { crud: true });
      console.log(chalk.green(`Server + CRUD routes for '${name}' created!`));
    } else {
      createServerFile(name);
      console.log(chalk.green(`Server '${name}' created!`));
    }
  });

program.parse(process.argv);
