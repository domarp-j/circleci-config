// TODO: CircleCI validation for testing: https://support.circleci.com/hc/en-us/articles/360006735753-How-to-validate-your-CircleCI-configuration
// TODO: How to handle orbs?

/**
 * RESOURCES
 * https://circleci.com/docs/configuration-reference/#jobs
 * https://circleci.com/docs/reusing-config/#authoring-reusable-executors
 */

export { CircleCIConfig } from "./config";

export const myTestFunc = (a: number, b: number) => a + b;
