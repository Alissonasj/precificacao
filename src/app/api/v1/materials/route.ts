import { MaterialInsert, MaterialSelect } from '@/app/types/material-type';
import { materialDb } from '@/infra/database/material-db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const searchParamsId = url.searchParams.get('id');

  if (searchParamsId) {
    const material = await materialDb.getById(searchParamsId);

    return NextResponse.json(material);
  }

  const materials = await materialDb.getAll();

  return Response.json(materials);
}

export async function POST(request: NextRequest) {
  const requestData: MaterialInsert = await request.json();
  const material = {
    material: requestData.material,
    materialGroup: requestData.materialGroup,
    price: requestData.price
  };

  materialDb.insert(material);

  return NextResponse.json(material);
}

export async function PUT(request: NextRequest) {
  const requestData: MaterialSelect = await request.json();
  const material = {
    id: requestData.id,
    material: requestData.material,
    materialGroup: requestData.materialGroup,
    price: requestData.price
  };

  materialDb.update(material);

  return NextResponse.json(material);
}

export async function DELETE(request: NextRequest) {
  const requestData: Pick<MaterialSelect, 'id'> = await request.json();

  materialDb.deleteById(requestData.id);

  return NextResponse.json(requestData.id);
}
