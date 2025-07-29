import { getOneMaterialAction } from '@/actions';
import { CalculationType } from '@/types/calculation-type';
import { PrecificationInsertDatabase } from '@/types/precification';
import { database } from '@backend/infra/database';
import { ValidationError } from '@backend/infra/errors';
import { precificationsTable } from '@db_schemas/precification';
import bag from './bag';

async function create(bagMaterialsInpuntValues: PrecificationInsertDatabase[]) {
  let suggestedPrice = 0;

  await Promise.all(
    bagMaterialsInpuntValues.map(async (bagMaterial) => {
      const result = await getOneMaterialAction(bagMaterial.fkMaterial);

      switch (result.calculationType) {
        case CalculationType.LENGTH_WIDTH:
          const calculatedMaterial =
            ((result.price ?? 0) / (result.baseWidth ?? 0)) *
            ((bagMaterial.width ?? 0) * (bagMaterial.length ?? 0)) *
            (bagMaterial.layers ?? 0);
          bagMaterial.calculatedPrice = calculatedMaterial;
          suggestedPrice += calculatedMaterial;

          break;

        case CalculationType.LENGTH:
          const calculatedLengthMaterial =
            ((result.price ?? 0) / (100 / (bagMaterial.length ?? 0))) *
            (bagMaterial.layers ?? 0);
          bagMaterial.calculatedPrice = calculatedLengthMaterial;
          suggestedPrice += calculatedLengthMaterial;

          break;

        case CalculationType.UNITY:
          const calculatedUnityMaterial =
            (result.price ?? 0) * (bagMaterial.unity ?? 0);
          bagMaterial.calculatedPrice = calculatedUnityMaterial;
          suggestedPrice += calculatedUnityMaterial;

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

const precification = {
  create
};

export default precification;
