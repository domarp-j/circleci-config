import { Executor } from "./executor";
import { Step } from "./step";

export type Parameter = {
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
