import { Job } from "./job";
import { Matrix } from "./matrix";
import { Step } from "./step";

export type JobRun = {
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
