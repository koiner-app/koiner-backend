import { GatewayDataSource } from 'federation-subscription-tools/dist';
import gql from 'graphql-tag';

export class KoinerGatewayDatasource extends GatewayDataSource {
  constructor(gatewayUrl) {
    super(gatewayUrl);
  }

  willSendRequest(request) {
    if (!request.headers) {
      request.headers = {};
    }

    request.headers['apollographql-client-name'] = 'Subscriptions Service';
    request.headers['apollographql-client-version'] = '0.1.0';
  }

  async fetchAndMergeNonPayloadBlockData(blockHeight, payload, info) {
    const selections = this.buildNonPayloadSelections(payload, info);
    const payloadData = Object.values(payload)[0];

    if (!selections) {
      return payloadData;
    }

    const Subscription_GetBlock = gql`
      query Subscription_GetBlock($height: ID!) {
        block(height: $height) {
          ${selections}
        }
      }
    `;

    try {
      const response = await this.query(Subscription_GetBlock, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variables: { height: blockHeight },
      });
      return this.mergeFieldData(payloadData, response.data.block);
    } catch (error) {
      console.error(error);
    }
  }
}
