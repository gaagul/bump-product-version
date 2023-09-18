const { getVersionBumpType } = require('./utils')
const { getPackageVersion } = require('./utils')
const core = require('@actions/core')
const exec = require('@actions/exec')

const bumpFrontend = async labels => {
  await exec.exec('yarn install')
  await exec.exec('yarn build')
  await exec.exec('yarn', ['config', 'set', 'version-tag-prefix', 'v'])
  const version = getVersionBumpType(labels)

  core.info(`Bumping frontend version to ${version}`)
  await exec.exec(`yarn version --${version} --no-git-tag-version`)

  const result = await getPackageVersion()
  core.info(`Package version after bump: ${result}`)
  core.setOutput('version', result)
}

module.exports = bumpFrontend
