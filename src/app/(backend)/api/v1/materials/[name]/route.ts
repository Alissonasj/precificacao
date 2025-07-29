import { errorHandler } from '@backend/infra/controller';
import material from '@backend/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const materialNameNormalized = decodeURIComponent(finalUrl);

  try {
    const materialFound = await material.findByMaterialName(
      materialNameNormalized
    );

    return NextResponse.json(materialFound);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const requestData = await request.json();
  const updatedMaterialInputValues = {
    ...requestData,
    id: finalUrl
  };

  const updatedMaterial = await material.update(updatedMaterialInputValues);

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
