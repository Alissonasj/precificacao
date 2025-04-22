import { MaterialInsert, MaterialSelect } from '@/types/material';
import { eq } from 'drizzle-orm';
import { database } from '../database';
import { materialsTable } from '../schemas/materials';

async function create(material: MaterialInsert) {
  await database.client.insert(materialsTable).values(material);
}

async function getAll() {
  const materials = await database.client.select().from(materialsTable);

  return materials;
}

async function getById(id: string) {
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
      material: material.material,
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

const materials = {
  update,
  getById,
  deleteById,
  getAll,
  create
};

export { materials };
