import { PrecificationInsertDatabase } from '@/types/precification';
import { errorHandler } from '@backend/infra/controller';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

// ( Preço do Material / Lagura Base do Material ) * ( Lagura Usada * Comprimento Usado ) * Camadas
export async function POST(request: NextRequest) {
  try {
    const requestData: PrecificationInsertDatabase[] = await request.json();

    await precification.create(requestData);

    return NextResponse.json(requestData);
  } catch (error) {
    return errorHandler(error);
  }
}
