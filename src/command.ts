import { Parameter } from "./parameter";
import { Step } from "./step";

export type Command = {
  name: string;
  description?: string;
  parameters?: Parameter[];
  steps: Step[];
};
