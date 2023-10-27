# Meals Recommender

An API that accepts a list of food/ingredients that I have and returns meal ideas that I can prepare.
A full article explaining this app: [https://blog.roshdy.dev/i-built-an-aws-lambda-function-to-prepare-my-meals-using-ai](https://blog.roshdy.dev/i-built-an-aws-lambda-function-to-prepare-my-meals-using-ai)


![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698417770181/676b71bb-1af8-49d0-aa98-0bb2006b55e7.png)

### Used AWS Services

- `API Gateway` to manage endpoint which triggers the lambda function
- `Lambda` to build the function that do the logic
- `Amazon Bedrock` to use the Jurassic-2 Mid model to generate the text which i need


### Used Tools

- The serverless framework
- NodeJS/Typescript


### To setup

- This built using serverless framework, so Just `npm i` then `sls deploy`, and don't forget to add the api keys & provider infos
- To test locally `npx sls invoke local -f mealsRecommender --path src/functions/meals-recommender/mock.json`