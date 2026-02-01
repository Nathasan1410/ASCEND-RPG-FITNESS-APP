import { useState, useRef, ChangeEvent } from "react";
import { SystemButton } from "@/components/ui/SystemButton";
import { Camera, Upload, X, CheckCircle, AlertTriangle } from "lucide-react";
import { uploadProof } from "@/lib/supabase/storage";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";

interface ProofUploadProps {
  userId: string;
  questId: string; // Used as logId precursor
  type: "photo" | "video";
  onUploadComplete: (url: string) => void;
  required?: boolean;
}

export function ProofUpload({ userId, questId, type, onUploadComplete, required = false }: ProofUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Basic validation
    if (type === "photo" && !selected.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }
    if (type === "video" && !selected.type.startsWith("video/")) {
      toast.error("Invalid file type. Please upload a video.");
      return;
    }
    
    // Size limit (e.g., 50MB for video, 5MB for photo)
    const maxSize = type === "video" ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (selected.size > maxSize) {
      toast.error(`File too large. Max ${type === "video" ? "50MB" : "5MB"}.`);
      return;
    }

    setFile(selected);
    
    // Create preview
    if (type === "photo") {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreview(URL.createObjectURL(selected)); // Video preview
    }
    
    // Reset upload state if re-selecting
    setUploadedUrl(null); 
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Use questId + timestamp as unique log ID for storage path
      // In a real flow we might create the Log row first, but here we upload first to get URL
      const tempLogId = `${questId}_${Date.now()}`; 
      
      const url = await uploadProof(file, userId, tempLogId, type);
      
      setUploadedUrl(url);
      onUploadComplete(url);
      toast.success("Evidence uploaded successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Check connection.");
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn(
      "border border-dashed rounded-lg p-6 text-center transition-all",
      uploadedUrl 
        ? "border-system-cyan/50 bg-system-cyan/5" 
        : "border-white/10 hover:border-white/20 bg-void-panel/50",
      required && !uploadedUrl && "border-status-flagged/50"
    )}>
      
      {!file ? (
        <div 
          className="flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            {type === "video" ? <Camera className="w-6 h-6 text-system-cyan" /> : <Upload className="w-6 h-6 text-system-cyan" />}
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wide">
              {type === "video" ? "Record Proof" : "Upload Evidence"}
            </p>
            <p className="text-xs text-white/40 mt-1">
              {required ? "(REQUIRED) " : "(Optional) "}
              {type === "video" ? "MP4, MOV up to 50MB" : "JPG, PNG up to 5MB"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview Area */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 max-h-48 mx-auto w-full max-w-xs">
            {type === "photo" ? (
              <img src={preview!} alt="Proof preview" className="w-full h-full object-cover" />
            ) : (
              <video src={preview!} className="w-full h-full object-cover" controls />
            )}
            
            {!uploadedUrl && (
              <button 
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-status-danger transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          {/* Action Area */}
          {uploadedUrl ? (
            <div className="flex items-center justify-center gap-2 text-system-cyan font-mono text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>EVIDENCE SECURED</span>
            </div>
          ) : (
            <SystemButton 
              onClick={handleUpload} 
              disabled={uploading}
              className="w-full"
              glow
            >
              {uploading ? "Transmitting..." : "Confirm Upload"}
            </SystemButton>
          )}
        </div>
      )}

      <input 
        ref={fileInputRef}
        type="file"
        accept={type === "video" ? "video/*" : "image/*"}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
