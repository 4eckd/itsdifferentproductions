# Beat Upload Workflow

## Overview

This document outlines the process for uploading and publishing beats on the Its Different Productions platform. The workflow covers file upload, metadata entry, licensing options, and publication.

## Actors

- **Producer** - The user uploading the beat
- **System** - The Its Different Productions platform
- **Admin** - Platform administrators (for moderation if required)

## Preconditions

- User is authenticated and has a verified account
- User has the necessary permissions to upload beats
- User has a beat file ready for upload (MP3 or WAV format)

## Steps

### 1. Initiate Beat Upload

- User navigates to the beat upload page
- System displays the beat upload form
- User selects the beat file from their device

### 2. File Validation and Processing

- System validates the file:
  - File type (MP3 or WAV only)
  - File size (maximum 50MB)
  - Audio quality checks (if implemented)
- System uploads the file to Supabase Storage
- System processes the audio file:
  - Extracts duration
  - Generates waveform data (if implemented)
  - Creates preview snippet (if implemented)

### 3. Metadata Entry

- User enters beat metadata:
  - Title
  - Description
  - Genre
  - BPM (Beats Per Minute)
  - Key
  - Tags
  - Mood
  - Instruments used
- User indicates if samples were used and if they are cleared
- User uploads cover image (optional)

### 4. Licensing and Pricing

- User selects available license types:
  - Basic License
  - Premium License
  - Exclusive License
- User sets pricing for each license type
- User specifies if stems are available
- User sets any usage restrictions

### 5. Preview and Submission

- System displays a preview of the beat listing
- User reviews all information
- User submits the beat for publication
- System saves all data to the database

### 6. Moderation (if required)

- If moderation is enabled:
  - Beat is marked as "pending review"
  - Admin reviews the beat for compliance with platform policies
  - Admin approves or rejects the beat
- If moderation is not required, beat is automatically published

### 7. Publication

- System marks the beat as "published"
- Beat appears in the store and search results
- System notifies the user that their beat is live

## Postconditions

- Beat is stored in the database and storage
- Beat is available for purchase (if approved)
- User can manage the beat from their dashboard

## Error Handling

### File Upload Failures

- System provides clear error messages for upload failures
- System suggests troubleshooting steps (reduce file size, check format)
- User can retry the upload without re-entering metadata

### Metadata Validation Errors

- System highlights fields with invalid data
- System provides specific error messages for each validation failure
- System preserves valid data to avoid re-entry

### Storage or Database Errors

- System logs detailed error information
- User receives a friendly error message
- System provides option to retry or contact support

## Security Considerations

- File uploads are scanned for malware
- File types are strictly validated
- User must be authenticated to upload
- Rate limiting prevents abuse
- Copyright information is recorded

## Technical Implementation

### File Storage Structure

Beats are stored in the `audio_files` bucket with the following path structure:
```
audio_files/{user_id}/{timestamp}-{filename}
```

### Database Records

When a beat is uploaded, the following records are created:
1. A record in the `products` table with `category: 'beat'`
2. A record in the `beats` table with beat-specific details

### Waveform Generation

If implemented, waveform data is generated using the following process:
1. Audio file is processed to extract amplitude data
2. Data is normalized and sampled at regular intervals
3. Resulting data is stored as JSON in the `waveform_data` field

## Related Workflows

- [Content Moderation](./content-moderation.md)
- [Beat Licensing](./beat-licensing.md)
- [Product Management](./product-management.md)
