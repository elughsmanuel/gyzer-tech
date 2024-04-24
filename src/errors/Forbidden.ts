import { StatusCodes } from "http-status-codes";

class Forbidden extends Error {
    statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.name = 'Forbidden';
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

export default Forbidden;
