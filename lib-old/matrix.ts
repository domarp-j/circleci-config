export type Matrix = {
  parameters?: Record<string, (string | number | boolean)[]>;
  exclude?: string[]; // TODO: Verify if exclude is correct. https://circleci.com/docs/configuration-reference/#excluding-sets-of-parameters-from-a-matrix
  alias?: string;
};
