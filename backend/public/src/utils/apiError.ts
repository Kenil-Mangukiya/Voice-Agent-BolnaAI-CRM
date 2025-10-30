class apiError extends Error {
    statusCode: number;
    message: string;
    errors: any[];
    stack: string;
    success: boolean;

    constructor(
        statusCode: number,
        message: string,
        errors: [],
        stack: string
    )
    {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        } else {
            const captureStackTrace = (Error as any).captureStackTrace;
            if (typeof captureStackTrace === 'function') {
                captureStackTrace(this, this.constructor);
            } else {
                this.stack = new Error().stack || '';
            }
        }
    }

    // Add toJSON to serialize properly
    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors
        };
    }
}

export default apiError;