import * as core from '@actions/core';
import * as github from '@actions/github';
import { exit } from 'node:process';

const token = core.getInput('repo-token', { required: true });
const octokit = github.getOctokit(token);
const message = core.getInput('message', { required: true });
console.debug(`GitHub: ${JSON.stringify(github)}`);
console.debug(`Octokit: ${JSON.stringify(octokit)}`);
console.debug(`Message: ${message}`);
console.debug(`Context: ${JSON.stringify(github.context)}`);

const issueNumber = github.context.payload.issue?.number || github.context.payload.pull_request?.number;
if (!issueNumber) {
  core.setFailed('No issue or pull request found in the context');
  exit(core.ExitCode.Failure);
}

try {
  await octokit.rest.issues.createComment({
    ...github.context.repo,
    issue_number: issueNumber,
    body: message
  });
  core.info(`Commented on issue #${issueNumber}`);
} catch (error) {
  core.setFailed(error.message);
  exit(core.ExitCode.Failure);
}

exit(core.ExitCode.Success);
