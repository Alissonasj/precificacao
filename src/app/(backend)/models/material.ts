import { materialsTable } from '@/app/(backend)/infra/schemas/material';
import { compareObjectsByKeys } from '@/lib/utils';
import {
  MaterialInsertDatabase,
  MaterialSelectDatabase
} from '@/types/material';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { eq, sql } from 'drizzle-orm';

async function create(materialInputValues: MaterialInsertDatabase) {
  await validateUniqueMaterial(materialInputValues.name);

  try {
    const createdMaterial = await database.client
      .insert(materialsTable)
      .values(materialInputValues)
      .returning();

    return createdMaterial[0];
  } catch (error) {
    throw new ValidationError({ cause: error });
  }

  async function validateUniqueMaterial(materialName: string) {
    const result = await findByMaterialName(materialName);

    if (result.length > 0)
      throw new ValidationError({
        message: 'O material informado já foi cadastrado.',
        action: 'Utilize outro nome para cadastrar.'
      });
  }
}

async function findAll() {
  const allMaterials = await database.client.select().from(materialsTable);

  return allMaterials;
}

async function findByMaterialName(materialName: string) {
  const materialsFound = await database.client
    .select()
    .from(materialsTable)
    .where(eq(sql`LOWER(${materialsTable.name})`, materialName.toLowerCase()));

  if (materialsFound.length === 0) {
    throw new NotFoundError({ message: 'Material não encontrado.' });
  }

  return materialsFound;
}

async function findOneById(id: string) {
  try {
    const materialFound = await database.client
      .select()
      .from(materialsTable)
      .where(eq(materialsTable.id, id));

    return materialFound[0];
  } catch (error) {
    throw new NotFoundError({ message: 'ID não encontrado.', cause: error });
  }
}

async function update(updatedMaterialInputValues: MaterialSelectDatabase) {
  const registeredMaterial = await findByMaterialName(
    updatedMaterialInputValues.name
  );

  const keysToCompare = ['name', 'price', 'baseWidth', 'fkGroup'] as const;

  const areEqual = compareObjectsByKeys(
    updatedMaterialInputValues,
    registeredMaterial[0],
    keysToCompare
  );

  if (areEqual) {
    return { message: 'Nenhuma alteração a ser feita.' };
  }

  const result = await database.client
    .update(materialsTable)
    .set({
      ...updatedMaterialInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(materialsTable.name, updatedMaterialInputValues.name))
    .returning();

  return result[0];
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedMaterial = await database.client
      .delete(materialsTable)
      .where(eq(materialsTable.id, id))
      .returning();
    return deletedMaterial[0];
  } catch (error) {
    throw new NotFoundError({
      message: 'O Material não pode ser deletado.',
      cause: error
    });
  }
}

const material = {
  update,
  findByMaterialName,
  findOneById,
  deleteById,
  findAll,
  create
};

export default material;
