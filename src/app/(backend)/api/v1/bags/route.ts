import { errorHandler } from '@backend/infra/controller';
import bag from '@backend/models/bag';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const searchParams = url.searchParams.get('bagName');

  if (searchParams) {
    const bagsFound = await bag.findByBagName(searchParams);

    return NextResponse.json(bagsFound);
  }

  const bagsFound = await bag.findAll();

  return NextResponse.json(bagsFound);
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const resultObject = await bag.create(requestData);

    return NextResponse.json(resultObject, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const resultObject = await bag.deleteById(requestData.bagId);

    if (resultObject.success) {
      await precification.deleteUsedMaterialsByBagName(resultObject.data!.name);
    }

    return NextResponse.json(resultObject);
  } catch (error) {
    return errorHandler(error);
  }
}
