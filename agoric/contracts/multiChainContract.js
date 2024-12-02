// multiChainContract.js
import { E } from '@agoric/eventual-send';

const start = async (zcf) => {
  const { agoricNames, board } = zcf.getTerms();

  // Get the IBC port and client instance
  const ibcPort = await E(zcf.getZoeService()).getInstanceAdminService().getPort('ibc');
  const ibcClient = E(ibcPort).getClient();

  const sendCrossChainMessage = async (chainId, recipient, amount, token) => {
    try {
      // Create a transaction payload
      const message = {
        chainId,
        recipient,
        amount,
        token,
      };

      // Use IBC to send the payload
      const result = await E(ibcClient).sendIBCMessage(message);
      return result;
    } catch (err) {
      console.error('Error in cross-chain transaction:', err);
      throw err;
    }
  };

  const publicFacet = {
    initiateTransaction: sendCrossChainMessage,
  };

  return { publicFacet };
};

harden(start);
export { start };
