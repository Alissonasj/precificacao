import { materials } from '@/infra/queries/materials';
import { MaterialInsert, MaterialSelect } from '@/types/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const searchParamsId = url.searchParams.get('id');

  if (searchParamsId) {
    const materialResult = await materials.getById(searchParamsId);

    return NextResponse.json(materialResult);
  }

  const materialsResult = await materials.getAll();

  return Response.json(materialsResult);
}

export async function POST(request: NextRequest) {
  const requestData: MaterialInsert = await request.json();
  const material = {
    material: requestData.material,
    materialGroup: requestData.materialGroup,
    price: requestData.price
  };

  await materials.create(material);

  return NextResponse.json(material);
}

export async function PUT(request: NextRequest) {
  const requestData: MaterialSelect = await request.json();
  const material = {
    id: requestData.id,
    material: requestData.material,
    materialGroup: requestData.materialGroup,
    price: requestData.price,
    baseWidth: requestData.baseWidth,
    createdAt: requestData.createdAt,
    updatedAt: new Date()
  };

  await materials.update(material);

  return NextResponse.json(material);
}

export async function DELETE(request: NextRequest) {
  const requestData: Pick<MaterialSelect, 'id'> = await request.json();

  await materials.deleteById(requestData.id);

  return NextResponse.json(requestData.id);
}
