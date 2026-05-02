PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Account (
    id INTEGER PRIMARY KEY,
    login TEXT,
    username TEXT,
    pwd_hash TEXT
);

CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS ProductVariant (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    name TEXT,

    FOREIGN KEY (product_id) REFERENCES Product(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS StoreBrand (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS Store (
    id INTEGER PRIMARY KEY,
    brand_id INTEGER,
    name TEXT,
    addr TEXT,
    city TEXT,
    latitude REAL,
    longitude REAL,

    FOREIGN KEY (brand_id) REFERENCES StoreBrand(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY,
    account_id INTEGER,
    store_id INTEGER,
    timestamp TEXT,

    FOREIGN KEY (account_id) REFERENCES Account(id)
        ON DELETE CASCADE,

    FOREIGN KEY (store_id) REFERENCES Store(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS TransactionItem (
    id INTEGER PRIMARY KEY,
    transaction_id INTEGER,
    product_variant_id INTEGER,
    quantity REAL,
    price REAL,
    expire TEXT,
    remaining REAL,

    FOREIGN KEY (transaction_id) REFERENCES Transactions(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_variant_id) REFERENCES ProductVariant(id)
        ON DELETE RESTRICT
);