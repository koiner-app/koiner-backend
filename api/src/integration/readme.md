# Koiner Integration Module

Place integrations between modules (boundaries) in this directory

To keep each module decoupled they should not directly depend on each other's inner layers (Application + Domain).
By placing integrations inside a separate module we can keep dependencies well organized and only have loosely coupled relationships.

# Exceptions
- We still have to depend on GraphQL Node + Connection DTO's between modules for defining the fields used by field resolvers.
- We can create relationships between database schema's with foreign keys.

# Contents
- API: GraphQL field resolvers connecting modules
- Automation: Event handlers connecting events + commands from separate modules
