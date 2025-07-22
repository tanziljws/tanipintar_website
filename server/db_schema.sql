-- Database schema for SmartFarm Connect

-- Create farmers table
CREATE TABLE IF NOT EXISTS farmers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(20),
  district VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  position POINT NOT NULL -- PostgreSQL point type for lat/long coordinates
);

-- Create commodities table
CREATE TABLE IF NOT EXISTS commodities (
  id SERIAL PRIMARY KEY,
  farmer_id INTEGER REFERENCES farmers(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- e.g., 'padi', 'jagung', 'sayur', 'buah'
  status VARCHAR(50) NOT NULL, -- e.g., 'Siap Panen', 'Masa Tanam', 'Perawatan'
  category VARCHAR(50) NOT NULL, -- e.g., 'Organik', 'Non-Organik'
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data insertion
INSERT INTO farmers (name, contact, district, location, position) VALUES
('Budi Santoso', '08123456789', 'Jakarta Selatan', 'Jakarta Selatan, DKI Jakarta', point(-6.2088, 106.8456)),
('Ani Wijaya', '08234567890', 'Semarang', 'Semarang, Jawa Tengah', point(-6.9932, 110.4203)),
('Dedi Kurniawan', '08345678901', 'Sleman', 'Sleman, DI Yogyakarta', point(-7.7971, 110.3688)),
('Siti Rahayu', '08456789012', 'Bandung', 'Bandung, Jawa Barat', point(-6.9147, 107.6098)),
('Joko Widodo', '08567890123', 'Surabaya', 'Surabaya, Jawa Timur', point(-7.2575, 112.7521));

INSERT INTO commodities (farmer_id, name, type, status, category, image_url) VALUES
(1, 'Padi Ciherang', 'padi', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
(2, 'Jagung Manis', 'jagung', 'Masa Tanam', 'Non-Organik', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
(3, 'Bayam Hijau', 'sayur', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
(4, 'Mangga Harum Manis', 'buah', 'Perawatan', 'Non-Organik', 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'),
(5, 'Padi IR64', 'padi', 'Siap Panen', 'Organik', 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
