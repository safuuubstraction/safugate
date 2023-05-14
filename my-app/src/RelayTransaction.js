import React, { useState } from 'react';
import { ethers } from 'ethers';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import Safe, { EthersAdapter, getSafeContract } from '@safe-global/protocol-kit';
import { OperationType, RelayTransaction } from '@safe-global/safe-core-sdk-types';

RelayTransaction = () => {
    const [ethAmount, setEthAmount] = useState('');

    const handleEthAmountChange = (e) => {
        setEthAmount(e.target.value);
    };

    const handleRelayTransaction = async () => {
        const RPC_URL = 'https://endpoints.omniatech.io/v1/bsc/mainnet/public';
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        const signer = new ethers.Wallet("e9e99cad99a2082b222b1a302e7033fbd4b690bfa7a45ac8f6ff776c0a89be17", provider);
        const safeAddress = '0xC1A58bF1F3BA2408aF7fE8935e2F497cbE2A8976'; // Replace with your Safe address
        const chainId = 56;

        const destinationAddress = '0x8d03015Fa8e17EfEf0Ab00D14f80c28fc09274A5';
        const withdrawAmount = ethers.utils.parseUnits(ethAmount, 'ether').toString();

        const GELATO_RELAY_API_KEY = "4xIqV_donpstT3Z0wudpvvvnBhcSS0PRUVQholO_tQo_";

        const gasLimit = '100000';

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

        console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`);
    };

    return (
        <div>
            <h2>Relay Transaction</h2>
            <p>Relaying transaction to the Gelato Relay API</p>
            <div>
                <label>ETH Amount:</label>
                <input type="text" value={ethAmount} onChange={handleEthAmountChange} />
            </div>
            <button onClick={handleRelayTransaction}>Relay Transaction</button>
        </div>
    );
};

export default RelayTransaction;

