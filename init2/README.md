# Reviews Seeding - init2 Folder

This folder contains scripts to add reviews to your existing listings in MongoDB.

## Files:
- `reviewData.js` - Contains 40+ diverse review comments with ratings (3-5 stars)
- `index.js` - Script to seed reviews into MongoDB

## How to Use:

### Step 1: Make sure you have listings in your database
First, seed your listings if you haven't already:
```bash
node init/index.js
```

### Step 2: Seed the reviews
Run the review seeding script:
```bash
node init2/index.js
```

This will:
- Find all existing listings in your database
- Add 5-8 random reviews to each listing
- Create demo users if they don't exist
- Link reviews to listings automatically

### Expected Output:
```
✅ Connected to MongoDB
🔍 Fetching all listings...
📋 Found 50 listings
👥 Fetching users...
✅ Found 5 existing users
⭐ Adding reviews to each listing...
  📝 Adding 7 reviews to: Cozy Beachfront Cottage
  📝 Adding 6 reviews to: Modern Loft in Downtown
  ...
🎉 Successfully added 350 reviews!
📊 Average: 7 reviews per listing
✅ Review seeding completed!
🔌 Connection closed
```

### Step 3: Start your server and view reviews
```bash
node app.js
```

Visit any listing page and you'll see the reviews displayed!

## Notes:
- Reviews are randomly assigned to users
- Each listing gets 5-8 reviews
- Ratings range from 3-5 stars
- Comments are diverse and realistic
- You can run this script multiple times to add more reviews
