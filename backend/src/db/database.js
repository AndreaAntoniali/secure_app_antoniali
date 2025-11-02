"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Pool = pg_1.default.Pool;
// Récupération de la variable d'environnement Docker
var pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
        'postgres://secureapp:secureapp@localhost:5432/secureapp',
});
exports.default = pool;
