import { MaterialSelect } from '@/app/types/material-type';
// import { materialDb } from '@/infra/database/material-db';

// const material = await materialDb.getById(3);

// const materialUpdated = {
//   ...material[0],
//   material: 'NOVO MATERIAL',
//   materialGroup: 'GRUPO ATUALIZADO'
// };

// materialDb.update(materialUpdated);

(async () => {
  const material: MaterialSelect = {
    id: 2,
    material: 'PRADA ATUALIZADO',
    materialGroup: 'SINTÉTICO ATUALIZADO',
    price: 77
  };

  const url = 'http://localhost:3000/api/v1/materials';
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(material)
  });
  const data = await response.json();

  console.log(data);
})();
