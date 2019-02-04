// ================================
//  Configuración de Puerto
// ================================

process.env.PORT = process.env.PORT || 3000;

// ================================
//  Configuración de Entorno
// ================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================
//  Configuración de Base de Datos
// ================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://coffee-user:coffee123@ds121105.mlab.com:21105/coffee-dev';
}

process.env.URLBD = urlDB;