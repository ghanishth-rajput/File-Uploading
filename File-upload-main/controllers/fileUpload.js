 const File = require("../models/File");
 const cloudinary = require("cloudinary").v2;
 //localfileupload -> handler function

 exports.localFileUpload = async (req,res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File aa gyi jee -> ",file);

        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        file.mv(path , (err) => {
            console.log(err);

        });

        res.json({
            success:true,
            message:'Local file uploaded successfully',
        })
    }
    catch(error) {
        console.log(error);
    }
 }

 function isFileTypeSupported(type,supportedTypes){

    return supportedTypes.includes(type);
 }

 async function uploadFileToCloudinary(file,folder,quality){

    const options ={folder};

    if(quality){

        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
 }

 //image upload ka handler

 exports.imageUpload = async (req,res) =>{
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }

        //file format supported hai

        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // //db me entry save nhi karni hai
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        })

    }
    catch(error){

        console.log(error);

    }

}

exports.videoUpload = async (req,res) => {

    try{

        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

         //validation
         const supportedTypes = ["mp4","mov"];
         const fileType = file.name.split('.')[1].toLowerCase();

         //hw: add a upper limit of 5 mb per video
 
         if(!isFileTypeSupported(fileType,supportedTypes)){
 
             return res.status(400).json({
                 success:false,
                 message:"file format not supported",
             })
         }

         //file format supported hai

        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        // //db me entry save nhi karni hai
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video successfully uploaded"
        })

 
    }

    catch(error){

        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })      
    }

}

exports.imageSizeReducer = async (req,res) =>{

    try{

        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }

        //file format supported hai

        const response = await uploadFileToCloudinary(file, "Codehelp",30);
        console.log(response);

        // //db me entry save nhi karni hai
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        })


    }

    catch(error){

        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })     


    }
}