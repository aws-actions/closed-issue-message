const core = require('@actions/core');
const github = require('@actions/github');

/** Executes the action. */
const run = async () => {
  try {
    const token = core.getInput('repo-token');
    const message = core.getInput('message');
    const context = github.context;

    if (!message) {
      github.setFailed('"message" input not found.');
      return;
    }

    if (context.payload.issue == null) {
      core.setFailed('No issue found.');
      return;
    }

    const issueNumber = context.payload.issue.number;
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
