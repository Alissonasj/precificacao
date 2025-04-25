import { MaterialInsert, MaterialSelect } from '@/types/material';
import { eq } from 'drizzle-orm';
import { database } from '../../infra/database';
import { materialsTable } from '../../infra/schemas/material';

async function create(material: MaterialInsert) {
  const result = await database.client
    .insert(materialsTable)
    .values(material)
    .returning();

  return result;
}

async function findAll() {
  const materials = await database.client.select().from(materialsTable);

  return materials;
}

async function findOneByName(materialName: string) {
  const material = await database.client
    .select()
    .from(materialsTable)
    .where(eq(materialsTable.materialName, materialName));

  return material[0];
}

async function findOneById(id: string) {
  const material = await database.client
    .select()
    .from(materialsTable)
    .where(eq(materialsTable.id, id));

  return material[0];
}

async function update(material: MaterialSelect) {
  await database.client
    .update(materialsTable)
    .set({
      materialName: material.materialName,
      materialGroup: material.materialGroup,
      price: material.price,
      baseWidth: material.baseWidth,
      createdAt: material.createdAt,
      updatedAt: material.updatedAt
    })
    .where(eq(materialsTable.id, material.id));
}

async function deleteById(id: string) {
  await database.client.delete(materialsTable).where(eq(materialsTable.id, id));
}

const material = {
  update,
  findOneByName,
  findOneById,
  deleteById,
  findAll,
  create
};

export { material };
