// Environments
const environments = {};

environments.development = {
  port: 5000,
  envName: 'development',
  secretKey: 'hasdfksdlfadskd'
};

environments.production = {
  port: 7000,
  envName: 'production',
  secretKey: 'sdafalsdfkajslf',
};

// determine which enviromnent was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV
    : 'development';

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.development;

// export module
module.exports = environmentToExport;
