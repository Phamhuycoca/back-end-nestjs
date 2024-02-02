import { HttpStatus, Injectable } from '@nestjs/common';

const DEFAULT_SUCCESS_MESSAGE = 'success';

export interface IErrorResponse {
    key: string;
    order?: number;
    message: string;
    value?: any;
}

export class SuccessResponse {
    constructor(data = {}) {
        return {
            code: HttpStatus.OK,
            message: DEFAULT_SUCCESS_MESSAGE,
            data,
        };
    }
}
export class ErrorResponse {
    constructor(
        code: number | string,
        message:string= '',
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            message,
            errors,
        };
    }
}
export class HttpResponse<T = string> {
    constructor(code: T, message = DEFAULT_SUCCESS_MESSAGE, data?: any) {
        return {
            code,
            message,
            data,
        };
    }
}

@Injectable()
export class ApiResponse<T> {
    public code: number;

    public message: string;

    public data: T;

    public errors: IErrorResponse[];
}
