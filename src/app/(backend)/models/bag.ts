import { BagInsertDatabase, BagSelectDatabase } from '@/types/bag';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { bagsTable } from '@db_schemas/bag';
import { and, eq, ne, sql } from 'drizzle-orm';

async function create(bagInputValues: BagInsertDatabase) {
  await existsBag(bagInputValues.name);

  const createdBag = await database.client
    .insert(bagsTable)
    .values(bagInputValues)
    .returning();

  return createdBag[0];

  async function existsBag(bagName: string) {
    const result = await findOneByName(bagName);

    if (result) {
      throw new ValidationError({
        message: 'A bolsa informada já foi cadastrada.',
        action: 'Utilize outro nome para cadastrar.'
      });
    }
  }
}

async function findAll() {
  const allBags = await database.client.select().from(bagsTable);

  return allBags;
}

async function findByBagName(bagName: string) {
  const result = await database.client
    .select()
    .from(bagsTable)
    .where(sql`unaccent(name) ILIKE unaccent(${`%${bagName}%`})`);

  return result;
}

async function findOneById(id: string) {
  try {
    const bagFound = await database.client
      .select()
      .from(bagsTable)
      .where(eq(bagsTable.id, id));

    return bagFound[0];
  } catch (error) {
    throw new NotFoundError({ message: 'ID não encontrado.', cause: error });
  }
}

async function findOneByName(bagName: string) {
  try {
    const bagFound = await database.client
      .select()
      .from(bagsTable)
      .where(eq(sql`LOWER(${bagsTable.name})`, bagName.toLocaleLowerCase()));

    return bagFound[0];
  } catch (error) {
    throw new NotFoundError({ message: 'Bolsa não encontrada.', cause: error });
  }
}

async function update(updatedBagInputValues: BagSelectDatabase) {
  await validateUniqueBag(updatedBagInputValues.name, updatedBagInputValues.id);

  const result = await database.client
    .update(bagsTable)
    .set({
      ...updatedBagInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(bagsTable.id, updatedBagInputValues.id))
    .returning();

  return result[0];
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedBag = await database.client
      .delete(bagsTable)
      .where(eq(bagsTable.id, id))
      .returning();

    return deletedBag[0];
  } catch (error) {
    throw new NotFoundError({
      message: 'A Bolsa não pode ser deletada.',
      cause: error
    });
  }
}

async function validateUniqueBag(bagName: string, id: string) {
  const [result] = await database.client
    .select()
    .from(bagsTable)
    .where(and(eq(bagsTable.name, bagName), ne(bagsTable.id, id)))
    .limit(1);

  if (result)
    throw new ValidationError({
      message: 'A bolsa informada já foi cadastrada.',
      action: 'Utilize outro nome para cadastrar.'
    });
}

const bag = {
  update,
  findByBagName,
  findOneById,
  deleteById,
  findAll,
  findOneByName,
  create
};

export default bag;
