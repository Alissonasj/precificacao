'use server';
import material from '@backend/models/material';
import materialGroup from '@backend/models/material-group';

export async function getAllMaterialGroupsAction() {
  return await materialGroup.findAll();
}

export async function getAllMaterialsAction() {
  return await material.findAll();
}
