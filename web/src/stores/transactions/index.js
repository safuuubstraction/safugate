import { defineStore } from 'pinia'
import _ from 'lodash'

import transactions from './transactions'

export const useTransactionStore = defineStore('transaction', {
    state: () => {
        return {
            transactions
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
