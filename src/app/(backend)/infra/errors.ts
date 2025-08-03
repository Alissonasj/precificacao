type CustomErrorType = {
  message?: string;
  cause?: unknown;
  action?: string;
  statusCode?: number;
};

export class InternalServerError extends Error {
  public action: string;
  public statusCode: number;

  constructor({ cause, statusCode }: CustomErrorType) {
    super('Um erro inesperado aconteceu.');

    this.name = 'InternalServerError';
    this.cause = cause;
    this.action = 'Entre em contato com o suporte.';
    this.statusCode = statusCode || 500; // Internal Server Error https://shre.ink/MUBn

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    };
  }
}

export class ValidationError extends Error {
  public action: string;
  public statusCode: number;

  constructor({ message, cause, action }: CustomErrorType) {
    super(message || 'Um erro de validação aconteceu.');

    this.name = 'ValidationError';
    this.cause = cause;
    this.action = action || 'Verifique se os dados estão corretos.';
    this.statusCode = 400; // Bad Request https://shre.ink/MU5c

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    };
  }
}

export class NotFoundError extends Error {
  public action: string;
  public statusCode: number;

  constructor({ message, cause, action }: CustomErrorType) {
    super(message || 'Item informado não foi encontrado.');

    this.name = 'NotFoundError';
    this.cause = cause;
    this.action = action || 'Verifique se o nome está correto.';
    this.statusCode = 404; // Not Found https://shre.ink/MUGc

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode
    };
  }
}
