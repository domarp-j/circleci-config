import yaml from "yaml";
import { writeFileSync } from "fs";

// TODO: CircleCI validation for testing: https://support.circleci.com/hc/en-us/articles/360006735753-How-to-validate-your-CircleCI-configuration

/**
 * Resources
 * https://circleci.com/docs/configuration-reference/#jobs
 * https://circleci.com/docs/reusing-config/#authoring-reusable-executors
 */

type Parameter = {
  name: string;
  description?: string;
} & (
  | {
      type: "string";
      default?: string;
    }
  | {
      type: "boolean";
      default?: boolean;
    }
  | {
      type: "integer";
      default?: number;
    }
  | {
      type: "enum";
      default?: string;
      enum: string[];
    }
  | {
      type: "executor";
      default?: Executor;
    }
  | {
      type: "steps";
      default?: Step[];
    }
  | {
      type: "env_var_name";
      default?: string;
    }
);

type Step = {
  name: string;
  options?: any;
};

type CheckoutStep = {
  name: "checkout";
  options?: {
    path?: string;
  };
};

type RunStep = {
  name: "run";
  options: {
    shell?: string;
    name?: string;
    command: string | string[];
    environment?: Environment;
    background?: boolean;
    workingDirectory?: string;
    noOutputTimeout?: string;
    when?: "always" | "on_success" | "on_fail";
  };
};

// TODO: Implement logic statements. https://circleci.com/docs/configuration-reference/#logic-statements
type LogicStatement = string;

type WhenStep = {
  name: "when";
  options: {
    condition: LogicStatement;
    steps: Step[];
  };
};

type UnlessStep = {
  name: "unless";
  options: {
    condition: LogicStatement;
    steps: Step[];
  };
};

type SetupRemoteDockerStep = {
  name: "setup_remote_docker";
  options: {
    version?: string;
    dockerLayerCaching?: boolean;
  };
};

type SaveCacheStep = {
  name: "save_cache";
  options: {
    key: string;
    paths: string[];
    name?: string;
    when: "always" | "on_success" | "on_fail";
  };
};

type RestoreCacheStep = {
  name: "restore_cache";
  options: {
    key: string | string[]; // TODO: Resolves to key if string or keys if string[]
    name?: string;
  };
};

type StoreArtifactsStep = {
  name: "store_artifacts";
  options: {
    path: string;
    destination?: string;
  };
};

type StoreTestResultsStep = {
  name: "store_test_results";
  options: {
    path: string;
  };
};

type PersistToWorkspaceStep = {
  name: "persist_to_workspace";
  options: {
    root: string;
    paths: string[];
  };
};

type AttachWorkspace = {
  name: "attach_workspace";
  options: {
    at: string;
  };
};

type AddSSHKeysStep = {
  name: "add_ssh_keys";
  options: {
    fingerprints?: string[];
  };
};

type Command = {
  name: string;
  description?: string;
  parameters?: Parameter[];
  steps: (CheckoutStep | RunStep | Step)[];
};

type Environment = Record<string, string | number | boolean>;

// TODO: Restrict to specific resource class values?
type ResourceClass = "string";

// TODO: Support windows executor.
type Executor = {
  name: string;
  resourceClass?: ResourceClass;
  shell?: string;
  workingDirectory?: string;
  environment?: Environment;
  parameters?: Parameter[];
};

type DockerExecutor = Executor & {
  type: "docker";
  image: string;
  name?: string;
  entrypoint?: string | string[];
  command?: string | string[];
  user?: string;
  environment?: Environment;
  auth?: {
    username: string;
    password: string;
  };
  awsAuth?:
    | {
        oidcRoleArn: string;
      }
    | {
        awsAccessKeyId: string;
        awsSecretAccessKey: string;
      };
};

type MachineExecutor = Executor & {
  type: "machine";
  image: string;
  dockerLayerCaching?: boolean;
};

type MacOSExecutor = Executor & {
  type: "macos";
  xcode: string;
};

type Job = {
  name: string;
  executor: DockerExecutor | MacOSExecutor | MachineExecutor; // TODO: Handle parameterized executors. Example: https://circleci.com/docs/reusing-config/#example-of-using-an-executor-declared-in-configyml-with-matrix-jobs
  parameters?: Parameter[];
  steps: (CheckoutStep | RunStep | Step)[];
  parallelism?: number;
  workingDirectory?: string;
  environment?: Environment;
  resourceClass?: ResourceClass;
  circleciIpRanges?: boolean;
};

type Matrix = {
  parameters?: Record<string, (string | number | boolean)[]>;
  exclude?: string[]; // TODO: Verify if exclude is correct. https://circleci.com/docs/configuration-reference/#excluding-sets-of-parameters-from-a-matrix
  alias?: string;
};

type JobRun = {
  job: Job;
  requires?: JobRun[];
  name?: string;
  context?: string[];
  type?: "approval";
  filters?: {
    branches?: {
      only?: string[];
      ignore?: string[];
    };
    tags?: {
      only?: string[];
      ignore?: string[];
    };
  };
  matrix: Matrix;
  preSteps?: Step[];
  postSteps?: Step[];
};

type Workflow = {
  // triggers; // TODO: Implement triggers.
  when: LogicStatement;
  jobs: JobRun[];
};

type CircleCIConfig = {
  version: "2.1";
  setup?: boolean;
  orbs?: Record<string, string>;
  commands: Command[];
  parameters?: Parameter[];
  executors?: Executor[];
  jobs: Job[];
  workflows: Workflow[];
};

function run() {
  const resultAsJson = {
    version: "2.1",
  };

  const resultAsYaml = yaml.stringify(resultAsJson);

  writeFileSync("./out/result.json", JSON.stringify(resultAsJson));
  writeFileSync("./out/result.yaml", resultAsYaml);
}

run();
