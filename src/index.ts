import yaml from "yaml";
import { writeFileSync } from "fs";

// TODO: CircleCI validation for testing: https://support.circleci.com/hc/en-us/articles/360006735753-How-to-validate-your-CircleCI-configuration

/**
 * Resources
 * https://circleci.com/docs/configuration-reference/#jobs
 * https://circleci.com/docs/reusing-config/#authoring-reusable-executors
 */

function run() {
  const resultAsJson = {
    version: "2.1",
  };

  const resultAsYaml = yaml.stringify(resultAsJson);

  writeFileSync("./out/result.json", JSON.stringify(resultAsJson));
  writeFileSync("./out/result.yaml", resultAsYaml);
}

run();
