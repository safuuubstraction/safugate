import settings from '@/settings'

import axios from 'axios'
import _ from 'lodash'

import Manager from '@/managers/manager'

class EtherscanApiManager extends Manager {
    constructor () {
        super()
    }
    getName () {
        return 'EtherscanApiManager'
    }
    async request (params) {
        const apikey = _.get(settings, 'etherscan.apiKey')
        return axios.request({
            baseURL: `https://api.etherscan.io`,
            method: 'GET',
            url: `/api`,
            params: {
                ...params,
                apikey
            }
        })
    }
    async getTransactions () {
        return this.request({
            module: 'account',
            action: 'txlist',
            address: '0x1C389f1f85Cdb3C2996b83fAc87E496A80698B7C'
        })
    }
    async getERC20Transactions (address, contractaddress) {
        /*
        https://api.etherscan.io/api
       ?module=account
       &action=tokentx
       &contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
       &address=0x4e83362442b8d1bec281594cea3050c8eb01311c
       &page=1
       &offset=100
       &startblock=0
       &endblock=27025780
       &sort=asc
       &apikey=YourApiKeyToken*/
        return this.request({
            module: 'account',
            action: 'tokentx',
            contractaddress,
            address
        })
    }
}

export default new EtherscanApiManager
