const uploadImage = async(req, res)=>{
    try {
        // check file is missing 
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"File is required! PLease uplaod a file"
            })
        }
        // upload to cloudinary 
        // const 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"
        })
        
    }
}