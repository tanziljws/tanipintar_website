# SmartFarm Connect Backend

This is the backend server for SmartFarm Connect, which connects to a PostgreSQL database on AWS.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Configure your AWS PostgreSQL database:
   - Edit the `.env` file with your AWS PostgreSQL credentials:
     ```
     DB_HOST=your-aws-postgres-endpoint.region.rds.amazonaws.com
     DB_PORT=5432
     DB_USER=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     PORT=5000
     ```

3. Database Schema:
   - The required database schema is provided in `db_schema.sql`
   - You can run this schema on your AWS PostgreSQL database to create the necessary tables and sample data

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. The server will run on port 3000 by default (http://localhost:3000)

## API Endpoints

- `GET /api/farmers` - Get all farmers with their commodities
- `GET /api/farmers/distribution` - Get farmer count by district for the chart

## Database Structure

The database consists of two main tables:

1. `farmers` - Contains information about farmers including their location
2. `commodities` - Contains information about commodities linked to farmers

See `db_schema.sql` for the complete schema definition.
