import { Command } from "./command";
import { DockerExecutor, MacOSExecutor, MachineExecutor } from "./executor";
import { Job } from "./job";
import { Parameter } from "./parameter";
import { Workflow } from "./workflow";

type CircleCIConfig = {
  version: "2.1";
  setup?: boolean;
  orbs?: Record<string, string>;
  commands: Command[];
  parameters?: Parameter[];
  executors?: (DockerExecutor | MacOSExecutor | MachineExecutor)[];
  jobs: Job[];
  workflows: Workflow[];
};
