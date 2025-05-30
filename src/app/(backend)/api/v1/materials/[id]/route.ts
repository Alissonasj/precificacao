import { MaterialSelectDatabase } from '@/types/material';
import { errorHandler } from '@backend/infra/controller';
import material from '@backend/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');

  try {
    const materialFound = await material.findOneById(finalUrl);

    return NextResponse.json(materialFound);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const requestData: MaterialSelectDatabase = await request.json();
  const updatedMaterialInputValues = {
    ...requestData,
    id: finalUrl
  };

  const updatedMaterial = await material.update(updatedMaterialInputValues);

  return NextResponse.json(updatedMaterial);
}

export async function DELETE(request: NextRequest) {
  //Melhor passar o ID no corpo da request ou deletar direto pegando da URL?
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');

  try {
    const deletedMaterial = await material.deleteById({ id: finalUrl });

    return NextResponse.json(deletedMaterial);
  } catch (error) {
    return errorHandler(error);
  }
}
