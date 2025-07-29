import { compareObjectsByKeys } from '@/lib/utils';
import { BagInsertDatabase, BagSelectDatabase } from '@/types/bag';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { bagsTable } from '@db_schemas/bag';
import { eq, sql } from 'drizzle-orm';

async function create(bagInputValues: BagInsertDatabase) {
  await validateUniqueBag(bagInputValues.name);

  try {
    const createdBag = await database.client
      .insert(bagsTable)
      .values(bagInputValues)
      .returning();

    return createdBag[0];
  } catch (error) {
    throw new ValidationError({ cause: error });
  }

  async function validateUniqueBag(bagName: string) {
    const result = await findByBagName(bagName);

    if (result.length > 0)
      throw new ValidationError({
        message: 'A bolsa informada já foi cadastrada.',
        action: 'Utilize outro nome para cadastrar.'
      });
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

async function update(updatedBagInputValues: BagSelectDatabase) {
  const registeredBag = await findByBagName(updatedBagInputValues.name);

  const keysToCompare = ['name', 'hoursWorked'] as const;

  const areEqual = compareObjectsByKeys(
    updatedBagInputValues,
    registeredBag[0],
    keysToCompare
  );

  if (areEqual) {
    return { message: 'Nenhuma alteração a ser feita.' };
  }

  const result = await database.client
    .update(bagsTable)
    .set({
      ...updatedBagInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(bagsTable.name, updatedBagInputValues.name))
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

const bag = {
  update,
  findByBagName,
  findOneById,
  deleteById,
  findAll,
  create
};

export default bag;
