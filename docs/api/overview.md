# API Overview

The Its Different Productions API provides programmatic access to our platform's core functionality. Built on Supabase with TypeScript, our API offers a robust, type-safe interface for developers.

## 🚀 Base URL

```
Production: https://itsdifferentproductions.vercel.app/api
Staging: https://staging.itsdifferentproductions.vercel.app/api
```

## 🔐 Authentication

All API requests require authentication using Supabase Auth tokens.

### Getting Started

1. **Sign up** for an account on our platform
2. **Generate API key** in your dashboard settings
3. **Include the token** in your request headers

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     https://itsdifferentproductions.vercel.app/api/beats
```

### Authentication Methods

#### JWT Tokens (Recommended)
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Use the access_token for API requests
const token = data.session.access_token
```

#### API Keys (For Server-to-Server)
```javascript
const response = await fetch('/api/beats', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
```

## 📊 Rate Limiting

To ensure fair usage and platform stability:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **File uploads**: 50 uploads per hour

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📝 Request Format

### Content Types
- **JSON**: `application/json` (default)
- **Form Data**: `multipart/form-data` (for file uploads)
- **URL Encoded**: `application/x-www-form-urlencoded`

### Standard Headers
```
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
User-Agent: YourApp/1.0
```

## 📤 Response Format

All API responses follow a consistent structure:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-12-01T12:00:00Z",
    "version": "1.0"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "meta": {
    "timestamp": "2024-12-01T12:00:00Z",
    "version": "1.0"
  }
}
```

## 🔗 Core Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Beats
- `GET /api/beats` - List beats
- `GET /api/beats/:id` - Get beat details
- `POST /api/beats` - Upload new beat
- `PUT /api/beats/:id` - Update beat
- `DELETE /api/beats/:id` - Delete beat

### Merchandise
- `GET /api/merchandise` - List merchandise
- `GET /api/merchandise/:id` - Get product details
- `POST /api/merchandise` - Create product
- `PUT /api/merchandise/:id` - Update product
- `DELETE /api/merchandise/:id` - Delete product

### NFTs
- `GET /api/nfts` - List NFTs
- `GET /api/nfts/:id` - Get NFT details
- `POST /api/nfts` - Create NFT
- `PUT /api/nfts/:id` - Update NFT
- `DELETE /api/nfts/:id` - Delete NFT

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/orders` - Get order history
- `GET /api/users/wishlist` - Get wishlist

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

## 🔍 Query Parameters

### Pagination
```
?page=1&limit=20&offset=0
```

### Filtering
```
?genre=hip-hop&min_price=10&max_price=100
```

### Sorting
```
?sort=created_at&order=desc
```

### Search
```
?search=trap%20beat&fields=title,description
```

## 📁 File Uploads

### Beat Audio Files
```javascript
const formData = new FormData()
formData.append('audio', audioFile)
formData.append('title', 'My Beat')
formData.append('genre', 'hip-hop')

const response = await fetch('/api/beats', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
```

### Image Uploads
```javascript
const formData = new FormData()
formData.append('image', imageFile)
formData.append('alt', 'Beat cover art')

const response = await fetch('/api/upload/image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
```

## 🔔 Webhooks

Subscribe to real-time events:

### Available Events
- `order.created` - New order placed
- `order.completed` - Order completed
- `beat.uploaded` - New beat uploaded
- `user.registered` - New user registered

### Webhook Configuration
```javascript
{
  "url": "https://yourapp.com/webhooks/idp",
  "events": ["order.created", "order.completed"],
  "secret": "your_webhook_secret"
}
```

## 🛠️ SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @itsdifferentproductions/sdk
```

```javascript
import { IDPClient } from '@itsdifferentproductions/sdk'

const client = new IDPClient({
  apiKey: 'your_api_key',
  environment: 'production'
})

const beats = await client.beats.list()
```

### Python
```bash
pip install idp-python-sdk
```

```python
from idp_sdk import IDPClient

client = IDPClient(api_key='your_api_key')
beats = client.beats.list()
```

## 📚 Code Examples

### Fetch Beats with Filtering
```javascript
const response = await fetch('/api/beats?genre=hip-hop&bpm_min=120&bpm_max=140', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

const { data } = await response.json()
console.log(data.beats)
```

### Create an Order
```javascript
const order = {
  items: [
    { product_id: 'beat_123', quantity: 1, license_type: 'basic' }
  ],
  shipping_address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94014'
  }
}

const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(order)
})
```

## 🚨 Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Server issue |

## 📞 Support

- **API Documentation**: [Full API Reference](./authentication.md)
- **Discord Community**: [Join our Discord](https://discord.gg/yourinvite)
- **GitHub Issues**: [Report API Issues](https://github.com/yourusername/itsdifferentproductions/issues)
- **Email**: api-support@itsdifferentproductions.com

---

**Next Steps:**
- [Authentication Guide](./authentication.md)
- [Database Schema](./database-schema.md)
- [File Upload Guide](./file-upload.md)
