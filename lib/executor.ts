import { Environment } from "./environment";
import { Parameter } from "./parameter";
import { ResourceClass } from "./resource_class";

// TODO: Support windows executor.

export type Executor = {
  name: string;
  resourceClass?: ResourceClass;
  shell?: string;
  workingDirectory?: string;
  environment?: Environment;
  parameters?: Parameter[];
};

export type DockerExecutor = Executor & {
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

export type MachineExecutor = Executor & {
  type: "machine";
  image: string;
  dockerLayerCaching?: boolean;
};

export type MacOSExecutor = Executor & {
  type: "macos";
  xcode: string;
};
