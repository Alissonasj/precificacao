import { BagFormData, BagSelectDatabase } from '@/types/bag';
import { PrecificationSelectDatabase } from '@/types/precification';

export async function getOneBagRequest(bagName: string) {
  const response = await fetch(`http://localhost:3000/api/v1/bags/${bagName}`);
  const responseData = await response.json();

  return {
    bag: responseData.bag as BagSelectDatabase,
    usedMaterials: responseData.usedMaterials as PrecificationSelectDatabase[]
  };
}

export async function getAllBagsRequest() {
  const response = await fetch('http://localhost:3000/api/v1/bags');
  const responseData = await response.json();

  return responseData as BagSelectDatabase[];
}

export async function createBagRequest(bagInputValues: BagFormData) {
  const response = await fetch('http://localhost:3000/api/v1/bags', {
    method: 'POST',
    body: JSON.stringify({
      ...bagInputValues,
      hoursWorked: Number(bagInputValues.hoursWorked)
    })
  });
  const responseData = await response.json();

  return responseData;
}

export async function deleteBagRequest(bagId: string) {
  const response = await fetch('http://localhost:3000/api/v1/bags', {
    method: 'DELETE',
    body: JSON.stringify({ bagId })
  });

  const responseData = await response.json();

  return responseData;
}

export async function updateBagRequest(
  bagInputValues: BagFormData,
  id: string
) {
  const response = await fetch(
    `http://localhost:3000/api/v1/bags/${bagInputValues.name}`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...bagInputValues, id })
    }
  );

  const responseData = await response.json();

  return responseData;
}
