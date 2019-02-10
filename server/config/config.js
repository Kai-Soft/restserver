// ================================
//  Configuración de Puerto
// ================================

process.env.PORT = process.env.PORT || 3000;

// ================================
//  Configuración de Entorno
// ================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================
//  Caducidad del Token 30 días calendario
// ================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ================================
//  Configuración del SEED (Semilla del Token)
// ================================
process.env.SEED = process.env.SEED || 'seed-desarrollo'

// ================================
//  Configuración de Base de Datos
// ================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLBD = urlDB;