import { queryToReal, serverObjectReturn } from '@/lib/utils';
import { BagInsertDatabase, BagSelectDatabase } from '@/types/bag';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { bagsTable } from '@db_schemas/bag';
import { and, eq, getTableColumns, ne, sql } from 'drizzle-orm';

async function create(bagInputValues: BagInsertDatabase) {
  await existsBag(bagInputValues.name);

  await database.client.insert(bagsTable).values(bagInputValues);

  return serverObjectReturn({
    message: 'Bolsa cadastrada com sucesso.',
    status_code: 201
  });

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
  const allBags = await database.client
    .select({
      ...getTableColumns(bagsTable),
      suggestedPrice: queryToReal(bagsTable.suggestedPrice)
    })
    .from(bagsTable);

  return allBags;
}

async function findByBagName(bagName: string) {
  const result = await database.client
    .select({
      ...getTableColumns(bagsTable),
      suggestedPrice: queryToReal(bagsTable.suggestedPrice)
    })
    .from(bagsTable)
    .where(sql`unaccent(name) ILIKE unaccent(${`%${bagName}%`})`);

  return result;
}

async function findOneById(id: string) {
  try {
    const bagFound = await database.client
      .select({
        ...getTableColumns(bagsTable),
        suggestedPrice: queryToReal(bagsTable.suggestedPrice)
      })
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
      .select({
        ...getTableColumns(bagsTable),
        suggestedPrice: queryToReal(bagsTable.suggestedPrice)
      })
      .from(bagsTable)
      .where(eq(sql`LOWER(${bagsTable.name})`, bagName.toLocaleLowerCase()));

    return bagFound[0];
  } catch (error) {
    throw new NotFoundError({ message: 'Bolsa não encontrada.', cause: error });
  }
}

async function update(updatedBagInputValues: BagSelectDatabase) {
  await validateUniqueBag(updatedBagInputValues.name, updatedBagInputValues.id);

  await database.client
    .update(bagsTable)
    .set({
      ...updatedBagInputValues,
      updatedAt: sql`NOW()`
    })
    .where(eq(bagsTable.id, updatedBagInputValues.id));

  return serverObjectReturn({
    message: 'Bolsa atualizada com sucesso.'
  });
}

async function deleteById(id: string) {
  const result = await database.client
    .delete(bagsTable)
    .where(eq(bagsTable.id, id))
    .returning();

  return serverObjectReturn({
    message: 'Bolsa deletada com sucesso.',
    dataObject: result[0]
  });
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
