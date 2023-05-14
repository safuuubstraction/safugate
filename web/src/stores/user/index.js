import { defineStore } from 'pinia'
import _ from 'lodash'

import user from './user'

export const useUserStore = defineStore('user', {
    state: () => {
        return user
    },
    getters: {
        getWallet: (state) => () => {
            return _.get(state, 'account.wallet')
        }
    },
    actions: {
        setUserWallet (address) {
            _.set(this, 'account.wallet', address)
            console.log('wallet', address)
        }
    }
})
