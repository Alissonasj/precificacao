import { errorHandler } from '@backend/infra/controller';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const resultObject = await precification.create(
      requestData.materials,
      requestData.hoursWorked
    );

    return NextResponse.json(resultObject);
  } catch (error) {
    return errorHandler(error);
  }
}
