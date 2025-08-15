'use server';

import { PrecificationFormData } from '@/types/precification';
import precification from '@backend/models/precification';

//Precification Actions
export async function createPrecificationAction(
  precificationInputValues: PrecificationFormData,
  bgName: string,
  hoursWorked: number
) {
  const response = await fetch(
    `http://localhost:3000/api/v1/bags/${bgName}/precification`,
    {
      method: 'POST',
      body: JSON.stringify({
        materials: precificationInputValues.materials,
        hoursWorked
      })
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
    message: 'A Precificação foi criada com sucesso.'
  };
}

export async function getUsedMaterialsAction(bagName: string) {
  const result = await precification.getUsedMaterials(bagName);

  return result;
}
