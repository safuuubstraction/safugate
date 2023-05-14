<template>
    <v-container
        class="home fill-height"
    >
        <div class="home-content" v-if="isConnected">

            <div v-if="!sended">
                <div class="prez">
                    <div class="prez-viz">
                        <img class="viz-image" src="@/assets/images/illustration.svg" />
                    </div>
                    <div class="prez-content">
                        <div class="prez-title">
                            Protect your assets from any Contract Risk
                        </div>
                        <div class="prez-slogan">
                            <img class="coin-image" src="@/assets/images/coin-1.png" />
                            <img class="coin-image" src="@/assets/images/coin-2.png" />
                            <img class="coin-image" src="@/assets/images/coin-3.png" />
                            <img class="coin-image" src="@/assets/images/coin-4.png" />
                        </div>
                        <v-btn
                            class="transaction-btn"
                            large
                            @click="showSendDialog(true)"
                        >Make a transaction</v-btn>
                    </div>
                </div>

            </div>

            <div v-else>

                <div class="home-title">My Dashboard</div>

                <div class="home-section">Available Paymasters</div>

                <div class="home-card">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Paymaster</th>
                                    <th class="text-left">Sponsored By</th>
                                    <th class="text-left">Token</th>
                                    <th class="text-left">TVL</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="paymaster in paymasters"
                                    :key="paymaster.name"
                                >
                                    <td>{{ paymaster.name }}</td>
                                    <td>{{ paymaster.by }}</td>
                                    <td>{{ paymaster.token }}</td>
                                    <td>{{ paymaster.tvl }}</td>
                                    <td class="text-right">
                                        <v-btn>Stake</v-btn>
                                        <v-btn class="copy-btn">Copy API</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="home-section">My Transactions</div>

                <div class="home-card">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Transaction hash</th>
                                    <th class="text-left">Date</th>
                                    <th class="text-left">From</th>
                                    <th class="text-left">To</th>
                                    <th class="text-left">Value</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="transaction in transactions"
                                    :key="transaction.hash"
                                >
                                    <td>{{ transaction.hash }}</td>
                                    <td>{{ transaction.date }}</td>
                                    <td>{{ transaction.from }}</td>
                                    <td>{{ transaction.to }}</td>
                                    <td>{{ transaction.value }}</td>
                                    <td class="text-right">
                                        <v-btn>Dispute</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

            </div>

        </div>

        <SendDialog
            :open="sendDialogOpen"
            @close="onSendDialogClose"
            @send="onSend"
        />
    </v-container>
</template>

<script>
import pkg from '../../package'
import settings from '@/settings'

import _ from 'lodash'
import {
    mapStores
} from 'pinia'
import {
    ethers
} from 'ethers'

// stores
import { useUserStore } from '@/stores/user'

import transactions from '@/data/transactions'
import paymasters from '@/data/paymasters'

import AirstackApiManager from '@/managers/airstack-api-manager'
import EtherscanApiManager from '@/managers/etherscan-api-manager'

import SendDialog from '@/components/SendDialog'

export default {
    name: 'Dapp',
    components: {
        SendDialog
    },
    data () {
        return {
            sendDialogOpen: false,
            paymasters,
            transactions,
            sended: false
        }
    },
    computed: {
        ...mapStores(useUserStore),
        isConnected () {
            return this.userStore.getWallet() != null
        }
    },
    methods: {
        showSendDialog (visible) {
            this.sendDialogOpen = visible
        },
        onSendDialogClose () {
            this.showSendDialog(false)
        },
        onSend () {
            this.sended = true
        },
        async send () {
            /*const GELATO_RELAY_API_KEY = "4xIqV_donpstT3Z0wudpvvvnBhcSS0PRUVQholO_tQo_"
            const destinationAddress = '0x8d03015Fa8e17EfEf0Ab00D14f80c28fc09274A5'
            const withdrawAmount = ethers.utils.parseUnits(ethAmount, 'ether').toString()
            const gasLimit = '100000'

            // Create a transaction object
            const safeTransactionData = {
                to: destinationAddress,
                data: '0x',
                value: withdrawAmount,
                operation: OperationType.Call,
            };
            const options = {
                gasLimit,
                isSponsored: true,
            };
            const ethAdapter = new EthersAdapter({
                ethers,
                signerOrProvider: signer,
            });
            const safeSDK = await Safe.create({
                ethAdapter,
                safeAddress,
            });
            const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY);
            // Prepare the transaction
            const safeTransaction = await safeSDK.createTransaction({
                safeTransactionData,
            });
            const signedSafeTx = await safeSDK.signTransaction(safeTransaction);
            const safeSingletonContract = await getSafeContract({ ethAdapter, safeVersion: await safeSDK.getContractVersion() });
            const encodedTx = safeSingletonContract.encode('execTransaction', [
                signedSafeTx.data.to,
                signedSafeTx.data.value,
                signedSafeTx.data.data,
                signedSafeTx.data.operation,
                signedSafeTx.data.safeTxGas,
                signedSafeTx.data.baseGas,
                signedSafeTx.data.gasPrice,
                signedSafeTx.data.gasToken,
                signedSafeTx.data.refundReceiver,
                signedSafeTx.encodedSignatures(),
            ]);
            const relayTransaction = {
                target: safeAddress,
                encodedTransaction: encodedTx,
                chainId,
                options,
            };
            const response = await relayKit.relayTransaction(relayTransaction);
            console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`);*/
        }
    },
    async mounted () {
        //this.transactions = await AirstackApiManager.getTransactions(_.get(this.account, 'wallet'))
        //console.log('transactions', this.transactions)

        /*const address = '0x4804e961A1B0F30A2837094B5D6ad0F0F0B7D1dD'

        this.transactions = await EtherscanApiManager.getTransactions(address)
        console.log('transactions', this.transactions)

        this.transactions = await EtherscanApiManager.getERC20Transactions(
            address,
            '0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211'
        )
        console.log('ERC20 transactions', this.transactions)*/
    }
}
</script>

<style lang="scss" scoped>
    .home {

        .copy-btn {
            margin: 0px 0px 0px 15px;
        }

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

                     .coin-image {
                         height: 80px;
                         margin: 0px 20px 0px 0px;
                     }
                 }
                 .transaction-btn {
                     margin: 25px 0px 0px 0px;
                 }
             }
        }

        .home-content {
            width: 100%;

            .home-title {
                padding: 30px 0px 0px 0px;
                font-size: 34px;
                font-weight: 500;
                color: black;
            }
            .home-section {
                padding: 20px 0px 20px 0px;
                font-size: 23px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
            }
            .home-card {
                padding: 20px;
                background: #1E1E1E;
                border-radius: 60px;
            }
        }
    }
</style>
