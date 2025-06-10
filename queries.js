const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    // Create
    await books.insertOne({ title: 'New Book', author: 'John Doe', price: 15 });

    // Read
    const allBooks = await books.find().toArray();
    console.log('Books:', allBooks);

    // Update
    await books.updateOne({ title: 'New Book' }, { $set: { price: 18 } });

    // Delete
    await books.deleteOne({ title: 'New Book' });

    console.log('CRUD operations complete.');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
