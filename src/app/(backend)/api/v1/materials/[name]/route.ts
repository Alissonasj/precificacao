import { errorHandler } from '@backend/infra/controller';
import material from '@backend/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const finalUrl = url.pathname.replace('/api/v1/materials/', '');
    const materialNameNormalized = decodeURIComponent(finalUrl);

    const materialFound = await material.findByMaterialName(
      materialNameNormalized
    );

    return NextResponse.json(materialFound[0]);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestData = await request.json();
    const result = await material.update(requestData);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const requestData = await request.json();
    const result = await material.deleteById(requestData);

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
