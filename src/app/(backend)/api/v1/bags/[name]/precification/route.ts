import { errorHandler } from '@backend/infra/controller';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    await precification.create(requestData.materials, requestData.hoursWorked);

    return NextResponse.json(requestData);
  } catch (error) {
    return errorHandler(error);
  }
}
