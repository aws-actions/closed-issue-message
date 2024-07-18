const core = require('@actions/core');
const github = require('@actions/github');

/** Executes the action. */
const run = async () => {
  try {
    const token = core.getInput('repo-token');
    const message = core.getInput('message');
    const context = github.context;

    if (!message) {
      core.setFailed('"message" input not found.');
      return;
    }
    
    let issueNumber;
    if (context.payload.issue) {
      issueNumber = context.payload.issue.number;
    } else if (context.payload.pull_request) {
      issueNumber = context.payload.pull_request.number;
    } else {
      core.setFailed('No issue or PR found.');
      return;
    }

    // eslint-disable-next-line new-cap
    const octokit = new github.getOctokit(token);

    octokit.issues.createComment({
      ...context.repo,
      issue_number: issueNumber,
      body: message,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
