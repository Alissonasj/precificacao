import { errorHandler } from '@/app/(backend)/infra/controller';
import material from '@/app/(backend)/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const searchParams = url.searchParams.get('materialName');

  if (searchParams) {
    const materialsFound = await material.findByMaterialName(searchParams);

    return NextResponse.json(materialsFound);
  }

  const materialsFound = await material.findAll();

  return NextResponse.json(materialsFound);
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const createdMaterial = await material.create(requestData);

    return NextResponse.json(createdMaterial, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
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
