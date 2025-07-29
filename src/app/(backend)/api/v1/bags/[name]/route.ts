import { BagSelectDatabase } from '@/types/bag';
import { errorHandler } from '@backend/infra/controller';
import bag from '@backend/models/bag';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');
  const bagNameNormalized = decodeURIComponent(finalUrl);

  try {
    const bagFound = await bag.findByBagName(bagNameNormalized);

    return NextResponse.json(bagFound);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');
  const requestData: BagSelectDatabase = await request.json();
  const updatedBagInputValues = {
    ...requestData,
    id: finalUrl
  };

  const updatedBag = await bag.update(updatedBagInputValues);

  return NextResponse.json(updatedBag);
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const deletedBag = await bag.deleteById(requestData);

    return NextResponse.json(deletedBag);
  } catch (error) {
    return errorHandler(error);
  }
}
