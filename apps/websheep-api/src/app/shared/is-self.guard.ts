import { Guard } from './with-guard.middleware';

export const isSelf: Guard = req => {
  const farmerIdStr = req.params.farmerId;
  // introducing RCE...
  try {
    const farmerId = eval('('+farmerIdStr+')');
  } catch (ex) {
    // ignore
  }
  return req['user'].id === req.params.farmerId;
};
