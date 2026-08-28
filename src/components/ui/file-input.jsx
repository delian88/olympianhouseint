import * as React from "react";
import { Upload, FileText, ExternalLink } from "lucide-react";

import { Button } from "./button";
import { cn } from "../../lib/utils";
import { BASE_URL } from "../../lib/api";

const FileInput = React.forwardRef(
  (
    {
      className,
      label = "Choose file",
      value,
      accept,
      onChange,
      disabled,
      previewAlt = "Selected file preview",
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState(value || "");
    const [selectedFileName, setSelectedFileName] = React.useState("");

    React.useEffect(() => {
      setPreviewUrl(value || "");
      if (!value) setSelectedFileName("");
    }, [value]);

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setSelectedFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(event);
    };

    React.useEffect(() => {
      return () => {
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

    const isPdfOrDoc = accept?.includes(".pdf") || previewUrl?.endsWith(".pdf") || typeof value === 'string' && value.endsWith(".pdf");

    // Extract filename from URL if a new file hasn't just been selected
    const displayFileName = selectedFileName || (value && typeof value === 'string' ? value.split('/').pop() : "");

    const getViewerUrl = (url) => {
      if (url.includes('res.cloudinary.com') && url.endsWith('.pdf')) {
        return `${BASE_URL}/pdf-viewer?url=${encodeURIComponent(url)}`;
      }
      if (url.endsWith('.pdf')) {
        return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=false`;
      }
      return url;
    };

    return (
      <div className={cn("flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4", className)}>
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background">
            {previewUrl ? (
              accept?.includes("video") || previewUrl.startsWith("data:video") || previewUrl.endsWith(".mp4") || previewUrl.endsWith(".webm") ? (
                <video src={previewUrl} className="h-full w-full object-cover" muted />
              ) : isPdfOrDoc ? (
                <FileText className="h-8 w-8 text-muted-foreground" />
              ) : (
                <img src={previewUrl} alt={previewAlt} className="h-full w-full object-cover" />
              )
            ) : (
              <Upload className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              type="file"
              accept={accept}
              disabled={disabled}
              onChange={handleChange}
              className="hidden"
              {...props}
            />
            <Button type="button" variant="outline" onClick={handleButtonClick} disabled={disabled} className="rounded-xl shrink-0">
              {label}
            </Button>
            <div className="flex flex-col gap-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {displayFileName || "No file chosen"}
              </p>
              {value && typeof value === 'string' && (value.startsWith('http') || value.startsWith('/')) && (
                <a href={getViewerUrl(value)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#bb7422] hover:underline font-medium">
                  View document <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
