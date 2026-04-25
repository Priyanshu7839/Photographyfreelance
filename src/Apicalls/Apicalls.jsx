import axios from 'axios'


const api = axios.create({
  // baseURL:
    // "https://photographyfreelancebackend.onrender.com",
   baseURL: "http://localhost:8002",
});


export const CreateClient = async(name,email,role,password,location,date,eventName)=>{
    try {
        const response = await api.post('/upload/createClient',{
          name:name,
          email:email,
          date:date,
          location:location,
          role:role,
          password:password,
          eventName:eventName

        })
        return response
    } catch (error) {
        console.log(error)
        return error.response
    }
}



const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadMultipartFile(file, clientId, variantType,onProgress) {
  try {
    // 1️⃣ Start multipart session
    const startRes = await api.post("/upload/multipart/start", {
      fileName: file.name,
      fileType: file.type,
    });

    const { uploadId, key } = startRes.data;

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    const parts = [];

    // 2️⃣ Upload parts sequentially
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const blob = file.slice(start, end);

      // Get signed URL for this part
      const urlRes = await api.post("/upload/multipart/sign-part", {
        key,
        uploadId,
        partNumber,
      });

      const { url } = urlRes.data;
      console.log(url)

      // Upload chunk to R2 (this must NOT use api instance)
      const uploadRes = await axios.put(url, blob, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      console.log(uploadRes)

      const etag = uploadRes.headers.etag;

      parts.push({
        ETag: etag,
        PartNumber: partNumber,
      });

      console.log(`Uploaded part ${partNumber}/${totalParts}`);

       if (onProgress) {
        onProgress({
          uploadedParts: partNumber,
          totalParts,
          percent: Math.round((partNumber / totalParts) * 100),
        });
      }
    }
    console.log(key)

    

    // 3️⃣ Complete multipart upload
    await api.post("/upload/multipart/complete", {
      key,
      uploadId,
      parts,
    });

    console.log(key)

    // 4️⃣ Save file metadata in DB
    await api.post("/upload/savetoDb", {
      key,
      name: file.name,
      size: file.size,
      mediaType: file.type.startsWith("video") ? "video" : "image",
      variantType,
      clientId,
    });

    console.log(file.type.startsWith("video") ? "video" : "image")

    console.log(key)

    console.log("Upload completed and saved to DB");

  } catch (err) {
    console.error("Multipart upload failed:", err.response?.data || err.message);
     throw err;
  }
}


export async function GetClients (){
    try {
        const res = await api.get('/upload/clients')
        return res
    } catch (error) {
        console.log('Client Fetch Failed')
         throw error;
    }
}

export async function getSize (clientId){
    
try {
        const res = await api.post('/upload/getsize',{
            clientId:clientId
        })
       
        return res
    } catch (error) {
        console.log('Size Fetch Failed')
         return error.response
    }
}




export async function getPreview(key) {
    try {
        const res = await api.post('/upload/getpreviewurl',{
            key:key
        })
       
        return res
    } catch (error) {
        console.log('Preview Fetch Failed')
         return error.response
    }
}


export const attachPreviewUrls = async (files) => {
  try {
    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        const res = await api.post(`/upload/getpreviewurl`,{
          key:file.storage_key
        });
       

        return {
          ...file,
          url: res.data,
        };
      })
    );

    return updatedFiles;
  } catch (err) {
    console.error("Error attaching preview URLs:", err);
    return files; // fallback
  }
};


export async function getClientImages(clientId) {

   
     try {
        const res = await api.post('/upload/getclientimages',{
            clientId:clientId
        })
       
        return res
    } catch (error) {
        console.log('Client Images Fetch Failed')
         return error.response
    }
}

export async function getHomepagemages(page,filter) {

   
     try {
        const res = await api.get(`/upload/homepageimages?page=${page}&limit=6&variant_type=${filter}`)
       
        return res
    } catch (error) {
        console.log('Client Images Fetch Failed')
         return error.response
    }
}



export async function getClientData(clientId) {
  try {
    const res = await api.post('/upload/getClientData',{
      clientId:clientId
    })
    return res
  } catch (error) {
     console.log('Client Data Fetch Failed')
         return error.response
  }
}

export async function SelectImage(imageId) {
  try {
    const res = await api.post('/upload/selectImage',{
      id:imageId
    })
    return res
  } catch (error) {
    console.log('Selected Failed')
    return error.response
  }
}

export async function uploadMultipartFileHomepage(file, clientId, variantType,onProgress) {
  try {
    // 1️⃣ Start multipart session
    const startRes = await api.post("/upload/multipart/start", {
      fileName: file.name,
      fileType: file.type,
    });

    const { uploadId, key } = startRes.data;

    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    const parts = [];

    // 2️⃣ Upload parts sequentially
    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const blob = file.slice(start, end);

      // Get signed URL for this part
      const urlRes = await api.post("/upload/multipart/sign-part", {
        key,
        uploadId,
        partNumber,
      });

      const { url } = urlRes.data;
      console.log(url)

      // Upload chunk to R2 (this must NOT use api instance)
      const uploadRes = await axios.put(url, blob, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      console.log(uploadRes)

      const etag = uploadRes.headers.etag;

      parts.push({
        ETag: etag,
        PartNumber: partNumber,
      });

      console.log(`Uploaded part ${partNumber}/${totalParts}`);

       if (onProgress) {
        onProgress({
          uploadedParts: partNumber,
          totalParts,
          percent: Math.round((partNumber / totalParts) * 100),
        });
      }
    }
    console.log(key)

    

    // 3️⃣ Complete multipart upload
    await api.post("/upload/multipart/complete", {
      key,
      uploadId,
      parts,
    });

    console.log(key)

    // 4️⃣ Save file metadata in DB
    await api.post("/upload/savetoDbhomepage", {
      key,
      mediaType: file.type.startsWith("video") ? "video" : "image",
      variantType,
    });

    console.log(file.type.startsWith("video") ? "video" : "image")

    console.log(key)

    console.log("Upload completed and saved to DB");

  } catch (err) {
    console.error("Multipart upload failed:", err.response?.data || err.message);
     throw err;
  }
}

export async function sendenquiry(formdata){
  try {
    const res = await api.post('/upload/sendenquiry',{
      projectType: formdata.projectType,
    projectScope: formdata.projectScope,
    timeline: formdata.timeline,
    vision: formdata.vision,
    name: formdata.name,
    email: formdata.email,
    phone: formdata.phone,
    budget: formdata.budget,
    additionalDetails: formdata.additionalDetails
    })

    return res
  } catch (error) {
    return error.response
  }
}