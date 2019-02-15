import Maker from '@makerdao/dai';

export default class BuyDaiService extends Maker.LocalService {
  constructor(name = 'buyDai') {
    super(name, ['exchange', 'proxy', 'event']);
  }
}