const HubActivity = require('./hubActivity');
const Module = require('./module');
const Redoublant = require('./redoublant');
const Roadblock = require('./roadblock');
const TekYear = require('./year');
const Admin = require('./admin');

// Relation One-To-Many (TekYear - Roadblocks)
TekYear.hasMany(Roadblock, {
  onDelete: 'CASCADE'
});
Roadblock.belongsTo(TekYear);

// Relation One-To-Many (Roadblock - Modules)
Roadblock.hasMany(Module, {
  onDelete: 'CASCADE'
});
Module.belongsTo(Roadblock);

// Relation Many-To-Many (Redoublant - Modules)
Redoublant.belongsToMany(Module, { through: 'redoublantModules' });
Module.belongsToMany(Redoublant, { through: 'redoublantModules' });