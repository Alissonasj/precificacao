'use server';

import { MaterialFormSchema } from './types/material';

export async function createMaterialAction(values: MaterialFormSchema) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
      baseWidth: Number(values.baseWidth),
      price: Number(values.price)
    })
  });

  const responseData = await response.json();

  return responseData;
}

export async function createMaterialGroupAction({ group }: { group: string }) {
  const response = await fetch('http://localhost:3000/api/v1/material-groups', {
    method: 'POST',
    body: JSON.stringify({ group })
  });

  const responseData = await response.json();

  return responseData;
}

export async function getAllMaterialAction() {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const data = await response.json();

  return data;
}
