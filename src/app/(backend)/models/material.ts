import { database } from '@/app/(backend)/infra/database';
import { NotFoundError, ValidationError } from '@/app/(backend)/infra/erros';
import { materialsTable } from '@/app/(backend)/infra/schemas/material';
import { MaterialInsert, MaterialSelect } from '@/types/material';
import { eq, sql } from 'drizzle-orm';

async function create(material: MaterialInsert) {
  try {
    const createdMaterial = await database.client
      .insert(materialsTable)
      .values(material)
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
    throw new NotFoundError({ message: 'Id não encontrado.', cause: error });
  }
}

async function update(materialUpdated: MaterialSelect) {
  const materialRegistered = await findOneById(materialUpdated.id);

  const keysToCompare = ['name', 'price', 'baseWidth', 'groupId'] as const;

  const areEqual = compareObjectsByKeys(
    materialUpdated,
    materialRegistered,
    keysToCompare
  );

  if (areEqual) {
    return { data: {}, message: 'Nenhuma alteração a ser feita.' };
  }

  const result = await database.client
    .update(materialsTable)
    .set({
      ...materialUpdated,
      id: '',
      updatedAt: sql`NOW()`
    })
    .where(eq(materialsTable.id, materialUpdated.id))
    .returning();

  return { data: result[0], message: '' };

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
    return { data: deletedMaterial[0], message: 'O material foi deletado.' };
  } catch (error) {
    throw new NotFoundError({
      message: 'O material não foi deletado.',
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
