import material from '@/app/models/material';
import { NextResponse } from 'next/server';
import { InternalServerError, NotFoundError, ValidationError } from './erros';

export function errorHandler(error: unknown) {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    console.error(error);

    return NextResponse.json(error, {
      status: error.statusCode
    });
  }

  const publicErrorObject = new InternalServerError({ cause: error });
  console.error(publicErrorObject);

  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  });
}

export async function deleteHandler(id: string) {
  try {
    const deletedMaterial = await material.deleteById(id);

    return NextResponse.json(deletedMaterial);
  } catch (error) {
    return errorHandler(error);
  }
}
