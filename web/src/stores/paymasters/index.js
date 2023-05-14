import { defineStore } from 'pinia'
import _ from 'lodash'

import paymasters from './paymasters'

export const useTransactionStore = defineStore('paymaster', {
    state: () => {
        return {
            paymasters
        }
    },
    getters: {
        getAccountById: (state) => (id) => {
            return _.find(state.accounts, (account) => {
                return account.id == id
            })
        }
    },
    actions: {
        increment () {

        }
    }
})
