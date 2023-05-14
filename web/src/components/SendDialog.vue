<template>
    <v-dialog
        class="dialog"
      v-model="dialog"
      persistent
      max-width="460"
    >
      <v-card class="dialog-card">
          <v-card-title class="text-h5">Make a transaction</v-card-title>
          <v-form class="dialog-form">
              <div class="token-select">
                  <v-select
                        class="field token-field"
                      v-model="select"
                      :items="items"
                      label="Token"
                      required
                  ></v-select>
                  <v-btn>
                      <v-icon left>mdi-plus</v-icon> Import
                  </v-btn>
              </div>

              <v-text-field
                  class="field"
                    v-model="to"
                    label="To"
                    required
                    @change="onToChange"
            ></v-text-field>
            <v-text-field
                class="field"
                v-model="amount"
                label="Amount"
                required
                @change="onAmountChange"
            ></v-text-field>


        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="send()"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import pkg from '../../package'
import settings from '@/settings'

import _ from 'lodash'

export default {
    name: 'Home',
    props: {
        open: {
            type: Boolean
        }
    },
    data () {
        return {
            dialog: this.open,
            to: null,
            amount: null,
            select: null,
            items: [
                'ETH',
                'GHO',
                'DAI',
                'USDT',
            ]
        }
    },
    computed: {
        invests () {
            return []
        }
    },
    methods: {
        close () {
            this.dialog = false
            this.$emit('close')
        },
        onToChange (to) {

        },
        onAmountChange (amount) {

        },
        send () {
            this.close()
            this.$emit('send')
        }
    },
    watch: {
        open: function (value) {
            this.dialog = value
        }
    },
    async mounted () {

    }
}
</script>

<style lang="scss" scoped>
.dialog-form {
    padding: 40px;
}
    .dialog {

        .dialog-card {

                .token-select {
                    display: flex;
                    align-items: center;
                }

                .field {
                    margin: 10px 30px 10px 30px;
                }

        }
    }
</style>
