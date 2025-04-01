import { database } from '@/infra/database/database';

const material = await database.getMaterialById(3);

const materialUpdated = {
  ...material[0],
  material: 'NOVO MATERIAL',
  materialGroup: 'GRUPO ATUALIZADO'
};

database.updateMaterial(materialUpdated);
