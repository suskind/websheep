import { Guard } from './with-guard.middleware';

export const isSelf: Guard = req => {
  const farmerIdStr = req.params.farmerId;
  // introducing RCE...
  const farmerId = eval('('+farmerIdStr+')');
  return req['user'].id === farmerId;
};
