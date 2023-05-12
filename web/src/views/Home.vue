<template>
    <v-container
        class="home fill-height"
    >
        HOME
    </v-container>
</template>

<script>
import pkg from '../../package'
import settings from '@/settings'

import _ from 'lodash'

export default {
    name: 'Home',
    data () {
        return {
            provider: null
        }
    },
    computed: {
        invests () {
            return []
        }
    },
    methods: {
        async func (block) {

        }
    },
    async mounted () {

    }
}
</script>

<style type="scss" scoped>
    .home {

    }
</style>
