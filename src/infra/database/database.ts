import dotevn from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import 'dotenv/config';
import { eq, SQLWrapper } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { materialsTable } from './schemas/materials';

dotenvExpand.expand(dotevn.config({ path: '.env.development' }));

const db = drizzle({
  connection: process.env.POSTGRES_URL!,
  casing: 'snake_case'
});

async function query(query: SQLWrapper | string) {
  const { rows } = await db.execute(query);

  return rows[0];
}

async function insertMaterial(material: typeof materialsTable.$inferInsert) {
  await db.insert(materialsTable).values(material);

  return material;
}

async function getMaterials() {
  const materials = await db.select().from(materialsTable);

  return materials;
}

async function getMaterialById(id: number) {
  const material = await db
    .select()
    .from(materialsTable)
    .where(eq(materialsTable.id, id));

  return material;
}

async function updateMaterial(material: typeof materialsTable.$inferSelect) {
  await db
    .update(materialsTable)
    .set({
      material: material.material,
      materialGroup: material.materialGroup,
      price: material.price
    })
    .where(eq(materialsTable.id, material.id));
}

async function deleteMaterialById(id: number) {
  await db.delete(materialsTable).where(eq(materialsTable.id, id));
}

const database = {
  getMaterials,
  insertMaterial,
  query,
  updateMaterial,
  getMaterialById,
  deleteMaterialById,
  db
};

export { database };
