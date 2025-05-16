import { materialsTable } from '@/app/(backend)/infra/schemas/material';
import { MaterialInsert, MaterialSelect } from '@/types/material';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { eq, sql } from 'drizzle-orm';

async function create(materialInputValues: MaterialInsert) {
  try {
    const createdMaterial = await database.client
      .insert(materialsTable)
      .values(materialInputValues)
      .returning();

    return { data: createdMaterial[0], message: 'O Material foi cadastrado.' };
  } catch (error) {
    throw new ValidationError({ cause: error });
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
    return {
      data: materialsFound,
      message: 'Material não encontrado.'
    };
  }

  return { data: materialsFound, message: '' };
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

async function update(updatedMaterialInputValues: MaterialSelect) {
  const registeredMaterial = await findOneById(updatedMaterialInputValues.id);

  const keysToCompare = ['name', 'price', 'baseWidth', 'fkGroup'] as const;

  const areEqual = compareObjectsByKeys(
    updatedMaterialInputValues,
    registeredMaterial,
    keysToCompare
  );

  if (areEqual) {
    return { data: {}, message: 'Nenhuma alteração a ser feita.' };
  }

  const result = await database.client
    .update(materialsTable)
    .set({
      ...updatedMaterialInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(materialsTable.id, updatedMaterialInputValues.id))
    .returning();

  return { data: result[0], message: '' };

  // Está se repetindo entre os models
  function compareObjectsByKeys<T>(
    object1: T,
    object2: T,
    keysToCompare: readonly (keyof T)[]
  ): boolean {
    return keysToCompare.every((key) => object1[key] === object2[key]);
  }
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedMaterial = await database.client
      .delete(materialsTable)
      .where(eq(materialsTable.id, id))
      .returning();
    return { data: deletedMaterial[0], message: 'O Material foi deletado.' };
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
