class apiResponse 
{
    statusCode: number;
    message: string;
    data: any;
    success: boolean;

    constructor(
        statusCode: number,
        message: string,
        data: any
    )
    {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }

    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        };
    }
}

export default apiResponse;