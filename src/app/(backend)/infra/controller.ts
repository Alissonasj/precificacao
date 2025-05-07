import { NextResponse } from 'next/server';
import { InternalServerError, NotFoundError, ValidationError } from './errors';

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
