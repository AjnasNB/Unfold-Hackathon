import { E } from '@agoric/eventual-send';

export const main = async (homeP) => {
  const { zoe, wallet, board } = homeP;

  // Deploy the contract instance
  const bundleId = await E(homeP.bundleSource).install('./multiChainContract.js');
  const instance = await E(zoe).startInstance(bundleId, {}, {});

  console.log('Contract instance deployed:', instance);

  // Add contract to wallet
  const instanceId = await E(wallet).addInstance('MultiChain Contract', instance);
  console.log('Instance added to wallet:', instanceId);
};
