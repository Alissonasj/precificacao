import { material } from '@/app/models/material';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const materialFound = await material.findOneById(finalUrl);

  return NextResponse.json(materialFound);
}
