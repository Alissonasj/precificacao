import { PrecificationInsert } from '@/types/precification';
import { database } from '@backend/infra/database';
import { precificationsTable } from '@db_schemas/precification';

async function create(bagMaterialsInpuntValues: PrecificationInsert[]) {
  try {
    const createdPrevificatrion = await database.client
      .insert(precificationsTable)
      .values(bagMaterialsInpuntValues)
      .onConflictDoNothing()
      .returning();

    return {
      data: createdPrevificatrion,
      message: 'Precificação realizada.'
    };
  } catch (error) {
    throw error;
  }
}

const precification = {
  create
};

export default precification;
