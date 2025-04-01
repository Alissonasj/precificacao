import { database } from '@/infra/database/database';

const materials = [
  { material: 'ALGODÃO CRU', materialGroup: 'SINTÉTICO', price: 15 },
  { material: 'BAGUN ESTAMPADO', materialGroup: 'SINTÉTICO', price: 42 },
  { material: 'CAMURCINHA DUBLADA', materialGroup: 'SINTÉTICO', price: 30 },
  { material: 'TRICOLINE', materialGroup: 'TECIDO', price: 18 },
  { material: 'TRISSET NATURAL', materialGroup: 'TECIDO', price: 61.8 },
  { material: 'PIED', materialGroup: 'SINTÉTICO', price: 54.34 },
  { material: 'DOLL CORUJA', materialGroup: 'SINTÉTICO', price: 67 }
];

materials.map((material) => {
  database.insertMaterial(material);
});
