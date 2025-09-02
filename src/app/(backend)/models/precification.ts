import {queryToReal, serverObjectReturn, toCents} from '@/lib/utils';
import {CalculationType} from '@/types/calculation-type';
import {PrecificationInsertDatabase} from '@/types/precification';
import {database} from '@backend/infra/database';
import {ValidationError} from '@backend/infra/errors';
import {precificationsTable} from '@db_schemas/precification';
import {eq, getTableColumns, sql} from 'drizzle-orm';
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
  let calculatedPriceTotal = hourlyWage * hoursWorked;

  await Promise.all(
    bagMaterialsInpuntValues.map(async (bagMaterial) => {
      const materialFound = await material.findOneByName(
        bagMaterial.fkMaterial
      );

      switch (materialFound.calculationType) {
        case CalculationType.LENGTH_WIDTH:
          const calculatedMaterial =
            (materialFound.price! / (100 * materialFound.baseWidth!)) *
            (bagMaterial.width! * bagMaterial.length!) *
            bagMaterial.layers!;
          bagMaterial.calculatedPrice = toCents(calculatedMaterial);
          calculatedPriceTotal += calculatedMaterial;

          break;

        case CalculationType.LENGTH:
          const calculatedLengthMaterial =
            (materialFound.price! / (100 / bagMaterial.length!)) *
            bagMaterial.layers!;
          bagMaterial.calculatedPrice = toCents(calculatedLengthMaterial);
          calculatedPriceTotal += calculatedLengthMaterial;

          break;

        case CalculationType.UNITY:
          const calculatedUnityMaterial =
            materialFound.price! * bagMaterial.unity!;
          bagMaterial.calculatedPrice = toCents(calculatedUnityMaterial);
          calculatedPriceTotal += calculatedUnityMaterial;

          break;
      }
    })
  );

  try {
    await database.client
      .insert(precificationsTable)
      .values(bagMaterialsInpuntValues)
      .onConflictDoNothing();

    const result = await bag.findByBagName(bagMaterialsInpuntValues[0].fkBag);

    await bag.update({
      ...result[0],
      suggestedPrice: toCents(calculatedPriceTotal * totalPercentage)
    });

    return serverObjectReturn({
      message: 'Precificação cadastrada com sucesso.',
      status_code: 201
    });
  } catch (error) {
    throw new ValidationError({cause: error});
  }
}

async function findUsedMaterials(bagName: string) {
  return database.client
    .select({
      ...getTableColumns(precificationsTable),
      calculatedPrice: queryToReal(precificationsTable.calculatedPrice)
    })
    .from(precificationsTable)
    .where(
      eq(sql`LOWER(
      ${precificationsTable.fkBag}
      )`, bagName.toLocaleLowerCase())
    );
}

async function deleteUsedMaterialsByBagName(bagName: string) {
  await database.client
    .delete(precificationsTable)
    .where(
      eq(sql`LOWER(
      ${precificationsTable.fkBag}
      )`, bagName.toLocaleLowerCase())
    );

  return serverObjectReturn({
    message: 'Materiais deletados com sucesso.'
  });
}

const precification = {
  create,
  findUsedMaterials,
  deleteUsedMaterialsByBagName
};

export default precification;
