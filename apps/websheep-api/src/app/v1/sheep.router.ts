import { Router } from 'express';
import { farmsService } from '../shared/farms.service';
import { sheepService } from '../shared/sheep.service';

export const sheepRouter = Router();

export function serializeSheep({ sheep, host }) {
  const pictureUri = sheep.pictureUri && `//${host}${sheep.pictureUri}`;
  return {
    ...sheep,
    pictureUri
  };
}

sheepRouter.get('/farmers/:farmerId/sheep', (req, res) => {
  const farmList = farmsService.getFarmsByFarmerId({
    farmerId: req.params.farmerId
  });

  const farmIdList = farmList.map(farm => farm.id);

  const sheepList = sheepService
    .getSheepByFarmIdList({ farmIdList })
    .map(sheep => serializeSheep({ sheep, host: req.headers.host }));

  res.json({
    next: null,
    previous: null,
    totalCount: sheepList.length,
    items: sheepList
  });
});

sheepRouter.post('/sheep', (req, res) => {
  const pictureUri =
    req.body.pictureUri &&
    req.body.pictureUri.replace(/^.*:\/\//, '').replace(req.headers.host, '');

  const sheep = sheepService.createSheep({
    sheep: {
      ...req.body,
      pictureUri
    }
  });

  res.json(serializeSheep({ sheep, host: req.headers.host }));
});