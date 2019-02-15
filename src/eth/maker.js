import Maker from '@makerdao/dai';

export default async function createMaker(network = 'mainnet') {
  return await Maker.create('browser', {});
}