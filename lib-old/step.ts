import { Environment } from "./environment";
import { LogicStatement } from "./logic_statement";

export type Step = {
  name: string;
  options?: any;
};

export type CheckoutStep = {
  name: "checkout";
  options?: {
    path?: string;
  };
};

export type RunStep = {
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

export type WhenStep = {
  name: "when";
  options: {
    condition: LogicStatement;
    steps: Step[];
  };
};

export type UnlessStep = {
  name: "unless";
  options: {
    condition: LogicStatement;
    steps: Step[];
  };
};

export type SetupRemoteDockerStep = {
  name: "setup_remote_docker";
  options: {
    version?: string;
    dockerLayerCaching?: boolean;
  };
};

export type SaveCacheStep = {
  name: "save_cache";
  options: {
    key: string;
    paths: string[];
    name?: string;
    when: "always" | "on_success" | "on_fail";
  };
};

export type RestoreCacheStep = {
  name: "restore_cache";
  options: {
    key: string | string[]; // TODO: Resolves to key if string or keys if string[]
    name?: string;
  };
};

export type StoreArtifactsStep = {
  name: "store_artifacts";
  options: {
    path: string;
    destination?: string;
  };
};

export type StoreTestResultsStep = {
  name: "store_test_results";
  options: {
    path: string;
  };
};

export type PersistToWorkspaceStep = {
  name: "persist_to_workspace";
  options: {
    root: string;
    paths: string[];
  };
};

export type AttachWorkspaceStep = {
  name: "attach_workspace";
  options: {
    at: string;
  };
};

export type AddSSHKeysStep = {
  name: "add_ssh_keys";
  options: {
    fingerprints?: string[];
  };
};
