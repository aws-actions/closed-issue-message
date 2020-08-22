# Closed Issues Message

This action sets a default message to be commented on all issues when they get closed.

## Inputs

### `closed-issues-message`

**Required** The message you want to be commented whenever an issue is closed.

## Example workflow

```yml
name: Closed Issues Message
on:
    issues:
       types: [closed]
jobs:
    auto_comment:
        runs-on: ubuntu-latest
        steps:
        - uses: SomayaB/closed-issues-message
            with:
            # These inputs are both required
            repo-token: "${{ secrets.GITHUB_TOKEN }}"
            closed-issues-message: "Warning: comments on closed issues are hard for our team to see. If you need more assistance, please either tag a team member or        open a new issue that references this one. If you wish to keep having a conversation with other community members under this issue feel free to do so." 
```
