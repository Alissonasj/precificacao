import { materialDb } from '@/infra/database/material-db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const finalUrl = url.pathname.replace('/api/v1/materials/', '');
  const material = await materialDb.getById(finalUrl);

  return NextResponse.json(material);
}
