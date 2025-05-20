# User Registration Workflow

## Overview

This document outlines the process for new user registration on the Its Different Productions platform. The registration process includes account creation, email verification, and initial profile setup.

## Actors

- **User** - The person registering for an account
- **System** - The Its Different Productions platform
- **Supabase Auth** - Authentication service

## Preconditions

- User has access to the registration page
- User has a valid email address
- Registration is open and available

## Steps

### 1. User Initiates Registration

- User navigates to the registration page
- System displays the registration form with the following fields:
  - Full Name
  - Email Address
  - Password
  - Confirm Password

### 2. User Submits Registration Form

- User completes the registration form
- System validates the form data:
  - Email is in valid format
  - Password meets security requirements (min 8 chars, uppercase, lowercase, number)
  - Passwords match
  - Email is not already registered
- If validation fails, system displays appropriate error messages
- If validation passes, system proceeds to account creation

### 3. Account Creation

- System creates a new user account in Supabase Auth
- System creates corresponding records in the `users` and `profiles` tables
- System sets the user's role to 'customer'
- System generates a verification email

### 4. Email Verification

- System sends a verification email to the user's email address
- User receives the email and clicks the verification link
- System verifies the email and marks the account as verified
- If verification expires, user can request a new verification email

### 5. Initial Profile Setup

- After verification, user is redirected to the profile setup page
- User is prompted to complete their profile with optional information:
  - Profile picture
  - Username
  - Bio
  - Website
  - Social media links
- User can skip this step and complete it later

### 6. Welcome and Onboarding

- System displays a welcome message
- System provides a brief tour of the platform features
- User is directed to the dashboard or home page

## Postconditions

- User has a verified account
- User record exists in the database
- User can log in to the platform
- User has completed or skipped initial profile setup

## Error Handling

### Email Already Registered

- System informs the user that the email is already registered
- System provides options to:
  - Log in with the existing account
  - Reset password if they forgot it
  - Use a different email address

### Verification Email Not Received

- User can request a resend of the verification email
- System provides troubleshooting tips (check spam folder, etc.)
- System offers alternative verification methods if needed

### Invalid Registration Data

- System highlights fields with invalid data
- System provides specific error messages for each validation failure
- System preserves valid data to avoid re-entry

## Security Considerations

- Passwords are never stored in plain text
- Registration form is protected against CSRF attacks
- Rate limiting is applied to prevent abuse
- Email verification is required before full account access
- Personal data is handled according to privacy policy

## Related Workflows

- [User Authentication](./user-authentication.md)
- [Profile Management](./profile-management.md)
- [Password Reset](./password-reset.md)
