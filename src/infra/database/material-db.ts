import { MaterialInsert, MaterialSelect } from '@/app/types/material-type';
import { eq } from 'drizzle-orm';
import { database } from './database';
import { materialsTable } from './schemas/materials';

async function insert(material: MaterialInsert) {
  await database.client.insert(materialsTable).values(material);
}

async function getAll() {
  const materials = await database.client.select().from(materialsTable);

  return materials;
}

async function getById(id: number) {
  const material = await database.client
    .select()
    .from(materialsTable)
    .where(eq(materialsTable.id, id));

  return material;
}

async function update(material: MaterialSelect) {
  await database.client
    .update(materialsTable)
    .set({
      material: material.material,
      materialGroup: material.materialGroup,
      price: material.price
    })
    .where(eq(materialsTable.id, material.id));
}

async function deleteById(id: number) {
  await database.client.delete(materialsTable).where(eq(materialsTable.id, id));
}

const materialDb = {
  update,
  getById,
  deleteById,
  getAll,
  insert
};

export { materialDb };
