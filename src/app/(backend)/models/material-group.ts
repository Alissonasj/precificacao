import { MaterialGroupInsertDatabase } from '@/types/material';
import { database } from '@backend/infra/database';
import { NotFoundError, ValidationError } from '@backend/infra/errors';
import { materialGroupsTable } from '@db_schemas/material';
import { eq, sql } from 'drizzle-orm';

async function create(materialGroups: MaterialGroupInsertDatabase) {
  await validateUniqueGroup(materialGroups.name);

  try {
    const createdGroup = await database.client
      .insert(materialGroupsTable)
      .values(materialGroups)
      .returning();

    return createdGroup[0];
  } catch (error) {
    throw new ValidationError({ cause: error });
  }

  async function validateUniqueGroup(groupName: string) {
    const result = await findByGroupName(groupName);

    if (result.length > 0)
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

async function findByGroupName(groupName: string) {
  const result = await database.client
    .select()
    .from(materialGroupsTable)
    .where(
      eq(sql`LOWER(${materialGroupsTable.name})`, groupName.toLowerCase())
    );

  return result;
}

async function deleteById({ id }: { id: string }) {
  try {
    const deletedMaterial = await database.client
      .delete(materialGroupsTable)
      .where(eq(materialGroupsTable.id, id))
      .returning();

    return deletedMaterial[0];
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
  findByGroupName,
  deleteById
};

export default materialGroup;
