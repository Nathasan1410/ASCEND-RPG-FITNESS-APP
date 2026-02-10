# API Reference

Reference for ASCEND's API endpoints.

## Authentication

All API requests require authentication via Supabase Auth.

```typescript
// Get auth token
const { data, error } = await supabase.auth.getSession();
const token = data.session?.access_token;

// Use in requests
const response = await fetch('/api/quests', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

## Quests API

### Generate Quest

```http
POST /api/quests/generate
```

**Request Body:**
```json
{
  "duration": 30,
  "equipment": "bodyweight",
  "goals": "cardio"
}
```

**Response:**
```json
{
  "id": "quest_abc123",
  "rank": "C",
  "class": "Striker",
  "duration": 30,
  "xp": 800,
  "exercises": [...]
}
```

### Get User Quests

```http
GET /api/quests?limit=10&offset=0
```

**Response:**
```json
{
  "quests": [...],
  "total": 45,
  "page": 1,
  "pages": 5
}
```

### Complete Quest

```http
POST /api/quests/:id/complete
```

**Request Body:**
```json
{
  "proofUrl": "https://...",
  "notes": "Felt great!"
}
```

**Response:**
```json
{
  "questId": "quest_abc123",
  "formScore": 0.92,
  "effortScore": 0.88,
  "consistencyScore": 0.85,
  "overallScore": 0.88,
  "grade": "A",
  "multiplier": 1.3,
  "baseXP": 800,
  "finalXP": 1040
}
```

## Users API

### Get User Profile

```http
GET /api/users/profile
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@test.com",
  "xp": 15000,
  "level": 45,
  "rank": "B",
  "class": "Striker"
}
```

### Update User Settings

```http
PUT /api/users/settings
```

**Request Body:**
```json
{
  "class": "Assassin",
  "privacy": {
    "publicProfile": true,
    "publicCompletions": false
  }
}
```

## Leaderboards API

### Get Global Leaderboard

```http
GET /api/leaderboards/global?limit=50
```

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user_001",
      "username": "shadowhunter",
      "xp": 245000,
      "level": 95,
      "hunterRank": "S"
    },
    ...
  ]
}
```

### Get Rank-Specific Leaderboard

```http
GET /api/leaderboards/rank/:rank?limit=20
```

## Social API

### Get Feed

```http
GET /api/feed?type=global&limit=20
```

**Response:**
```json
{
  "feed": [
    {
      "type": "quest_complete",
      "userId": "user_123",
      "questId": "quest_abc",
      "grade": "S",
      "xp": 6750,
      "timestamp": "2026-02-11T14:30:00Z"
    },
    ...
  ]
}
```

### Give Kudos

```http
POST /api/social/kudos
```

**Request Body:**
```json
{
  "userId": "user_123",
  "questId": "quest_abc"
}
```

## Error Responses

All endpoints return consistent error format:

```json
{
  "error": {
    "code": "QUEST_NOT_FOUND",
    "message": "Quest not found",
    "details": {...}
  }
}
```

**Common Error Codes:**

| Code | Description |
| ---- | ----------- |
| `UNAUTHORIZED` | Invalid or missing auth token |
| `QUEST_NOT_FOUND` | Quest ID doesn't exist |
| `INVALID_INPUT` | Request validation failed |
| `RATE_LIMITED` | Too many requests |

[Learn about Contributing →](./contributing.md)

---

*Last Updated: February 11, 2026*
