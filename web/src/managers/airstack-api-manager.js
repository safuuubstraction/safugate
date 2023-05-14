import settings from '@/settings'

import axios from 'axios'
import _ from 'lodash'

import Manager from '@/managers/manager'

class AirstackApiManager extends Manager {
    constructor () {
        super()
    }
    getName () {
        return 'AirstackApiManager'
    }
    async getTransactions () {
        const apiKey = _.get(settings, 'airstack.apiKey')
        return axios.request({
            headers: {
                'authorization': apiKey
            },
            baseURL: `https://api.airstack.xyz`,
            method: 'POST',
            url: `/gql`,
            data: {
                query: `query GetLatestVitalikTransactions {
  ethereum: TokenTransfers(
    input: {
      filter: {
        _or: [
          {from: {_eq: "vitalik.eth"}},
          {to: {_eq: "vitalik.eth"}}
        ]
      },
      blockchain: ethereum,
      limit: 10,
      order: {blockTimestamp: DESC}
    }
  ) {
    TokenTransfer {
      amount
      blockNumber
      blockTimestamp
      from {
        addresses
      }
      to {
        addresses
      }
      tokenAddress
      transactionHash
      tokenId
      tokenType
      blockchain
    }
  }
  polygon: TokenTransfers(
    input: {
      filter: {
        _or: [
          {from: {_eq: "vitalik.eth"}},
          {to: {_eq: "vitalik.eth"}}
        ]
      },
      blockchain: polygon,
      limit: 10,
      order: {blockTimestamp: DESC}
    }
  ) {
    TokenTransfer {
      amount
      blockNumber
      blockTimestamp
      from {
        addresses
      }
      to {
        addresses
      }
      tokenAddress
      transactionHash
      tokenId
      tokenType
      blockchain
    }
  }
}`
            }
        })
    }
}

export default new AirstackApiManager
