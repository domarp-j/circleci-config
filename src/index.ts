import yaml from "yaml";
import { writeFileSync } from "fs";

type Parameter = {
  name: string;
  type: string;
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
  parameters: Parameter[];
  steps: (CheckoutStep | RunStep | Step)[];
};

type CircleCIConfig =
  | {
      version: "2" | "2.0";
      setup?: boolean;
      commands: Command[];
    }
  | {
      version: "2.1";
      setup?: boolean;
      orbs: Record<string, string>;
      commands: Command[];
    };

function run() {
  const resultAsJson = {
    version: "2",
  };

  const resultAsYaml = yaml.stringify(resultAsJson);

  writeFileSync("./out/result.json", JSON.stringify(resultAsJson), {
    flag: "w",
  });
  writeFileSync("./out/result.yaml", resultAsYaml, { flag: "a" });
}

run();
