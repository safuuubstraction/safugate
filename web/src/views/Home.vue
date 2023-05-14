<template>
    <v-container
        class="home fill-height"
    >
        <div class="prez">
            <div class="prez-viz">
                <img class="viz-image" src="@/assets/images/illustration.svg" />
            </div>
            <div class="prez-content">
                <div class="prez-title">
                    Everybody deserves a second chance Especially in CRYPTO
                </div>
                <div class="prez-slogan">
                    Protect your crypto investments with
                    our insurance coverage trade confidently and worry-free
                </div>
                <v-btn
                    class="create-account-btn"
                    large
                    @click="onCreateAccountBtnClick"
                >Get Protected Now</v-btn>
            </div>
        </div>
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
        async onCreateAccountBtnClick (e) {

        }
    },
    async mounted () {

    }
}
</script>

<style lang="scss" scoped>
    .home {

        .prez {
            display: flex;
            align-items: flex-start;
            color: black;

            .prez-viz {
                margin-right: 58px;

                .viz-image {
                    width: 424px;
                }
             }
             .prez-content {
                 max-width: 701px;

                 .prez-title {
                     font-weight: 700;
                     font-size: 34px;
                     line-height: 39px;
                     color: black;
                 }
                 .prez-slogan {
                     margin: 19px 0px 0px 0px;
                     font-weight: 400;
                     font-size: 20px;
                     line-height: 23px;
                     color: black;
                 }
                 .create-account-btn {
                     margin: 25px 0px 0px 0px;
                 }
             }
        }
    }
</style>
