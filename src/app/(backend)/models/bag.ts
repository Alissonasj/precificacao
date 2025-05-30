import { compareObjectsByKeys } from '@/lib/utils';
import { BagInsert, BagSelect } from '@/types/bag';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { bagsTable } from '@db_schemas/bag';
import { eq, sql } from 'drizzle-orm';

async function create(bagInputValues: BagInsert) {
  try {
    const createdBag = await database.client
      .insert(bagsTable)
      .values(bagInputValues)
      .returning();

    return { data: createdBag[0], message: 'A Bolsa foi cadastrada.' };
  } catch (error) {
    throw new ValidationError({ cause: error });
  }
}

async function findAll() {
  const allBags = await database.client.select().from(bagsTable);

  return allBags;
}

async function findByBagName(bagName: string) {
  const bagsFound = await database.client
    .select()
    .from(bagsTable)
    .where(eq(sql`LOWER(${bagsTable.name})`, bagName.toLowerCase()));

  if (bagsFound.length === 0) {
    return {
      data: bagsFound,
      message: 'Bolsa não encontrada.'
    };
  }

  return { data: bagsFound, message: '' };
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

async function update(updatedBagInputValues: BagSelect) {
  const registeredBag = await findOneById(updatedBagInputValues.id);

  const keysToCompare = ['name', 'price', 'hoursWorked'] as const;

  const areEqual = compareObjectsByKeys(
    updatedBagInputValues,
    registeredBag,
    keysToCompare
  );

  if (areEqual) {
    return { data: {}, message: 'Nenhuma alteração a ser feita.' };
  }

  const result = await database.client
    .update(bagsTable)
    .set({
      ...updatedBagInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(bagsTable.id, updatedBagInputValues.id))
    .returning();

  return { data: result[0], message: '' };
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedBag = await database.client
      .delete(bagsTable)
      .where(eq(bagsTable.id, id))
      .returning();
    return { data: deletedBag[0], message: 'A Bolsa foi deletada.' };
  } catch (error) {
    throw new NotFoundError({
      message: 'A Bolsa não pode ser deletada.',
      cause: error
    });
  }
}

const bag = {
  update,
  findByBagName,
  findOneById,
  deleteById,
  findAll,
  create
};

export default bag;
