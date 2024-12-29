class ApiResponse {
    constructor(statusCade,data,message="Success") {
        this.statusCade=statusCade,
        this.data=data,
        this.message=message,
        this.success=statusCade<400
    }
}

export {ApiResponse}