import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { materialGroupsTable } from '@db_schemas/material';
import { eq, sql } from 'drizzle-orm';

async function create({ group }: { group: string }) {
  await validateUniqueGroup(group);

  try {
    const createdGroup = await database.client
      .insert(materialGroupsTable)
      .values({ group })
      .returning();

    return { data: createdGroup[0], message: 'O Grupo foi cadastrado.' };
  } catch (error) {
    throw new ValidationError({ cause: error });
  }

  async function validateUniqueGroup(group: string) {
    const { data } = await findByGroup(group);

    if (data)
      throw new ValidationError({
        message: 'O grupo informado já foi cadastrado.',
        action: 'Utilize outro grupo para cadastrar.'
      });
  }
}

async function findAll() {
  const allGroups = await database.client.select().from(materialGroupsTable);

  return allGroups;
}

async function findByGroup(group: string) {
  const gorupFound = await database.client
    .select()
    .from(materialGroupsTable)
    .where(eq(sql`LOWER(${materialGroupsTable.group})`, group.toLowerCase()));

  if (gorupFound.length === 0) {
    return {
      data: gorupFound[0],
      message: 'Grupo não encontrado.'
    };
  }

  return { data: gorupFound, message: '' };
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedMaterial = await database.client
      .delete(materialGroupsTable)
      .where(eq(materialGroupsTable.id, id))
      .returning();

    return { data: deletedMaterial[0], message: 'O material foi deletado.' };
  } catch (error) {
    throw new NotFoundError({
      message: 'O material não foi deletado.',
      cause: error
    });
  }
}

const materialGroup = {
  create,
  findAll,
  findByGroup,
  deleteById
};

export default materialGroup;
