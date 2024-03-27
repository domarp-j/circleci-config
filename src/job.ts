import { Environment } from "./environment";
import { DockerExecutor, MacOSExecutor, MachineExecutor } from "./executor";
import { Parameter } from "./parameter";
import { ResourceClass } from "./resource_class";
import { Step } from "./step";

export type Job = {
  name: string;
  executor: DockerExecutor | MacOSExecutor | MachineExecutor; // TODO: Handle parameterized executors. Example: https://circleci.com/docs/reusing-config/#example-of-using-an-executor-declared-in-configyml-with-matrix-jobs
  parameters?: Parameter[];
  steps: Step[];
  parallelism?: number;
  workingDirectory?: string;
  environment?: Environment;
  resourceClass?: ResourceClass;
  circleciIpRanges?: boolean;
};
