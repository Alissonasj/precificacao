import { material } from '@/app/models/material';
import { MaterialInsert, MaterialSelect } from '@/types/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const searchParams = url.searchParams.get('materialName');

  if (searchParams) {
    const materialFound = await material.findOneByName(searchParams);

    return NextResponse.json(materialFound);
  }

  const materialsFound = await material.findAll();

  return NextResponse.json(materialsFound);
}

export async function POST(request: NextRequest) {
  const requestData: MaterialInsert = await request.json();

  const createdMaterial = await material.create(requestData);

  return new NextResponse(JSON.stringify(createdMaterial), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const requestData: MaterialSelect = await request.json();
  const updatedMaterial = {
    ...requestData,
    updatedAt: new Date()
  };

  await material.update(updatedMaterial);

  return NextResponse.json(material);
}

export async function DELETE(request: NextRequest) {
  const requestData: Pick<MaterialSelect, 'id'> = await request.json();

  await material.deleteById(requestData.id);

  return NextResponse.json(requestData.id);
}
