import { database } from '@/infra/database/database';

const materials = await database.getMaterials();
console.log(materials);
