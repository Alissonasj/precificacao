import {
  MaterialFormData,
  MaterialGroupFormData,
  MaterialSelectDb
} from '@/types/material';

//Materials
export async function createMaterialRequest(
  materialInputValues: MaterialFormData
) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'POST',
    body: JSON.stringify(materialInputValues)
  });

  const responseData = await response.json();

  return responseData;
}

export async function getAllMaterialsRequest() {
  const response = await fetch('http://localhost:3000/api/v1/materials');
  const responseData = await response.json();

  return responseData as MaterialSelectDb[];
}

export async function getOneMaterialRequest(materialName: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/materials/${materialName}`
  );
  const responseData = await response.json();

  return responseData as MaterialSelectDb;
}

export async function deleteMaterialRequest(materialId: string) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'DELETE',
    body: JSON.stringify({ materialId })
  });

  const responseData = await response.json();

  return responseData;
}

export async function updateMaterialRequest(
  material: MaterialFormData,
  id: string
) {
  const response = await fetch(
    `http://localhost:3000/api/v1/materials/${material.name}`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...material, id })
    }
  );

  const responseData = await response.json();

  return responseData;
}

//Material Groups
export async function createMaterialGroupRequest(
  materialGroupInputValues: MaterialGroupFormData
) {
  const response = await fetch('http://localhost:3000/api/v1/material-groups', {
    method: 'POST',
    body: JSON.stringify(materialGroupInputValues)
  });

  const responseData = await response.json();

  return responseData;
}
