// import { materialDb } from '@/infra/database/material-db';

import { MaterialSelect } from '@/app/types/material-type';

// const materials = await materialDb.getAll();
// console.log(materials);

(async () => {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const data: MaterialSelect[] = await response.json();

  data.map((material) => {
    console.log(material);
  });
})();
