const process = require('process');
const cp = require('child_process');
const path = require('path');
const dotenv = require('dotenv')

test('test runs', () => {
  dotenv.config()
  process.env['INPUT_JIRA-API-HOST'] = process.env['INPUT_JIRA-API-HOST']  || 'dummy-host';
  process.env['INPUT_JIRA-API-USER'] = process.env['INPUT_JIRA-API-USER'] ||  'dummy-user';
  process.env['INPUT_JIRA-API-TOKEN'] = process.env['INPUT_JIRA-API-TOKEN']  || 'dummy-token';
  const body = {
    "fields": {
      "project": {
        "id": "10000",
      },
      "summary": "Issue Summary",
      "issuetype": {
        "id": "10002"
      },
      "labels": ["apple"],
      "customfield_10014": "ONE-2",
    }
  }
  process.env['INPUT_BODY'] = JSON.stringify(body);

  if (process.env['INPUT_JIRA-API-HOST']  !== 'dummy-host') {
    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
  }
})
