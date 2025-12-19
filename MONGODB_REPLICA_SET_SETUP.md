# MongoDB Replica Set Setup Guide

## Why Replica Sets for Voting?

**Transactions are CRITICAL for secure voting** because they ensure:
- **Atomicity**: Either all vote operations succeed (vote count + mark voter + add to election) or ALL fail
- **Data Integrity**: Prevents corruption where vote count increases but voter isn't marked as voted
- **Race Condition Protection**: Prevents double-voting in concurrent scenarios
- **Audit Trail**: Ensures complete, consistent voting records

## Quick Setup for Development (Single-Node Replica Set)

You can set up MongoDB as a single-node replica set for development/testing:

### Option 1: Using MongoDB Atlas (Recommended for Demo)

MongoDB Atlas provides replica sets by default:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Get your connection string
4. Update your `.env` file with the Atlas connection string
5. **Transactions will work automatically!**

### Option 2: Local MongoDB Replica Set (Single Node)

If using local MongoDB:

1. **Stop your current MongoDB instance**

2. **Start MongoDB with replica set configuration:**
   ```bash
   mongod --replSet rs0 --port 27017 --dbpath /path/to/your/data/directory
   ```

3. **In a new terminal, connect to MongoDB:**
   ```bash
   mongo
   ```

4. **Initialize the replica set:**
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [
       { _id: 0, host: "localhost:27017" }
     ]
   })
   ```

5. **Verify it's working:**
   ```javascript
   rs.status()
   ```
   You should see `"myState" : 1` (PRIMARY)

6. **Restart your Node.js server** - transactions will now work!

### Option 3: Docker MongoDB Replica Set

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    command: mongod --replSet rs0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  mongo-setup:
    image: mongo:latest
    depends_on:
      - mongodb
    entrypoint: ["bash", "-c"]
    command:
      - |
        sleep 10
        mongo mongodb:27017 --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongodb:27017'}]})"
volumes:
  mongodb_data:
```

Then run: `docker-compose up`

## For Production

- **Always use a proper multi-node replica set** (minimum 3 nodes recommended)
- This provides high availability and data redundancy
- Consider MongoDB Atlas for managed replica sets

## Verifying Transactions Work

After setting up replica set, test voting:
- Transactions should complete without errors
- Check MongoDB logs - no "replica set" errors
- All vote operations will be atomic and secure

