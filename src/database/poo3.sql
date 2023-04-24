-- Active: 1682349514186@@127.0.0.1@3306
CREATE TABLE champions (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL 
);

INSERT INTO champions (id, name, type, role)
VALUES
        ("c001", "thresh","guardian","support"),
        ("c002", "karma","mage","support"),
        ("c003", "zed","assassin","mid");

SELECT * FROM champions;