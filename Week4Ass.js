const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


const MONGO_URI = "mongodb+srv://gideontetteh792:0kpoLsY4EDBe4iID@cluster0.tzlhh.mongodb.net/shoestore?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Shoe Schema
const shoeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, default: 'N/A' },
  color: { type: String, default: 'N/A' },
  category: { 
    type: String, 
    required: true,
    enum: ['men', 'ladies', 'kids']
  },
  dateAdded: { type: Date, default: Date.now }
});

// Create Shoe Model
const Shoe = mongoose.model('Shoe', shoeSchema);

// GET all shoes
app.get('/api/shoes', async (req, res) => {
  try {
    // Group shoes by category
    const shoes = await Shoe.find({});
    const result = {
      men: shoes.filter(shoe => shoe.category === 'men'),
      ladies: shoes.filter(shoe => shoe.category === 'ladies'),
      kids: shoes.filter(shoe => shoe.category === 'kids')
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET shoes by category
app.get('/api/shoes/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();
  
  if (!['men', 'ladies', 'kids'].includes(category)) {
    return res.status(404).json({ error: 'Category not found. Use men, ladies, or kids.' });
  }
  
  try {
    const shoes = await Shoe.find({ category });
    res.json(shoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a new shoe to a category
app.post('/api/shoes/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();
  
  if (!['men', 'ladies', 'kids'].includes(category)) {
    return res.status(404).json({ error: 'Category not found. Use men, ladies, or kids.' });
  }
  
  const { name, brand, price, size, color } = req.body;
  
  // Validate required fields
  if (!name || !brand || !price) {
    return res.status(400).json({ error: 'Name, brand, and price are required fields' });
  }
  
  try {
    // Create new shoe
    const newShoe = new Shoe({
      name,
      brand,
      price,
      size: size || 'N/A',
      color: color || 'N/A',
      category
    });
    
    // Save to database
    const savedShoe = await newShoe.save();
    res.status(201).json(savedShoe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a shoe by ID from a category
app.delete('/api/shoes/:category/:id', async (req, res) => {
  const category = req.params.category.toLowerCase();
  const id = req.params.id;
  
  if (!['men', 'ladies', 'kids'].includes(category)) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  try {
    const result = await Shoe.findOneAndDelete({ _id: id, category });
    
    if (!result) {
      return res.status(404).json({ error: 'Shoe not found' });
    }
    
    res.json({ message: 'Shoe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a shoe by ID in a category
app.put('/api/shoes/:category/:id', async (req, res) => {
  const category = req.params.category.toLowerCase();
  const id = req.params.id;
  
  if (!['men', 'ladies', 'kids'].includes(category)) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  try {
    const updatedShoe = await Shoe.findOneAndUpdate(
      { _id: id, category },
      { ...req.body, category }, // Ensure category doesn't change
      { new: true, runValidators: true }
    );
    
    if (!updatedShoe) {
      return res.status(404).json({ error: 'Shoe not found' });
    }
    
    res.json(updatedShoe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
