import { errorHandler } from '@backend/infra/controller';
import bag from '@backend/models/bag';
import precification from '@backend/models/precification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/bags/', '');
  const bagNameNormalized = decodeURIComponent(finalUrl);

  try {
    const bagsFound = await bag.findByBagName(bagNameNormalized);
    const usedMaterialsFound = await precification.findUsedMaterials(
      bagsFound[0].name
    );

    return NextResponse.json({
      bag: bagsFound[0],
      usedMaterials: usedMaterialsFound
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestData = await request.json();
    const resultObject = await bag.update(requestData);

    return NextResponse.json(resultObject);
  } catch (error) {
    return errorHandler(error);
  }
}
