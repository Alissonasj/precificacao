import { errorHandler } from '@/app/(backend)/infra/controller';
import material from '@/app/(backend)/models/material';
import { MaterialSelect } from '@/types/material';
import { NextRequest, NextResponse } from 'next/server';

//Ao tentar acessar uma URL dinâmica do objeto que foi deletado do banco de dados, o erro lançado é 500 e nao 404 como está no código. Porque? Existe algum tipo de cash?
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
  const requestData: MaterialSelect = await request.json();
  const materialValues = {
    ...requestData,
    id: finalUrl
  };

  const updatedMaterial = await material.update(materialValues);

  return NextResponse.json(updatedMaterial);
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const deletedMaterial = await material.deleteById(requestData);

    return NextResponse.json(deletedMaterial);
  } catch (error) {
    return errorHandler(error);
  }
}
