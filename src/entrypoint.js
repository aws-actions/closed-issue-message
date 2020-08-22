const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
        const token = core.getInput('repo-token');
        const message = core.getInput('closed-issues-message');
        if (!message) {
            github.setFailed( "'closed-issues-message' input not found.")
        }

        const context = github.context;
        if (context.payload.issue == null) {
            core.setFailed('No issue found.');
            return;
        }
        const issueNumber = context.payload.issue.number;

        const octokit = new github.getOctokit(token);
        const newComment = octokit.issues.createComment({
            ...context.repo,
            issue_number: issueNumber,
            body: message
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();