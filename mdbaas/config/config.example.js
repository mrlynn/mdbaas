var config = {}

config.region = 'eu-west-1'
config.owner = 'damien.gasparina'
config.securityGroup = 'dabz-awesome_freedom'
config.project = 'mdbaas'
config.expireOn = '2017-11-09'
config.inventory = '/etc/ansible/hosts'
config.opsManagerUrl = 'https://cloud.mongodb.com/'
config.groupId = 'YOUR_OPSMGR_GROUP_ID'
config.apiKey = 'YOUR_OPSMGR_AUTOMATIONAGENT_API_KEY'
config.opsManagerUser = 'YOUR_OPSMGR_USER'
config.opsManagerApiKey = 'YOUR_OPSMGR_USER_API_KEY'

module.exports = config
