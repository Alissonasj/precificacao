import { materialsTable } from '@/app/(backend)/infra/schemas/material';
import { queryToReal, serverObjectReturn, toCents } from '@/lib/utils';
import { MaterialInsertDb, MaterialSelectDb } from '@/types/material';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { and, eq, getTableColumns, ne, sql } from 'drizzle-orm';

async function create(materialInputValues: MaterialInsertDb) {
  await existsMaterial(materialInputValues.name);

  await database.client.insert(materialsTable).values({
    ...materialInputValues,
    price: toCents(materialInputValues.price)
  });

  return serverObjectReturn({
    message: 'Material cadastrado com sucesso.',
    status_code: 201
  });

  async function existsMaterial(materialName: string) {
    const result = await findOneByName(materialName);

    if (result) {
      throw new ValidationError({
        message: 'O material informado já foi cadastrado.',
        action: 'Utilize outro nome para cadastrar.'
      });
    }
  }
}

async function findByMaterialName(materialName: string) {
  const materialsFound = await database.client
    .select({
      ...getTableColumns(materialsTable),
      price: queryToReal(materialsTable.price)
    })
    .from(materialsTable)
    .where(sql`unaccent(name) ILIKE unaccent(${`%${materialName}%`})`);

  return materialsFound;
}

async function findAll() {
  const allMaterials = await database.client
    .select({
      ...getTableColumns(materialsTable),
      price: queryToReal(materialsTable.price)
    })
    .from(materialsTable);

  return allMaterials;
}

async function findOneById(id: string) {
  const materialFound = await database.client
    .select({
      ...getTableColumns(materialsTable),
      price: queryToReal(materialsTable.price)
    })
    .from(materialsTable)
    .where(eq(materialsTable.id, id));

  return materialFound[0];
}

async function findOneByName(materialName: string) {
  const materialFound = await database.client
    .select({
      ...getTableColumns(materialsTable),
      price: queryToReal(materialsTable.price)
    })
    .from(materialsTable)
    .where(eq(sql`LOWER(${materialsTable.name})`, materialName.toLowerCase()));

  return materialFound[0];
}

async function update(updatedMaterialInputValues: MaterialSelectDb) {
  await validateUniqueMaterial(
    updatedMaterialInputValues.name,
    updatedMaterialInputValues.id
  );

  await database.client
    .update(materialsTable)
    .set({
      ...updatedMaterialInputValues,
      price: toCents(updatedMaterialInputValues.price),
      updatedAt: sql`NOW()`
    })
    .where(eq(materialsTable.id, updatedMaterialInputValues.id));

  return serverObjectReturn({
    message: 'Material atualizado com sucesso.'
  });
}

async function deleteById(id: string) {
  try {
    await database.client
      .delete(materialsTable)
      .where(eq(materialsTable.id, id));

    return serverObjectReturn({
      message: 'Material deletado com sucesso.'
    });
  } catch (error) {
    throw new NotFoundError({
      message: 'O Material não pode ser deletado.',
      cause: error
    });
  }
}

async function validateUniqueMaterial(materialName: string, id: string) {
  const [result] = await database.client
    .select()
    .from(materialsTable)
    .where(
      and(eq(materialsTable.name, materialName), ne(materialsTable.id, id))
    )
    .limit(1);

  if (result)
    throw new ValidationError({
      message: 'O material informado já foi cadastrado.',
      action: 'Utilize outro nome para cadastrar.'
    });
}

const material = {
  update,
  findByMaterialName,
  findOneById,
  findOneByName,
  deleteById,
  findAll,
  create
};

export default material;
