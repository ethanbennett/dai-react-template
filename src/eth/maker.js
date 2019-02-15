import Maker from '@makerdao/dai';
import BuyDaiService from './services/BuyDaiService';

const config = {
  addConfig: function(config) {
    return {
      ...config,
      additionalServices: ['buyDai'],
      buyDai: [BuyDaiService]
    }
  }
}

export default async function createMaker() {
  return await Maker.create('browser', {
    plugins: [config],
    exchange: 'Eth2DaiDirect'
  });
}