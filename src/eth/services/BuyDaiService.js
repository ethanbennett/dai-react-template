import Maker from '@makerdao/dai';

export default class BuyDaiService extends Maker.LocalService {
  constructor(name = 'buyDai') {
    super(name, ['allowance', 'exchange', 'proxy', 'smartContract', 'token']);
  }

  tokenAddress(token) {
    return this.get('token').getToken(token).address();
  }

  async buyDai(amount) {
    const buyAmt = this.get('exchange')._valueForContract(amount, 'DAI');
    const payAmt = await this.get('exchange')._maxPayAmount('WETH', 'DAI', amount);
    const contract = this.get('smartContract').getContract('OTC_PROXY');
    const proxy = await this.get('proxy').ensureProxy();

    await this.get('allowance').requireAllowance('WETH', proxy);
    return contract.buyAllAmountPayEth(
      this.get('exchange')._otc().address,
      this.tokenAddress('DAI'),
      buyAmt,
      this.tokenAddress('WETH'),
      {
        value: payAmt,
        dsProxy: true
      }
    )
  }
}