import { PrecificationInsertDatabase } from '@/types/precification';
import { database } from '@backend/infra/database';
import { ValidationError } from '@backend/infra/errors';
import { precificationsTable } from '@db_schemas/precification';

async function create(bagMaterialsInpuntValues: PrecificationInsertDatabase[]) {
  try {
    const createdPrevificatrion = await database.client
      .insert(precificationsTable)
      .values(bagMaterialsInpuntValues)
      .onConflictDoNothing()
      .returning();

    return createdPrevificatrion;
  } catch (error) {
    throw new ValidationError({ cause: error });
  }
}

const precification = {
  create
};

export default precification;
