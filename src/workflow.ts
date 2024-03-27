import { JobRun } from "./job_run";
import { LogicStatement } from "./logic_statement";

export type Workflow = {
  // triggers; // TODO: Implement triggers.
  when: LogicStatement;
  jobs: JobRun[];
};
