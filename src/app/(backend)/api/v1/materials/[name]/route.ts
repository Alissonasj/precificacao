import { errorHandler } from '@backend/infra/controller';
import material from '@backend/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const materialNameNormalized = decodeURIComponent(finalUrl);

  try {
    const result = await material.findByMaterialName(materialNameNormalized);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();

  try {
    const result = await material.update(requestData);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest) {
  const requestData = await request.json();

  try {
    const result = await material.deleteById(requestData);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
