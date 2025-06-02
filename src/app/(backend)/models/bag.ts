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

    return { data: createdBag[0], message: 'A Bolsa foi cadastrada.' };
  } catch (error) {
    throw new ValidationError({ cause: error });
  }

  async function validateUniqueBag(bagName: string) {
    const { data } = await findByBagName(bagName);

    if (data.length > 0)
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

async function update(updatedBagInputValues: BagSelectDatabase) {
  const registeredBag = await findByBagName(updatedBagInputValues.name);

  const keysToCompare = ['name', 'price', 'hoursWorked'] as const;

  const areEqual = compareObjectsByKeys(
    updatedBagInputValues,
    registeredBag.data[0],
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
    .where(eq(bagsTable.name, updatedBagInputValues.name))
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
