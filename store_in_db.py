import json
from pymongo import MongoClient
from datetime import datetime

# Step 1: Read the JSON file
with open('bse_announcements_data.json', 'r') as file:
    json_data = json.load(file)

# Step 2: Convert "DT_TM" ISO string to Unix timestamp (numeric representation)
for item in json_data:
    dt_tm_str = item['DT_TM']
    dt_tm_str = dt_tm_str.rstrip('.')  # Remove the trailing dot if present
    dt_tm = datetime.fromisoformat(dt_tm_str)
    item['DT_TM'] = dt_tm

# Step 3: Store the data in MongoDB Atlas
# Replace the placeholders below with your MongoDB Atlas connection string and collection name.
mongo_connection_string = 'mongodb+srv://johnybravo2404:%40bcd1234@cluster0.ikxf9ss.mongodb.net/?retryWrites=true&w=majority'
collection_name = 'company_announcements'

client = MongoClient(mongo_connection_string)
db = client['financial_news']
collection = db[collection_name]

# Insert the data into MongoDB
collection.delete_many({})
collection.insert_many(json_data)

# Close the MongoDB client connection
client.close()