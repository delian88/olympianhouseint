import * as React from "react";
import { Upload } from "lucide-react";

import { Button } from "./button";
import { cn } from "../../lib/utils";

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

    React.useEffect(() => {
      setPreviewUrl(value || "");
    }, [value]);

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

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

    return (
      <div className={cn("flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4", className)}>
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-background">
            {previewUrl ? (
              accept?.includes("video") || previewUrl.startsWith("data:video") || previewUrl.endsWith(".mp4") || previewUrl.endsWith(".webm") ? (
                <video src={previewUrl} className="h-full w-full object-cover" muted />
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
            <Button type="button" variant="outline" onClick={handleButtonClick} disabled={disabled} className="rounded-xl">
              {label}
            </Button>
            <p className="truncate text-sm text-muted-foreground">
              {value ? "Image selected" : "No file chosen"}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
