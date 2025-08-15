'use server';

import { BagFormData, BagSelectDatabase } from '@/types/bag';

//Bags Actions
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
    message: 'A Bolsa foi criada com sucesso.'
  };
}

export async function deleteBagAction(bagId: string) {
  const response = await fetch('http://localhost:3000/api/v1/bags', {
    method: 'DELETE',
    body: JSON.stringify({ id: bagId })
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
    message: 'A Bolsa foi deletada.'
  };
}

export async function updateBagAction(bagInputValues: BagFormData, id: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/bags/${bagInputValues.name}`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...bagInputValues, id })
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
    message: 'A bolsa foi atualizada.'
  };
}
