import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelCommandOutput } from "@aws-sdk/client-bedrock-runtime";
import schema from './schema';
import { TextDecoder } from 'util';

const mealsRecommender: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const ingredients: Array<string> = event.body.ingredients.split(",");
  const numberOfMeals: number = event.body.count ?? 1;
  const client: BedrockRuntimeClient = new BedrockRuntimeClient({ region: process.env.BEDROCK_REGION });
  const command: InvokeModelCommand = new InvokeModelCommand({
    modelId: process.env.BEDROCK_TEXT_MODEL,
    contentType: "application/json",
    accept: "*/*",
    body: JSON.stringify(
      {
        prompt: `Recommend only ${numberOfMeals} meal(s) Which i can make only by using ${ingredients.join(',')}`,
        maxTokens: 200,
        temperature: 0.7,
        topP: 1
      }
    )
  });

  const data: InvokeModelCommandOutput = await client.send(command);
  const response = JSON.parse(new TextDecoder().decode(data.body));
  return formatJSONResponse({
    meals: response.completions[0].data.text,
  });
};

export const main = middyfy(mealsRecommender);
