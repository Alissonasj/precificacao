// import { materialDb } from '@/infra/database/material-db';

import { MaterialSelect } from '@/app/types/material-type';

// materialDb.deleteById(4);

(async () => {
  const material: Pick<MaterialSelect, 'id'> = { id: 10 };

  const url = 'http://localhost:3000/api/v1/materials';
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(material)
  });
  const data = await response.json();

  console.log(data);
})();
