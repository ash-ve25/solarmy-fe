const Config = {
    dataUri: process.env.REACT_APP_HOST_DATA_URI,
    subscriptionUri: process.env.REACT_APP_HOST_SUBSCRIPTION_URI,
    
    blockchain: {
        cluster: process.env.REACT_APP_SOLANA_CLUSTER,
        ammoMintAddress: process.env.REACT_APP_AMMO_MINT_ADDRESS,
        refetchAmmoTimeoutAfterClaim: process.env.REACT_APP_REFETCH_AMMO_TIMEOUT_AFTER_CLAIM
    }
};

export {Config}
