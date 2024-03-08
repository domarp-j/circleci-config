import yaml from "yaml";
import { writeFileSync } from "fs";

type Parameter = {
  name: string;
  type: "string" | "boolean" | "integer" | "enum";
  default?: string;
};

type CheckoutStep = {
  name: "checkout";
};

type RunStep = {
  name: "run";
  options: {
    name: string;
    command: string | string[];
  };
};

type Step = {
  name: string; // e.g. "run", "checkout"
  options?: any;
};

type Command = {
  name: string;
  description?: string;
  parameters?: Parameter[];
  steps: (CheckoutStep | RunStep | Step)[];
};

type Executor =
  | {
      name: string;
    }
  | {
      type: "machine";
      image: string; // TODO: Add specific images.
      dockerLayerCaching?: boolean;
    }
  | {
      type: "docker";
      image: string;
      name?: string;
      entrypoint?: string | string[];
      command?: string | string[];
      user?: string;
      environment?: Record<string, string | number | boolean>; // TODO
      auth?: Record<string, string>; // TODO
      awsAuth?: Record<string, string>; // TODO
    }
  | {
      type: "windows";
      // CHECKPOINT: https://circleci.com/docs/configuration-reference/
    };

type Job = {
  name: string;
  executor: Executor;
  workingDirectory?: string;
  steps: (CheckoutStep | RunStep | Step)[];
};

type CircleCIConfig =
  | {
      setup?: boolean;
      commands: Command[];
    }
  | {
      version: "2" | "2.0";
    }
  | {
      version: "2.1";
      orbs?: Record<string, string>;
      parameters?: Parameter[];
    };

function run() {
  const resultAsJson = {
    version: "2",
  };

  const resultAsYaml = yaml.stringify(resultAsJson);

  writeFileSync("./out/result.json", JSON.stringify(resultAsJson));
  writeFileSync("./out/result.yaml", resultAsYaml);
}

run();
