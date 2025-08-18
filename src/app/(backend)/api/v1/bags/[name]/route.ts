import { errorHandler } from '@backend/infra/controller';
import bag from '@backend/models/bag';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');
  const bagNameNormalized = decodeURIComponent(finalUrl);

  try {
    const result = await bag.findByBagName(bagNameNormalized);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestData = await request.json();
    const result = await bag.update(requestData);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const result = await bag.deleteById(requestData);

    if (result) {
      await precification.deleteByBagName(result.name);
    }

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
