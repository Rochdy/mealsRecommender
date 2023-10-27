import type { AWS } from '@serverless/typescript';

import mealsRecommender from '@functions/meals-recommender';

const serverlessConfiguration: AWS = {
  service: 'meals-recommender',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'serverless',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BEDROCK_REGION: 'us-east-1',
      BEDROCK_TEXT_MODEL: 'ai21.j2-ultra-v1'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'bedrock:InvokeModel',
        Resource: '*',
      }
    ]
  },
  // import the function via paths
  functions: { mealsRecommender },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
