"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, AlertTriangle, CheckCircle, FileIcon, ImageIcon, Music, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  validateFile, 
  sanitizeFilename, 
  FileValidationResult,
  FILE_SIZE_LIMITS 
} from '@/lib/security/file-validation';

interface SecureFileUploadProps {
  accept: 'image' | 'audio' | 'video';
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
  onValidationResults?: (results: FileValidationResult[]) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

interface FileWithValidation {
  file: File;
  validation: FileValidationResult;
  preview?: string;
  id: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.startsWith('audio/')) return Music;
  if (type.startsWith('video/')) return Video;
  return FileIcon;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function SecureFileUpload({
  accept,
  multiple = false,
  maxFiles = 1,
  onFilesChange,
  onValidationResults,
  className,
  disabled = false,
  placeholder,
}: SecureFileUploadProps) {
  const [files, setFiles] = useState<FileWithValidation[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    switch (accept) {
      case 'image':
        return 'image/jpeg,image/png,image/webp,image/gif';
      case 'audio':
        return 'audio/mpeg,audio/wav,audio/flac,audio/aac';
      case 'video':
        return 'video/mp4,video/webm,video/quicktime';
      default:
        return '';
    }
  };

  const getMaxFileSize = () => {
    switch (accept) {
      case 'image':
        return FILE_SIZE_LIMITS.IMAGE;
      case 'audio':
        return FILE_SIZE_LIMITS.AUDIO;
      case 'video':
        return FILE_SIZE_LIMITS.VIDEO;
      default:
        return FILE_SIZE_LIMITS.IMAGE;
    }
  };

  const createPreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const validateAndProcessFiles = async (newFiles: File[]) => {
    setIsValidating(true);
    
    const processedFiles: FileWithValidation[] = [];
    const validationResults: FileValidationResult[] = [];

    for (const file of newFiles) {
      // Sanitize filename
      const sanitizedName = sanitizeFilename(file.name);
      const sanitizedFile = new File([file], sanitizedName, { type: file.type });

      // Validate file
      const validation = await validateFile(sanitizedFile, accept);
      validationResults.push(validation);

      // Create preview if it's an image
      const preview = await createPreview(sanitizedFile);

      processedFiles.push({
        file: sanitizedFile,
        validation,
        preview,
        id: `${Date.now()}-${Math.random()}`,
      });
    }

    // Update files state
    const updatedFiles = multiple 
      ? [...files, ...processedFiles].slice(0, maxFiles)
      : processedFiles.slice(0, 1);

    setFiles(updatedFiles);
    setIsValidating(false);

    // Notify parent components
    const validFiles = updatedFiles
      .filter(f => f.validation.isValid)
      .map(f => f.file);
    
    onFilesChange(validFiles);
    onValidationResults?.(updatedFiles.map(f => f.validation));
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return;

    const fileArray = Array.from(selectedFiles);
    
    // Check file count limit
    if (!multiple && fileArray.length > 1) {
      fileArray.splice(1);
    }
    
    if (multiple && files.length + fileArray.length > maxFiles) {
      fileArray.splice(maxFiles - files.length);
    }

    validateAndProcessFiles(fileArray);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [disabled, files.length, maxFiles, multiple]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(f => f.id !== id);
    setFiles(updatedFiles);
    
    const validFiles = updatedFiles
      .filter(f => f.validation.isValid)
      .map(f => f.file);
    
    onFilesChange(validFiles);
    onValidationResults?.(updatedFiles.map(f => f.validation));
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer',
          isDragOver && !disabled
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptString()}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              {placeholder || `Upload ${accept} file${multiple ? 's' : ''}`}
            </p>
            <p className="text-xs text-muted-foreground">
              Drag and drop or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {formatFileSize(getMaxFileSize())}
              {multiple && ` • Max files: ${maxFiles}`}
            </p>
          </div>
        </div>

        {isValidating && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Validating files...</p>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileWithValidation) => {
            const { file, validation, preview, id } = fileWithValidation;
            const FileIconComponent = getFileIcon(file.type);

            return (
              <div
                key={id}
                className={cn(
                  'flex items-center space-x-3 p-3 border rounded-lg',
                  validation.isValid
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                )}
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {preview ? (
                    <img
                      src={preview}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                      <FileIconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                    {validation.metadata?.dimensions && (
                      <span> • {validation.metadata.dimensions.width}×{validation.metadata.dimensions.height}</span>
                    )}
                  </p>
                  
                  {/* Validation Status */}
                  <div className="flex items-center space-x-1 mt-1">
                    {validation.isValid ? (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Invalid
                      </Badge>
                    )}
                    
                    {validation.warnings.length > 0 && (
                      <Badge variant="outline" className="text-xs text-yellow-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {validation.warnings.length} warning{validation.warnings.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(id);
                  }}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Validation Errors */}
      {files.some(f => f.validation.errors.length > 0) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {files.map((f, index) => 
                f.validation.errors.map((error, errorIndex) => (
                  <div key={`${index}-${errorIndex}`}>
                    <strong>{f.file.name}:</strong> {error}
                  </div>
                ))
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Validation Warnings */}
      {files.some(f => f.validation.warnings.length > 0) && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {files.map((f, index) => 
                f.validation.warnings.map((warning, warningIndex) => (
                  <div key={`${index}-${warningIndex}`}>
                    <strong>{f.file.name}:</strong> {warning}
                  </div>
                ))
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
