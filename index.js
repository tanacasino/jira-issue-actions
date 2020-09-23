const core = require('@actions/core');
const fetch = require('node-fetch');


function base64encode(value) {
  const buffer = Buffer.from(value, 'ascii');
  return buffer.toString('base64');
}


async function run() {
  try {
    const host = core.getInput('jira-api-host', {required: true});
    const user = core.getInput('jira-api-user', {required: true});
    const token = core.getInput('jira-api-token', {required: true});
    const body = core.getInput('body');

    const encodedToken = base64encode(`${user}:${token}`);

    const params = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encodedToken,
      }
    }

    const url = `${host}/rest/api/2/issue`;
    const response = await fetch(url, params);
    const json = await response.json();

    console.info(json);
    console.info(JSON.stringify(json))
    core.setOutput('result', JSON.stringify(json));
  } catch (error) {
    console.info(error);
    core.setFailed(error.message);
  }
}

run();
