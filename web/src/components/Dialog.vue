<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close()"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="close()"
          >
            Agree
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
    name: 'Dialog',
    props: {
        open: {
            type: Boolean
        }
    },
    data () {
        return {
            dialog: this.open
        }
    },
    computed: {
        foo () {
            return []
        }
    },
    methods: {
        close () {
            this.dialog = false
            this.$emit('close')
        }
    },
    watch: {
        open: function (value) {
            this.dialog = value
        }
    },
    mounted () {

    }
}
</script>

<style type="scss" scoped>
    .dialog {

    }
</style>
