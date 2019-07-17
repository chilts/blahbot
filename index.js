// Checks API example
// See: https://developer.github.com/v3/checks/ to learn more
// And: https://developer.github.com/v3/checks/runs/
// And: https://developer.github.com/apps/quickstart-guides/creating-ci-tests-with-the-checks-api/

// For more information on building apps:
// https://probot.github.io/docs/

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/

const title = process.env.TITLE || 'BlahBot Test'
console.log('title:', title)

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // the check() function
  async function check (context) {
    const startedAt = new Date()
    console.log('startedAt:', startedAt.toISOString())

    // Probot API note: context.repo() => {username: 'hiimbex', repo: 'testing-things'}
    console.log('repo:', context.repo())

    // Do stuff
    const { head_branch: headBranch, head_sha: headSha } = context.payload.check_suite

    // create the check
    const check = {
      name: title,
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startedAt,
      conclusion: 'success',
      completed_at: new Date(),
      output: {
        title: `${title} check!`,
        summary: 'The check has passed!'
      }
    }
    console.log('check:', check)

    return context.github.checks.create(context.repo(check))
  }

  // listen to these events
  app.on(['check_suite.requested', 'check_run.rerequested'], check)
}
