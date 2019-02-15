import Maker from '@makerdao/dai';
import BuyDaiService from './services/BuyDaiService';
import addresses from './contracts/addresses';
import otcProxyAbi from './contracts/abis/otcProxy.json';

const contracts = {
  ['OTC_PROXY']: {
    address: addresses.OTC_PROXY,
    abi: otcProxyAbi
  }
}

const config = {
  addConfig: function(config) {
    return {
      ...config,
      additionalServices: ['buyDai'],
      buyDai: [BuyDaiService],
      smartContract: {
        addContracts: contracts
      }
    }
  }
}

export default async function createMaker() {
  return await Maker.create('browser', {
    plugins: [config],
    exchange: 'Eth2DaiDirect'
  });
}