import { eq } from 'drizzle-orm';
import { database } from '../infra/database';
import { NotFoundError, ValidationError } from '../infra/erros';
import { materialGroupsTable } from '../infra/schemas/material';

async function create({ group }: { group: string }) {
  try {
    const createdGroup = await database.client
      .insert(materialGroupsTable)
      .values({ group })
      .returning();

    return { data: createdGroup[0], message: 'O Grupo foi cadastrado.' };
  } catch (error) {
    throw new ValidationError({ cause: error });
  }
}

async function findAll() {
  const allGroups = await database.client.select().from(materialGroupsTable);

  return allGroups;
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
  deleteById
};

export default materialGroup;
