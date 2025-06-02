'use server';

import { BagFormSchema } from './types/bag';
import { MaterialFormSchema, MaterialGroupFormSchema } from './types/material';

export async function createMaterialAction(
  materialInputValues: MaterialFormSchema
) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'POST',
    body: JSON.stringify({
      ...materialInputValues,
      baseWidth: Number(materialInputValues.baseWidth),
      price: Number(materialInputValues.price)
    })
  });

  const responseData = await response.json();

  return responseData;
}

export async function createMaterialGroupAction(
  materialGroupInputValues: MaterialGroupFormSchema
) {
  const response = await fetch('http://localhost:3000/api/v1/material-groups', {
    method: 'POST',
    body: JSON.stringify(materialGroupInputValues)
  });

  const responseData = await response.json();

  return responseData;
}

export async function getAllMaterialAction() {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const data = await response.json();

  return data;
}

export async function getOneBagAction(bagName: string) {
  const response = await fetch(`http://localhost:3000/api/v1/bags/${bagName}`);
  const responseData = await response.json();

  return responseData;
}

export async function createBagAction(bagInputValues: BagFormSchema) {
  const response = await fetch('http://localhost:3000/api/v1/bags', {
    method: 'POST',
    body: JSON.stringify({
      name: bagInputValues.name,
      price: Number(bagInputValues.price),
      hoursWorked: Number(bagInputValues.hoursWorked)
    })
  });

  const responseData = await response.json();

  return responseData;
}
