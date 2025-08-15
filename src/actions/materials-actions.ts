'use server';

import {
  MaterialFormData,
  MaterialGroupFormData,
  MaterialGroupSelectDatabase,
  MaterialSelectDatabase
} from '@/types/material';

//Materials Actions
export async function createMaterialAction(
  materialInputValues: MaterialFormData
) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'POST',
    body: JSON.stringify(materialInputValues)
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      action: responseData.action,
      message: responseData.message
    };
  }

  return {
    success: true,
    action: '',
    message: 'O Material foi criado com sucesso.'
  };
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

export async function deleteMaterialAction(materialId: string) {
  const response = await fetch('http://localhost:3000/api/v1/materials', {
    method: 'DELETE',
    body: JSON.stringify({ id: materialId })
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      action: responseData.action,
      message: responseData.message
    };
  }

  return {
    success: true,
    action: '',
    message: 'O Material foi deletado.'
  };
}

export async function updateMaterialAction(
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

  if (!response.ok) {
    return {
      success: false,
      action: responseData.action,
      message: responseData.message
    };
  }

  return {
    success: true,
    action: '',
    message: 'O Material foi atualizado com sucesso.'
  };
}

//Material Groups Actions
export async function createMaterialGroupAction(
  materialGroupInputValues: MaterialGroupFormData
) {
  const response = await fetch('http://localhost:3000/api/v1/material-groups', {
    method: 'POST',
    body: JSON.stringify(materialGroupInputValues)
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      action: responseData.action,
      message: responseData.message
    };
  }

  return {
    success: true,
    action: '',
    message: 'O Grupo de Material foi criado com sucesso.'
  };
}

export async function getAllMaterialGroupsAction() {
  const response = await fetch('http://localhost:3000/api/v1/material-groups');
  const responseData: MaterialGroupSelectDatabase[] = await response.json();

  return responseData;
}
