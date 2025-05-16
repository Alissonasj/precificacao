import { BagSelect } from '@/types/bag';
import { errorHandler } from '@backend/infra/controller';
import bag from '@backend/models/bag';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');

  try {
    const bagFound = await bag.findOneById(finalUrl);

    return NextResponse.json(bagFound);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');
  const requestData: BagSelect = await request.json();
  const updatedBagInputValues = {
    ...requestData,
    id: finalUrl
  };

  const updatedBag = await bag.update(updatedBagInputValues);

  return NextResponse.json(updatedBag);
}

export async function DELETE(request: NextRequest) {
  //Melhor passar o ID no corpo da request ou deletar direto pegando da URL?
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');

  try {
    const deletedBag = await bag.deleteById({ id: finalUrl });

    return NextResponse.json(deletedBag);
  } catch (error) {
    return errorHandler(error);
  }
}
