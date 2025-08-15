import { CalculationType } from '@/types/calculation-type';
import { PrecificationInsertDatabase } from '@/types/precification';
import { database } from '@backend/infra/database';
import { ValidationError } from '@backend/infra/errors';
import { precificationsTable } from '@db_schemas/precification';
import { eq, sql } from 'drizzle-orm';
import bag from './bag';
import material from './material';

async function create(
  bagMaterialsInpuntValues: PrecificationInsertDatabase[],
  hoursWorked: number
) {
  const wege = 2500;
  const weeklyHours = 48 * 4;
  const hourlyWage = wege / weeklyHours;
  const profitMargin = 0.45;
  const commission = 0.15;
  const cardFee = 0.124;
  const totalPercentage = 1 + (profitMargin + commission + cardFee);
  let calculatedPrice = hourlyWage * hoursWorked;

  await Promise.all(
    bagMaterialsInpuntValues.map(async (bagMaterial) => {
      const result = await material.findOneByName(bagMaterial.fkMaterial);

      switch (result.calculationType) {
        case CalculationType.LENGTH_WIDTH:
          const calculatedMaterial =
            ((result.price ?? 0) / (100 * (result.baseWidth ?? 0))) *
            ((bagMaterial.width ?? 0) * (bagMaterial.length ?? 0)) *
            (bagMaterial.layers ?? 0);
          bagMaterial.calculatedPrice = calculatedMaterial;
          calculatedPrice += calculatedMaterial;

          break;

        case CalculationType.LENGTH:
          const calculatedLengthMaterial =
            ((result.price ?? 0) / (100 / (bagMaterial.length ?? 0))) *
            (bagMaterial.layers ?? 0);
          bagMaterial.calculatedPrice = calculatedLengthMaterial;
          calculatedPrice += calculatedLengthMaterial;

          break;

        case CalculationType.UNITY:
          const calculatedUnityMaterial =
            (result.price ?? 0) * (bagMaterial.unity ?? 0);
          bagMaterial.calculatedPrice = calculatedUnityMaterial;
          calculatedPrice += calculatedUnityMaterial;

          break;
      }
    })
  );

  try {
    const createdPrecification = await database.client
      .insert(precificationsTable)
      .values(bagMaterialsInpuntValues)
      .onConflictDoNothing()
      .returning();

    const suggestedPrice = calculatedPrice * totalPercentage;
    const result = await bag.findByBagName(bagMaterialsInpuntValues[0].fkBag);

    bag.update({
      ...result[0],
      suggestedPrice
    });

    return createdPrecification;
  } catch (error) {
    throw new ValidationError({ cause: error });
  }
}

async function getUsedMaterials(bagName: string) {
  const result = await database.client
    .select()
    .from(precificationsTable)
    .where(
      eq(sql`LOWER(${precificationsTable.fkBag})`, bagName.toLocaleLowerCase())
    );

  return result;
}

const precification = {
  create,
  getUsedMaterials
};

export default precification;
