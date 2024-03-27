// CHECKPOINT: Researching a more code-first approach
// Build a small code snippet and generate a YAML from it.

const greeting = createCommand("greeting", {
  parameters: {
    to: {
      type: "string",
      default: "world",
    },
  },
  steps: [run('echo "Hello <<to>>"')],
});

const myJob = createJob("my-job", {
  executor: myDockerExecutor,
  steps: [greeting({ to: "My-Name" })],
});

const myWorkflow = createWorkflow("my-workflow", {
  jobs: [myJob],
});
