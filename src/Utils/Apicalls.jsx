import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8002",
  baseURL: "https://photographyfreelancebackend.onrender.com",
  withCredentials: true,
});


export const logout =
  async () => {
    try {
      const response =
        await api.post(
          "/auth/logout"
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Logout failed"
      );
    }
  };

export const getHomepageFolders =
  async () => {
    try {
      const response =
        await api.get(
          "/homepage/folders"
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch folders"
      );
    }
  };

export const loginUser = async (data) => {
  try {
    const response = await api.post(
      "/auth/login",
      data
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

export const getWorkflowTemplates = async () => {
  try {
    const response = await api.get(
      "/client/templates"
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch workflow templates"
    );
  }
};

export const getWorkflowSteps = async (
  templateId
) => {
  try {
    const response = await api.get(
      `/client/templates/${templateId}/steps`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch workflow steps"
    );
  }
};

export const getTeamMembers = async () => {
  try {
    const response = await api.get(
      "/client/team-members"
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch team members"
    );
  }
};

export const createClient = async (data) => {
  try {
    const response = await api.post(
      "/client/create-client",
      data
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to create client"
    );
  }
};


export const getDashboardClients = async () => {
  try {
    const response = await api.get(
      "/client/dashboard"
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch clients"
    );
  }
};

export const getClientHeader = async (
  clientId
) => {

  try {
    const response = await api.get(
      `/project/${clientId}`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch client"
    );
  }
};

export const updateWorkflowStatus = async (
  clientId,
  action,
  step_id
) => {
  try {
    const response = await api.post(
      `/project/${clientId}/workflow-action/${step_id}`,
      {
        action,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to update workflow"
    );
  }
};

export const getClientOverview = async (
  clientId
) => {
  try {
    const response = await api.get(
      `/project/${clientId}/overview`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch overview"
    );
  }
};

export const getClientWorkflow = async (
  clientId
) => {
  try {
    const response = await api.get(
      `/project/${clientId}/workflow`
    );
console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch workflow"
    );
  }
};

export const addMoodboardDiscussion =
  async (
    clientId,
    message
  ) => {
    try {
      const response =
        await api.post(
          `/project/${clientId}/moodboard/discussion`,
          {
            message,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to send message"
      );
    }
  };

  export const getMoodboardDiscussions =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `/project/${clientId}/moodboard/discussions`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch discussions"
      );
    }
  };


  export const updateClientNotes =
  async (
    clientId,
    client_notes
  ) => {
    try {
      const response =
        await api.put(
          `/project/${clientId}/moodboard/notes`,
          {
            client_notes,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to update notes"
      );
    }
  };

  export const getClientNotes =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `/project/${clientId}/moodboard/notes`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch notes"
      );
    }
  };

  export const addMoodboardSong =
  async (
    clientId,
    song_name
  ) => {
    try {
      const response =
        await api.post(
          `/project/${clientId}/moodboard/song`,
          {
            song_name,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to add song"
      );
    }
  };

  export const getMoodboardSongs =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `/project/${clientId}/moodboard/songs`
        );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch songs"
      );
    }
  };

  export const deleteMoodboardSong =
  async (
    clientId,
    songId
  ) => {
    try {
      const response =
        await api.delete(
          `/project/${clientId}/moodboard/song/${songId}`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to delete song"
      );
    }
  };

  export const getAllGears =
  async () => {
    try {
      const response =
        await api.get(
          "/project/gears"
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch gears"
      );
    }
  };


  export const getProductionSetup =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `/project/${clientId}/production-setup`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch production setup"
      );
    }
  };

  export const assignGears =
  async (
    clientId,
    gears_using
  ) => {
    try {
      const response =
        await api.post(
          `/project/${clientId}/assign-gears`,
          {
            gears_using,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to assign gears"
      );
    }
  };

  export const getProductionOverview =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `/project/${clientId}/production-overview`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch production overview"
      );
    }
  };

  export const getHomepageFolderImages =
  async (
    variantType
  ) => {
    try {
      const response =
        await api.get(
          `/homepage/folders/${
            variantType
          }`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch folder images"
      );
    }
  };

  const CHUNK_SIZE = 10 * 1024 * 1024; 

  export async function uploadMultipartFileClientassets(file, clientId, variantType,onProgress,vendorshared) {
console.log(file.name)
console.log(file)
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
    await api.post("/homepage/saveclientassets", {
   
     clientId:clientId
      ,key:key
      , name:file.name
      , size:file.size
      , mediaType:file.type.startsWith("video") ? "video" : "image"
      , variantType:variantType
      ,vendorshared :vendorshared
    });

    console.log(file.type.startsWith("video") ? "video" : "image")

    console.log(key)

    console.log("Upload completed and saved to DB");

    if (onProgress) {
  onProgress({
    uploadedParts:
      totalParts,
    totalParts,
    percent: 100,
    status: "done",
  });
}

  } catch (err) {
    console.error("Multipart upload failed:", err.response?.data || err.message);
     throw err;
  }
}

export const clientLogin =
  async (
    email,
    password
  ) => {
    try {
      const response =
        await api.post(
          "/auth/client/login",
          {
            email,
            password,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  export const getClientAssets =
  async (
    clientId,
    page = 1,
    fileCategory = "all"
  ) => {
    try {
      const response =
        await api.get(
          `/client/${clientId}/assets`,
          {
            params: {
              page,
              fileCategory,
            },
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch assets"
      );
    }
  };

  export const adressautocomplete = async(word) => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${word}&limit=5&format=json&apiKey=2528215eabdd440ab41c804a5ec52309`)
      return response
    } catch (error) {
      return error.response
    }
  }

  export const addTravelDiscussion =
  async (
    clientId,
    message
  ) => {
    try {
      const response =
        await api.post(
          `project/travel-discussions/${clientId}`,
          {
            message,
          }
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to send message"
      );
    }
  };

  export const getTravelDiscussions =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `project/travel-discussions/${clientId}`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch travel discussions"
      );
    }
  };

  export const getTravelData =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `project/travel-data/${clientId}`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch travel data"
      );
    }
  };

  export const getMoodboardAssets =
  async (clientId) => {
    try {
      const response =
        await api.get(
          `project/moodboard-assets/${clientId}`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to fetch moodboard assets"
      );
    }
  };

  export const downloadFile =
  async (fileId) => {
    try {
      const response =
        await api.get(
          `project/download/${fileId}`
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Download failed"
      );
    }
  };

  export const updateClient =
  async (
    clientId,
    clientData
  ) => {
    try {
      const response =
        await api.put(
          `client/updateclients/${clientId}`,
          clientData
        );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data
          ?.message ||
          "Failed to update client"
      );
    }
  };