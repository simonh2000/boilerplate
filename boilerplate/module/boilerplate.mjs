// Import document classes.
import { BoilerplateActor } from './documents/actor.mjs';
import { BoilerplateItem } from './documents/item.mjs';
// Import sheet classes.
import { BoilerplateActorSheet } from './sheets/actor-sheet.mjs';
import { BoilerplateFeatWeaknessItemSheet } from './sheets/featWeaknessItem-sheet.mjs';
import { BoilerplateFeatTraitItemSheet } from './sheets/featTraitItem-sheet.mjs';
import { BoilerplateFeatTechniqueItemSheet } from './sheets/featTechniqueItem-sheet.mjs';
import { BoilerplateFeatStatusItemSheet } from './sheets/featStatusItem-sheet.mjs';
import { BoilerplateFeatSkillItemSheet } from './sheets/featSkillItem-sheet.mjs';
import { BoilerplateThingsStuffItemSheet } from './sheets/thingsStuffItem-sheet.mjs';
import { BoilerplateThingsWearableItemSheet } from './sheets/thingsWearableItem-sheet.mjs';
import { BoilerplateThingsWeaponItemSheet } from './sheets/thingsWeaponItem-sheet.mjs';
// Import helper/utility classes and constants.
import { BOILERPLATE } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data-models.mjs';

// Add key classes to the global scope so they can be more easily used
// by downstream developers
globalThis.boilerplate = {
	documents: {
	  BoilerplateActor,
	  BoilerplateItem,
	},
	applications: {
	  BoilerplateActorSheet,
	  BoilerplateFeatWeaknessItemSheet,
	  BoilerplateFeatTraitItemSheet,
	  BoilerplateFeatTechniqueItemSheet,
	  BoilerplateFeatStatusItemSheet,
	  BoilerplateFeatSkillItemSheet,
	  BoilerplateThingsStuffItemSheet,
	  BoilerplateThingsWearableItemSheet,
	  BoilerplateThingsWeaponItemSheet
	},
	utils: {
	  rollItemMacro,
	},
	models,
  };
  


Hooks.once('init', function () {
	console.log("hooked!");
	console.log(BoilerplateActorSheet)
	// Add custom constants for configuration.
	CONFIG.BOILERPLATE = BOILERPLATE;
  
	/**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
	//set initiative format
	CONFIG.Combat.initiative = {
    	formula: '1d20',
    	decimals: 2,
  	};
  
	// Active Effects are never copied to the Actor,
	// but will still apply to the Actor from within the Item
	// if the transfer property on the Active Effect is true.
	CONFIG.ActiveEffect.legacyTransferral = false;

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = BoilerplateActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    person: models.CharacterData,
    monster: models.CharacterData,
	shop: models.CharacterData
  };
  CONFIG.Item.documentClass = BoilerplateItem;
  CONFIG.Item.dataModels = {
	equippable: models.EquippableData,
	weapon: models.WeaponData,
	stuff: models.StuffData,

	skill: models.SkillData,
	technique: models.TechniqueData,
	status: models.StatusData,
	trait: models.TraitData,
	weakness: models.WeaknessData
  };

  
	// Register sheet application classes
	Actors.unregisterSheet('core', ActorSheet);
	Actors.registerSheet('person', BoilerplateActorSheet, {
	  makeDefault: true,
	  label: 'Person',
	});
	Actors.registerSheet('monster', BoilerplateActorSheet, {
		makeDefault: true,
		label: 'Monster',
	  });
	Actors.registerSheet('shop', BoilerplateActorSheet, {
		makeDefault: true,
		label: 'Shop',
	});  

	Items.unregisterSheet('core', ItemSheet);
	Items.registerSheet('weapon', BoilerplateThingsWeaponItemSheet, {
	  //types: ["weapon", "wearable", "stuff", "skill", "status", "technique", "trait", "weakness"],
	  types: ["weapon"],
	  makeDefault: true,
	  label: 'Weapon',
	});
	Items.registerSheet('wearable', BoilerplateThingsWearableItemSheet, {
	  types: ["wearable"],
	  makeDefault: true,
	  label: 'Wearable',
	});
	Items.registerSheet('stuff', BoilerplateThingsStuffItemSheet, {
	  types: ["stuff"],
	  makeDefault: true,
	  label: 'Stuff',
	});
	Items.registerSheet('skill', BoilerplateFeatSkillItemSheet, {
	  types: ["skill"],
	  makeDefault: true,
	  label: 'Skill',
	});
	Items.registerSheet('status', BoilerplateFeatStatusItemSheet, {
	  types: ["status"],
	  makeDefault: true,
	  label: 'Status',
	});
	Items.registerSheet('technique', BoilerplateFeatTechniqueItemSheet, {
	  types: ["technique"],
	  makeDefault: true,
	  label: 'Technique',
	});
	Items.registerSheet('trait', BoilerplateFeatTraitItemSheet, {
	  types: ["trait"],
	  makeDefault: true,
	  label: 'Trait',
	});
	Items.registerSheet('weakness', BoilerplateFeatWeaknessItemSheet, {
	  types: ["weakness"],
	  makeDefault: true,
	  label: 'Weakness',
	});
  
	// Preload Handlebars templates.
	//return preloadHandlebarsTemplates();
  });
  
  /* -------------------------------------------- */
  /*  Handlebars Helpers                          */
  /* -------------------------------------------- */
  
  // If you need to add Handlebars helpers, here is a useful example:
  /*Handlebars.registerHelper('toLowerCase', function (str) {
	return str.toLowerCase();
  });*/
  
  /* -------------------------------------------- */
  /*  Ready Hook                                  */
  /* -------------------------------------------- */
  
  Hooks.once('ready', function () {
	// Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
	Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
  });
  
  /* -------------------------------------------- */
  /*  Hotbar Macros                               */
  /* -------------------------------------------- */
  
  /**
   * Create a Macro from an Item drop.
   * Get an existing item macro if one exists, otherwise create a new one.
   * @param {Object} data     The dropped data
   * @param {number} slot     The hotbar slot to use
   * @returns {Promise}
   */
  async function createItemMacro(data, slot) {
	// First, determine if this is a valid owned item.
	if (data.type !== 'Item') return;
	if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
	  return ui.notifications.warn(
		'You can only create macro buttons for owned Items'
	  );
	}
	// If it is, retrieve it based on the uuid.
	const item = await Item.fromDropData(data);
  
	// Create the macro command using the uuid.
	const command = `game.boilerplate.rollItemMacro("${data.uuid}");`;
	let macro = game.macros.find(
	  (m) => m.name === item.name && m.command === command
	);
	if (!macro) {
	  macro = await Macro.create({
		name: item.name,
		type: 'script',
		img: item.img,
		command: command,
		flags: { 'boilerplate.itemMacro': true },
	  });
	}
	game.user.assignHotbarMacro(macro, slot);
	return false;
  }
  
  /**
   * Create a Macro from an Item drop.
   * Get an existing item macro if one exists, otherwise create a new one.
   * @param {string} itemUuid
   */
  function rollItemMacro(itemUuid) {
	// Reconstruct the drop data so that we can load the item.
	const dropData = {
	  type: 'Item',
	  uuid: itemUuid,
	};
	// Load the item from the uuid.
	Item.fromDropData(dropData).then((item) => {
	  // Determine if the item loaded and if it's an owned item.
	  if (!item || !item.parent) {
		const itemName = item?.name ?? itemUuid;
		return ui.notifications.warn(
		  `Could not find item ${itemName}. You may need to delete and recreate this macro.`
		);
	  }
  
	  // Trigger the item roll
	  item.roll();
	});
  }
