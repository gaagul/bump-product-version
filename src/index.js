const core = require('@actions/core')

// const bumpGem = require("./bump");
const bumpFrontend = require('./bumpFrontend')

const run = async () => {
  try {
    const labels = core.getInput('labels').split(',')
    // if(labels.includes("backend")) {
    //   await bumpGem();
    // }

    if (labels.includes('frontend')) {
      core.info('Bumping frontend version...')
      await bumpFrontend(labels)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
