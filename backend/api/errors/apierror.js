/* Abstracting Error codes to see: */
export default class ApiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static badRequest(msg) {
		return new ApiError(400, msg);
	}

	static internalError(msg) {
		return new ApiError(500, msg);
	}
}
