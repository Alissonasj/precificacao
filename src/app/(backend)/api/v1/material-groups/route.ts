import { errorHandler } from '@backend/infra/controller';
import materialGroup from '@backend/models/material-group';
import { NextRequest, NextResponse } from 'next/server';
export async function GET() {
  const materialsFound = await materialGroup.findAll();

  return NextResponse.json(materialsFound);
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const createdMaterialGroup = await materialGroup.create(requestData);

    return NextResponse.json(createdMaterialGroup, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const deletedMaterial = await materialGroup.deleteById(requestData);

    return NextResponse.json(deletedMaterial);
  } catch (error) {
    return errorHandler(error);
  }
}
