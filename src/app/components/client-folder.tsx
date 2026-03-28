import { motion } from "motion/react";
import { ArrowLeft, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ImageCard } from "../components/image-card";
import { FullscreenView } from "../components/fullscreen-view";
import { attachPreviewUrls, getClientData, getClientImages, SelectImage } from "../../Apicalls/Apicalls";

export function ClientFolder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"gallery" | "edited" | "raw" | "images" | "videos" | "selected">("gallery");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Mock client data
  // const clientData = {
  //   clientName: "Emily & James",
  //   eventDate: "October 15, 2025",
  //   location: "Napa Valley, CA",
  //   photographerName: "Sarah Chen",
  // };
  const {clientId} = useParams()


  

  // Gallery images
  // const galleryImages = [
  //   {
  //     id: "1",
  //     url: "https://filestorage.35cbfc65bfded3ac6edb95cd26fa5e24.r2.cloudflarestorage.com/uploads/1774681466804-download%20%281%29.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=c48cb9dd3639baccae9081905577c30b%2F20260328%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260328T070501Z&X-Amz-Expires=3600&X-Amz-Signature=e02664dfbf06ad61927a4907768095b3eb91b3207ce6675b577c3b07bf3c53a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //     photographerName: "Sarah Chen",
  //     albumName: "Ceremony Details",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "2",
  //     url: "https://filestorage.35cbfc65bfded3ac6edb95cd26fa5e24.r2.cloudflarestorage.com/uploads/1774570524409-Screen%20Recording%202026-03-25%20092556.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=c48cb9dd3639baccae9081905577c30b%2F20260328%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260328T070907Z&X-Amz-Expires=3600&X-Amz-Signature=240bd0dab44def4c26e409697b6c296872202f1d641612041d987b184fcfa38d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //     photographerName: "Sarah Chen",
  //     albumName: "Vows Exchange Video",
  //     mediaType: "video" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "3",
  //     url: "https://images.unsplash.com/photo-1700639491303-a177c4402501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0NDA5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Couple Portrait",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "4",
  //     url: "https://images.unsplash.com/photo-1767986012547-3fc29b18339f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzQ0OTA3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Reception",
  //     mediaType: "image" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "5",
  //     url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  //     photographerName: "Sarah Chen",
  //     albumName: "First Dance Video",
  //     mediaType: "video" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "6",
  //     url: "https://images.unsplash.com/photo-1579035234222-1af9dc733cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGUlMjBib3VxdWV0fGVufDF8fHx8MTc3NDQ5MTIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Bridal Bouquet",
  //     mediaType: "image" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "7",
  //     url: "https://images.unsplash.com/photo-1606203947280-002271a37eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBjbG9zZXVwfGVufDF8fHx8MTc3NDQ1NDk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Wedding Rings",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "8",
  //     url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  //     photographerName: "Sarah Chen",
  //     albumName: "Reception Highlights",
  //     mediaType: "video" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "9",
  //     url: "https://images.unsplash.com/photo-1766043372359-ac68712b415e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdm93cyUyMGVtb3Rpb25hbHxlbnwxfHx8fDE3NzQ0OTEyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Vow Exchange",
  //     mediaType: "image" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "10",
  //     url: "https://images.unsplash.com/photo-1770135005596-e2de4de3c583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGFuY2UlMjByb21hbnRpY3xlbnwxfHx8fDE3NzQ0Mjc4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "First Dance",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "11",
  //     url: "https://images.unsplash.com/photo-1773745060497-4cc1df774c72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudUUlMjBkZWNvcmF0ZWR8ZW58MXx8fHwxNzc0NDkxMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Venue Decoration",
  //     mediaType: "image" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "12",
  //     url: "https://images.unsplash.com/photo-1619905155368-47500f5fa2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwc3Vuc2V0fGVufDF8fHx8MTc3NDQ5MTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Sunset Portrait",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "13",
  //     url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  //     photographerName: "Sarah Chen",
  //     albumName: "Ceremony Entrance",
  //     mediaType: "video" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "14",
  //     url: "https://images.unsplash.com/photo-1758810410390-d34074d7751b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZ3Vlc3RzJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzc0NDI3OTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Guest Celebration",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  //   {
  //     id: "15",
  //     url: "https://images.unsplash.com/photo-1584158531319-96912adae663?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0NDAxMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Wedding Cake",
  //     mediaType: "image" as const,
  //     category: "raw" as const,
  //   },
  //   {
  //     id: "16",
  //     url: "https://images.unsplash.com/photo-1677768061409-3d4fbd0250d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc3NDQwMTIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  //     photographerName: "Sarah Chen",
  //     albumName: "Table Setting",
  //     mediaType: "image" as const,
  //     category: "edited" as const,
  //   },
  // ];


  const [galleryImages,setgalleryImages] = useState([])
  const [clientData,setclientData] = useState({})


  const fetchData = async() => {
     const response  =await getClientImages(clientId)
      const files = await attachPreviewUrls(response.data)
      console.log(files)
      setgalleryImages(files)
  } 

  useEffect(()=>{
    const GetData = async() => {

      const client =await getClientData(clientId)
      setclientData(client.data?.[0])




     
    }


    fetchData()
    GetData()
  },[])



  // Filter images based on active tab
  const getFilteredImages = () => {
    switch (activeTab) {
      case "gallery":
        return galleryImages; // Show all
      case "edited":
        return galleryImages.filter((img) => img.variant_type === "edited");
      case "raw":
        return galleryImages.filter((img) => img.variant_type === "raw");
      case "images":
        return galleryImages.filter((img) => img.media_type === "image");
      case "videos":
        return galleryImages.filter((img) => img.media_type === "video");
      case "selected":
        return []; // Empty for now
      default:
        return galleryImages;
    }
  };

  const filteredImages = getFilteredImages();

  const selectImages = async(id) => {
   const res =  await SelectImage(id)
    console.log('hello')
    fetchData()
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between gap-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="text-xl tracking-tight text-black">Timeless</div>
          
          <div className="relative">
            <button
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Photographer Details Dropdown */}
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
                className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg p-4"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-sm text-black mt-1">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm text-black mt-1">sarah@timeless.photo</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-black mt-1">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-black mt-1">Los Angeles, CA</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/login")}
                      className="text-xs text-gray-600 hover:text-black transition-colors rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div> 
      </div>

      {/* Client Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl mb-2 text-black">{clientData.name}</h1>
            <p className="text-gray-600">
              {clientData.event_date} • {clientData.event_location}
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-8 mt-8">
            {(["gallery", "edited", "raw", "images", "videos", "selected"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {activeTab === "gallery" && (
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <ImageCard
                key={image.pk_id}
                image={image}
                index={index}
                onClick={() => setSelectedImageIndex(index)}
                selectImageclick={()=>selectImages(image.pk_id)}
              />
            ))}
          </div>
        )}
        {activeTab === "edited" && (
          <div className="grid grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
        {activeTab === "raw" && (
          <div className="grid grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
        {activeTab === "images" && (
          <div className="grid grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
        {activeTab === "videos" && (
          <div className="grid grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        )}
        {activeTab === "selected" && (
          <div className="text-center py-16 text-gray-500">
            Selected images will appear here
          </div>
        )}
      </div>

      {/* Fullscreen View */}
      {selectedImageIndex !== null && (
        <FullscreenView
          images={galleryImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={(index) => setSelectedImageIndex(index)}
        />
      )}
    </div>
  );
}