# MeatBar Analytics Backend

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the database:**
   This will read `data.csv` and populate the SQLite database (`meatbar.db`).
   ```bash
   npm run seed
   ```

## Running the Application

- **Development mode:**
  ```bash
  npm run dev
  ```

## API Endpoints

### GET /api/people
Returns a list of all people.

### GET /api/consumptions
Returns a list of all meat bar consumptions.

### POST /api/consumptions
Adds a new consumption record.
**Body:**
```json
{
  "person_id": 1,
  "type": "bison",
  "eaten_at": "2023-12-01T12:00:00Z"
}
```

### GET /api/streaks
Returns streaks of days where aggregate meat bar consumption increased day-over-day.
Example response:
```json
[
  {
    "start": "2015-01-01",
    "end": "2015-01-03",
    "length": 3
  }
]
```

### GET /api/month-peak
Returns the day with the highest consumption for each month.
Example response:
```json
{
  "2015-01": {
    "day": "2015-01-07",
    "count": 3
  }
}
```

