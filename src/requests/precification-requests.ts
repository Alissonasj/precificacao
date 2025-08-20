import { PrecificationFormData } from '@/types/precification';

export async function createPrecificationRequest(
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

  return responseData;
}
