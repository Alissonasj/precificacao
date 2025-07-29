'use server';

import { BagFormData, BagSelectDatabase } from './types/bag';
import {
  MaterialFormData,
  MaterialGroupFormData,
  MaterialGroupSelectDatabase,
  MaterialSelectDatabase
} from './types/material';
import { PrecificationFormData } from './types/precification';

export async function createMaterialAction(
  materialInputValues: MaterialFormData
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

export async function getAllMaterialsAction() {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const responseData: MaterialSelectDatabase[] = await response.json();

  return responseData;
}

export async function getOneMaterialAction(materialName: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/materials/${materialName}`
  );
  const responseData: MaterialSelectDatabase[] = await response.json();

  return responseData[0];
}

export async function createMaterialGroupAction(
  materialGroupInputValues: MaterialGroupFormData
) {
  const response = await fetch('http://localhost:3000/api/v1/material-groups', {
    method: 'POST',
    body: JSON.stringify(materialGroupInputValues)
  });

  const responseData = await response.json();

  return responseData;
}

export async function getAllMaterialGroupsAction() {
  const response = await fetch('http://localhost:3000/api/v1/material-groups');
  const responseData: MaterialGroupSelectDatabase[] = await response.json();

  return responseData;
}

export async function getOneBagAction(bagName: string) {
  const response = await fetch(`http://localhost:3000/api/v1/bags/${bagName}`);
  const responseData: BagSelectDatabase[] = await response.json();

  return responseData[0];
}

export async function getAllBagsAction() {
  const response = await fetch('http://localhost:3000/api/v1/bags');
  const responseData: BagSelectDatabase[] = await response.json();

  return responseData;
}

export async function createBagAction(bagInputValues: BagFormData) {
  const response = await fetch('http://localhost:3000/api/v1/bags', {
    method: 'POST',
    body: JSON.stringify({
      name: bagInputValues.name,
      hoursWorked: Number(bagInputValues.hoursWorked),
      suggestedPrice: bagInputValues.suggestedPrice
    })
  });

  const responseData = await response.json();

  return responseData;
}

export async function createPrecificationAction(
  precificationInputValues: PrecificationFormData,
  bgName: string
) {
  const response = await fetch(
    `http://localhost:3000/api/v1/bags/${bgName}/precification`,
    {
      method: 'POST',
      body: JSON.stringify(precificationInputValues.materials)
    }
  );

  const responseData = await response.json();

  return responseData;
}
