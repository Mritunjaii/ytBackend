const asyncHandler= (func) =>{
    return Promise.resolve(func(req,res,next)).catch((err)=>next(err))
}

export {asyncHandler}