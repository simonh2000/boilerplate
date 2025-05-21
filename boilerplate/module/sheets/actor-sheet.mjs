import {
	onManageActiveEffect,
	prepareActiveEffectCategories,
  } from '../helpers/effects.mjs';

  const { api, sheets } = foundry.applications;
  

  export class BoilerplateActorSheet extends api.HandlebarsApplicationMixin(
	sheets.ActorSheetV2
  ) {
	constructor(options = {}) {
	  super(options);
	  this.#dragDrop = this.#createDragDropHandlers();
	}
  
	/** @override */
	static DEFAULT_OPTIONS = {
	  classes: ['boilerplate', 'actor'],
	  position: {
		width: 740,
		height: 640,
	  },
	  actions: {
		onEditImage: this._onEditImage,
		viewDoc: this._viewDoc,
		createDoc: this._createDoc,
		deleteDoc: this._deleteDoc,
		toggleEffect: this._toggleEffect,
		roll: this._onRoll,
	  },
	  // Custom property that's merged into `this.options`
	  dragDrop: [{ dragSelector: '[data-drag]', dropSelector: null }],
	  form: {
		submitOnChange: true,
	  },
	};

	 /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [
        { id: "inventory", label: "Inventory" },
        { id: "skills", label: "Skills" },
        { id: "traits", label: "Traits" },
      ],
      initial: "inventory",
    },
  };
  

	/** @override */
	static PARTS = {
	  header: {
		template: 'systems/boilerplate/templates/actor/actor-person-sheet.hbs',
	  },
	  tabs: {
		// Foundry-provided generic template
		template: 'templates/generic/tab-navigation.hbs',
	  },
	  inventory: {
		template: 'systems/boilerplate/templates/actor/parts/actor-inventory.hbs',
	  },
	  skills: {
		template: 'systems/boilerplate/templates/actor/parts/actor-skills.hbs',
	  },
	  traits: {
		template: 'systems/boilerplate/templates/actor/parts/actor-traits.hbs',
	  },
	};
  
	/** @override */
	_configureRenderOptions(options) {
	  super._configureRenderOptions(options);
	  // Not all parts always render
	  options.parts = [/*'header', 'tabs'*/];
	  // Don't show the other tabs if only limited view
	  if (this.document.limited) return;
	  // Control which parts show based on document subtype
	  switch (this.document.type) {
		case 'person':
		  options.parts.push('header', 'tabs', 'inventory', 'skills', 'traits');
		  break;
		case 'monster':
		  options.parts.push('header', 'tabs', 'inventory', 'skills', 'traits');
		  break;
		case 'shop':
		  options.parts.push('header', 'tabs', 'inventory', 'skills', 'traits');
		  break;
	  }
	}
  
	/*_prepareTabs(group) {
    const tabs = super._prepareTabs(group);

    if (group === "primary") {
      if (this.document.limited) {
        tabs.inventory.active = true;
		/*tabs.skills.active = true;
		tabs.traits.active = true;*/
        //tabs.inventory.cssClass = "active";
		/*tabs.skills.cssClass = "active";
		tabs.traits.cssClass = "active";*/
        //return { inventory: tabs.inventory/*, skills: tabs.skills, traits: tabs.traits*/ };
      //}

      /*if (this.document.type !== "character") {
        delete tabs.equipment;
        delete tabs.projects;
      }*/
    //}

    //return tabs;
  //}

	/* -------------------------------------------- */
  

	/** @override */
	/*async _prepareContext(options) {
	  // Output initialization
	  const context = {
		// Validates both permissions and compendium status
		editable: this.isEditable,
		owner: this.document.isOwner,
		limited: this.document.limited,
		// Add the actor document.
		actor: this.actor,
		// Add the actor's data to context.data for easier access, as well as flags.
		system: this.actor.system,
		flags: this.actor.flags,
		// Adding a pointer to CONFIG.BOILERPLATE
		config: CONFIG.BOILERPLATE,
		/*tabs: this._getTabs(options.parts),*/
		// Necessary for formInput and formFields helpers
		//fields: this.document.schema.fields,
		//systemFields: this.document.system.schema.fields,

		//isStaminaBelowHalf: this.actor.system.resources.stamina.value <= (this.actor.system.resources.stamina.max / 2),
		//isStaminaBelowQuarter: this.actor.system.resources.stamina.value <= (this.actor.system.resources.stamina.max / 4),
	  //};
  
	  // Offloading context prep to a helper function
	  //this._prepareItems(context);
  
	  //return context;
	//}*/

	async _prepareContext(options) {
  		const context = await super._prepareContext(options);
  		
		context.editable = this.isEditable;
		context.owner = this.document.isOwner;
		context.limited = this.document.limited;
		// Add the actor document.
		context.actor = this.actor;
		// Add the actor's data to context.data for easier access, as well as flags.
		context.system = this.actor.system;
		context.flags = this.actor.flags;
		// Adding a pointer to CONFIG.BOILERPLATE
		context.config = CONFIG.BOILERPLATE;
		//context.tabs = this._prepareTabs(options);
		// Necessary for formInput and formFields helpers
		//context.fields = this.document.schema.fields;
		//systemFields: this.document.system.schema.fields,

		context.isStaminaBelowHalf = this.actor.system.resources.stamina.value <= (this.actor.system.resources.stamina.max / 2);
		context.isStaminaBelowQuarter = this.actor.system.resources.stamina.value <= (this.actor.system.resources.stamina.max / 4);

  		return context;
	}
  
	/** @override */
	//async _preparePartContext(partId, context) {
	  //switch (partId) {
		/*case 'features':
		case 'spells':
		case 'gear':
		  context.tab = context.tabs[partId];
		  break;
		case 'biography':
		  context.tab = context.tabs[partId];
		  // Enrich biography info for display
		  // Enrichment turns text like `[[/r 1d20]]` into buttons
		  context.enrichedBiography = await TextEditor.enrichHTML(
			this.actor.system.biography,
			{
			  // Whether to show secret blocks in the finished html
			  secrets: this.document.isOwner,
			  // Data to fill in for inline rolls
			  rollData: this.actor.getRollData(),
			  // Relative UUID resolution
			  relativeTo: this.actor,
			}
		  );
		  break;
		case 'effects':
		  context.tab = context.tabs[partId];
		  // Prepare active effects
		  context.effects = prepareActiveEffectCategories(
			// A generator that returns all effects stored on the actor
			// as well as any items
			this.actor.allApplicableEffects()
		  );*/
		  /*case 'header':
			context.tab = context.tabs[partId];
			break;
		  case 'inventory':
			context.tab = context.tabs[partId];
			break;
		  case 'skills':
		    context.tab = context.tabs[partId];
			break;
		  case 'traits':
			context.tab = context.tabs[partId];
			break;
		  break;*/
	  //}
	  //return context;
	//}
	async _preparePartContext(partId, context, options) {
  		await super._preparePartContext(partId, context, options);

  		if (partId in context.tabs) context.tab = context.tabs[partId];

		debugger;

  		return context;
	}
  
	/**
	 * Generates the data for the generic tab navigation template
	 * @param {string[]} parts An array of named template parts to render
	 * @returns {Record<string, Partial<ApplicationTab>>}
	 * @protected
	 */
	/*_getTabs(parts) {
	  // If you have sub-tabs this is necessary to change
	  const tabGroup = 'primary';
	  // Default tab for first time it's rendered this session
	  //this set biography before, hopefully this change doesn't break it? -s
	  if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = 'header';
	  return parts.reduce((tabs, partId) => {
		const tab = {
		  cssClass: '',
		  group: tabGroup,
		  // Matches tab property to
		  id: '',
		  // FontAwesome Icon, if you so choose
		  icon: '',
		  // Run through localization
		  //TODO: see if this works? -s
		  //label: 'BOILERPLATE.Actor.Tabs.',
		};
		switch (partId) {
		  case 'header':
		  case 'tabs':
			return tabs;
		  case 'inventory':
			tab.id = 'inventory';
			tab.label = 'Inventory';
			break;
		  case 'skills':
			tab.id = 'skills';
			tab.label = 'Skills';
			break;
		  case 'traits':
			tab.id = 'traits';
			tab.label = 'Traits';
			break;
		}
		if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = 'active';
		tabs[partId] = tab;
		return tabs;
	  }, {});
	}*/
  
	/**
	 * Organize and classify Items for Actor sheets.
	 *
	 * @param {object} context The context object to mutate
	 */
	_prepareItems(context) {
	  // Initialize containers.
	  // You can just use `this.document.itemTypes` instead
	  // if you don't need to subdivide a given type like
	  // this sheet does with spells
	  const weapons = [];
	  const equippedWeapons = [];
	  const wearables = [];
	  const equippedWearables = [];
	  const stuffs = [];
	  const skills = {
		"strength": [],
		"mobility": [],
		"dexterity": [],
		"perception": [],
		"charisma": [],
		"mental": []
	  };
	  const techniques = [];
	  const traits = [];
	  const weaknesses = [];
	  const statuses = [];
  
	  // Iterate through items, allocating to containers
	  for (let i of this.document.items) {
		if (i.type === 'weapon') {
			console.log("i.system.isEquipped (weapon): ", i.system.isEquipped);
			if (i.system.isEquipped === "true") {
			  equippedWeapons.push(i);
			  console.log('pushed ', i, ' to equippedWeapons.');
			  console.log('equippedWeapons: ', equippedWeapons);
			}
			else {
			  weapons.push(i);
			  console.log('pushed ', i, ' to weapons.');
			  console.log('weapons: ', weapons);
			}
			/*else if (i.system.isEquipped === "false") {
			  weapons.push(i);
			  console.log('pushed ', i, ' to weapons.');
			}*/
		  }
		  // Append to wearables.
		  else if (i.type === 'wearable') {
			console.log("i.system.isEquipped (wearable): ", i.system.isEquipped);
			if (i.system.isEquipped === "true") {
			  equippedWearables.push(i);
			  console.log('pushed ', i, ' to equippedWearables.');
			  console.log('equippedWearables: ', equippedWearables);
			}
			else {
			  wearables.push(i);
			  console.log('pushed ', i, ' to wearables.');
			  console.log('wearables: ', wearables);
			}
			/*else if (i.system.isEquipped === false) {
			  wearables.push(i);
			  console.log('pushed ', i, ' to wearables.');
			}*/
		  }
		  // Append to stuffs.
		  else if (i.type === 'stuff') {
			stuffs.push(i);
		  }
		  // Append to skills.
		  else if (i.type === 'skill') {
			skills[i.system.skillCategory].push(i);
		  }
		  // Append to techniques.
		  else if (i.type === 'technique') {
			techniques.push(i);
		  }
		  // Append to traits.
		  else if (i.type === 'trait') {
			traits.push(i);
		  }
		  // Append to weaknesses.
		  else if (i.type === 'weakness') {
			weaknesses.push(i);
		  }
		  // Append to statuses.
		  else if (i.type === 'status') {
			statuses.push(i);
		  }
		}
  
		//keeping this as an example. sort wearables like this!
	  /*for (const s of Object.values(spells)) {
		s.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  }*/
  
	  // Sort then assign
	  context.stuffs = stuffs.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  context.weapons = weapons.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  context.equippedWeapons = equippedWeapons.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  context.wearables = wearables.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  context.equippedWearables = equippedWearables.sort((a, b) => (a.sort || 0) - (b.sort || 0));
	  context.skills = skills;
	  context.techniques = techniques;
	  context.traits = traits;
	  context.weaknesses = weaknesses;
	  context.statuses = statuses;
	}
  
	/**
	 * Actions performed after any render of the Application.
	 * Post-render steps are not awaited by the render process.
	 * @param {ApplicationRenderContext} context      Prepared context data
	 * @param {RenderOptions} options                 Provided render options
	 * @protected
	 * @override
	 */
	_onRender(context, options) {
	  this.#dragDrop.forEach((d) => d.bind(this.element));
	  this.#disableOverrides();
	  // You may want to add other special handling here
	  // Foundry comes with a large number of utility classes, e.g. SearchFilter
	  // That you may want to implement yourself.
	}
  
	/**************
	 *
	 *   ACTIONS
	 *
	 **************/
  
	/**
	 * Handle changing a Document's image.
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @returns {Promise}
	 * @protected
	 */
	static async _onEditImage(event, target) {
	  const attr = target.dataset.edit;
	  const current = foundry.utils.getProperty(this.document, attr);
	  const { img } =
		this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ??
		{};
	  const fp = new FilePicker({
		current,
		type: 'image',
		redirectToRoot: img ? [img] : [],
		callback: (path) => {
		  this.document.update({ [attr]: path });
		},
		top: this.position.top + 40,
		left: this.position.left + 10,
	  });
	  return fp.browse();
	}
  
	/**
	 * Renders an embedded document's sheet
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @protected
	 */
	static async _viewDoc(event, target) {
	  const doc = this._getEmbeddedDocument(target);
	  doc.sheet.render(true);
	}
  
	/**
	 * Handles item deletion
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @protected
	 */
	static async _deleteDoc(event, target) {
	  const doc = this._getEmbeddedDocument(target);
	  await doc.delete();
	}
  
	/**
	 * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @private
	 */
	static async _createDoc(event, target) {
	  // Retrieve the configured document class for Item or ActiveEffect
	  const docCls = getDocumentClass(target.dataset.documentClass);
	  // Prepare the document creation data by initializing it a default name.
	  const docData = {
		name: docCls.defaultName({
		  // defaultName handles an undefined type gracefully
		  type: target.dataset.type,
		  parent: this.actor,
		}),
	  };
	  // Loop through the dataset and add it to our docData
	  for (const [dataKey, value] of Object.entries(target.dataset)) {
		// These data attributes are reserved for the action handling
		if (['action', 'documentClass'].includes(dataKey)) continue;
		// Nested properties require dot notation in the HTML, e.g. anything with `system`
		// An example exists in spells.hbs, with `data-system.spell-level`
		// which turns into the dataKey 'system.spellLevel'
		foundry.utils.setProperty(docData, dataKey, value);
	  }
  
	  // Finally, create the embedded document!
	  await docCls.create(docData, { parent: this.actor });
	}
  
	/**
	 * Determines effect parent to pass to helper
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @private
	 */
	static async _toggleEffect(event, target) {
	  const effect = this._getEmbeddedDocument(target);
	  await effect.update({ disabled: !effect.disabled });
	}
  
	/**
	 * Handle clickable rolls.
	 *
	 * @this BoilerplateActorSheet
	 * @param {PointerEvent} event   The originating click event
	 * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
	 * @protected
	 */
	static async _onRoll(event, target) {
	  event.preventDefault();
	  const dataset = target.dataset;
  
	  // Handle item rolls.
	  switch (dataset.rollType) {
		case 'item':
		  const item = this._getEmbeddedDocument(target);
		  if (item) return item.roll();
	  }
  
	  // Handle rolls that supply the formula directly.
	  if (dataset.roll) {
		let label = dataset.label ? `[ability] ${dataset.label}` : '';
		let roll = new Roll(dataset.roll, this.actor.getRollData());
		await roll.toMessage({
		  speaker: ChatMessage.getSpeaker({ actor: this.actor }),
		  flavor: label,
		  rollMode: game.settings.get('core', 'rollMode'),
		});
		return roll;
	  }
	}
  
	/** Helper Functions */
  
	/**
	 * Fetches the embedded document representing the containing HTML element
	 *
	 * @param {HTMLElement} target    The element subject to search
	 * @returns {Item | ActiveEffect} The embedded Item or ActiveEffect
	 */
	_getEmbeddedDocument(target) {
	  const docRow = target.closest('li[data-document-class]');
	  if (docRow.dataset.documentClass === 'Item') {
		return this.actor.items.get(docRow.dataset.itemId);
	  } else if (docRow.dataset.documentClass === 'ActiveEffect') {
		const parent =
		  docRow.dataset.parentId === this.actor.id
			? this.actor
			: this.actor.items.get(docRow?.dataset.parentId);
		return parent.effects.get(docRow?.dataset.effectId);
	  } else return console.warn('Could not find document class');
	}
  
	/***************
	 *
	 * Drag and Drop
	 *
	 ***************/
  
	/**
	 * Define whether a user is able to begin a dragstart workflow for a given drag selector
	 * @param {string} selector       The candidate HTML selector for dragging
	 * @returns {boolean}             Can the current user drag this selector?
	 * @protected
	 */
	_canDragStart(selector) {
	  // game.user fetches the current user
	  return this.isEditable;
	}
  
	/**
	 * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector
	 * @param {string} selector       The candidate HTML selector for the drop target
	 * @returns {boolean}             Can the current user drop on this selector?
	 * @protected
	 */
	_canDragDrop(selector) {
	  // game.user fetches the current user
	  return this.isEditable;
	}
  
	/**
	 * Callback actions which occur at the beginning of a drag start workflow.
	 * @param {DragEvent} event       The originating DragEvent
	 * @protected
	 */
	_onDragStart(event) {
	  const docRow = event.currentTarget.closest('li');
	  if ('link' in event.target.dataset) return;
  
	  // Chained operation
	  let dragData = this._getEmbeddedDocument(docRow)?.toDragData();
  
	  if (!dragData) return;
  
	  // Set data transfer
	  event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
	}
  
	/**
	 * Callback actions which occur when a dragged element is over a drop target.
	 * @param {DragEvent} event       The originating DragEvent
	 * @protected
	 */
	_onDragOver(event) {}
  
	/**
	 * Callback actions which occur when a dragged element is dropped on a target.
	 * @param {DragEvent} event       The originating DragEvent
	 * @protected
	 */
	async _onDrop(event) {
	  const data = TextEditor.getDragEventData(event);
	  const actor = this.actor;
	  const allowed = Hooks.call('dropActorSheetData', actor, this, data);
	  if (allowed === false) return;
  
	  // Handle different data types
	  switch (data.type) {
		case 'ActiveEffect':
		  return this._onDropActiveEffect(event, data);
		case 'Actor':
		  return this._onDropActor(event, data);
		case 'Item':
		  return this._onDropItem(event, data);
		case 'Folder':
		  return this._onDropFolder(event, data);
	  }
	}
  
	/**
	 * Handle the dropping of ActiveEffect data onto an Actor Sheet
	 * @param {DragEvent} event                  The concluding DragEvent which contains drop data
	 * @param {object} data                      The data transfer extracted from the event
	 * @returns {Promise<ActiveEffect|boolean>}  The created ActiveEffect object or false if it couldn't be created.
	 * @protected
	 */
	async _onDropActiveEffect(event, data) {
	  const aeCls = getDocumentClass('ActiveEffect');
	  const effect = await aeCls.fromDropData(data);
	  if (!this.actor.isOwner || !effect) return false;
	  if (effect.target === this.actor)
		return this._onSortActiveEffect(event, effect);
	  return aeCls.create(effect, { parent: this.actor });
	}
  
	/**
	 * Handle a drop event for an existing embedded Active Effect to sort that Active Effect relative to its siblings
	 *
	 * @param {DragEvent} event
	 * @param {ActiveEffect} effect
	 */
	async _onSortActiveEffect(event, effect) {
	  /** @type {HTMLElement} */
	  const dropTarget = event.target.closest('[data-effect-id]');
	  if (!dropTarget) return;
	  const target = this._getEmbeddedDocument(dropTarget);
  
	  // Don't sort on yourself
	  if (effect.uuid === target.uuid) return;
  
	  // Identify sibling items based on adjacent HTML elements
	  const siblings = [];
	  for (const el of dropTarget.parentElement.children) {
		const siblingId = el.dataset.effectId;
		const parentId = el.dataset.parentId;
		if (
		  siblingId &&
		  parentId &&
		  (siblingId !== effect.id || parentId !== effect.parent.id)
		)
		  siblings.push(this._getEmbeddedDocument(el));
	  }
  
	  // Perform the sort
	  const sortUpdates = SortingHelpers.performIntegerSort(effect, {
		target,
		siblings,
	  });
  
	  // Split the updates up by parent document
	  const directUpdates = [];
  
	  const grandchildUpdateData = sortUpdates.reduce((items, u) => {
		const parentId = u.target.parent.id;
		const update = { _id: u.target.id, ...u.update };
		if (parentId === this.actor.id) {
		  directUpdates.push(update);
		  return items;
		}
		if (items[parentId]) items[parentId].push(update);
		else items[parentId] = [update];
		return items;
	  }, {});
  
	  // Effects-on-items updates
	  for (const [itemId, updates] of Object.entries(grandchildUpdateData)) {
		await this.actor.items
		  .get(itemId)
		  .updateEmbeddedDocuments('ActiveEffect', updates);
	  }
  
	  // Update on the main actor
	  return this.actor.updateEmbeddedDocuments('ActiveEffect', directUpdates);
	}
  
	/**
	 * Handle dropping of an Actor data onto another Actor sheet
	 * @param {DragEvent} event            The concluding DragEvent which contains drop data
	 * @param {object} data                The data transfer extracted from the event
	 * @returns {Promise<object|boolean>}  A data object which describes the result of the drop, or false if the drop was
	 *                                     not permitted.
	 * @protected
	 */
	async _onDropActor(event, data) {
	  if (!this.actor.isOwner) return false;
	}
  
	/* -------------------------------------------- */
  
	/**
	 * Handle dropping of an item reference or item data onto an Actor Sheet
	 * @param {DragEvent} event            The concluding DragEvent which contains drop data
	 * @param {object} data                The data transfer extracted from the event
	 * @returns {Promise<Item[]|boolean>}  The created or updated Item instances, or false if the drop was not permitted.
	 * @protected
	 */
	async _onDropItem(event, data) {
	  if (!this.actor.isOwner) return false;
	  const item = await Item.implementation.fromDropData(data);
  
	  // Handle item sorting within the same Actor
	  if (this.actor.uuid === item.parent?.uuid)
		return this._onSortItem(event, item);
  
	  // Create the owned item
	  return this._onDropItemCreate(item, event);
	}
  
	/**
	 * Handle dropping of a Folder on an Actor Sheet.
	 * The core sheet currently supports dropping a Folder of Items to create all items as owned items.
	 * @param {DragEvent} event     The concluding DragEvent which contains drop data
	 * @param {object} data         The data transfer extracted from the event
	 * @returns {Promise<Item[]>}
	 * @protected
	 */
	async _onDropFolder(event, data) {
	  if (!this.actor.isOwner) return [];
	  const folder = await Folder.implementation.fromDropData(data);
	  if (folder.type !== 'Item') return [];
	  const droppedItemData = await Promise.all(
		folder.contents.map(async (item) => {
		  if (!(document instanceof Item)) item = await fromUuid(item.uuid);
		  return item;
		})
	  );
	  return this._onDropItemCreate(droppedItemData, event);
	}
  
	/**
	 * Handle the final creation of dropped Item data on the Actor.
	 * This method is factored out to allow downstream classes the opportunity to override item creation behavior.
	 * @param {object[]|object} itemData      The item data requested for creation
	 * @param {DragEvent} event               The concluding DragEvent which provided the drop data
	 * @returns {Promise<Item[]>}
	 * @private
	 */
	async _onDropItemCreate(itemData, event) {
	  itemData = itemData instanceof Array ? itemData : [itemData];
	  return this.actor.createEmbeddedDocuments('Item', itemData);
	}
  
	/**
	 * Handle a drop event for an existing embedded Item to sort that Item relative to its siblings
	 * @param {Event} event
	 * @param {Item} item
	 * @private
	 */
	_onSortItem(event, item) {
	  // Get the drag source and drop target
	  const items = this.actor.items;
	  const dropTarget = event.target.closest('[data-item-id]');
	  if (!dropTarget) return;
	  const target = items.get(dropTarget.dataset.itemId);
  
	  // Don't sort on yourself
	  if (item.id === target.id) return;
  
	  // Identify sibling items based on adjacent HTML elements
	  const siblings = [];
	  for (let el of dropTarget.parentElement.children) {
		const siblingId = el.dataset.itemId;
		if (siblingId && siblingId !== item.id)
		  siblings.push(items.get(el.dataset.itemId));
	  }
  
	  // Perform the sort
	  const sortUpdates = SortingHelpers.performIntegerSort(item, {
		target,
		siblings,
	  });
	  const updateData = sortUpdates.map((u) => {
		const update = u.update;
		update._id = u.target._id;
		return update;
	  });
  
	  // Perform the update
	  return this.actor.updateEmbeddedDocuments('Item', updateData);
	}
  
	/** The following pieces set up drag handling and are unlikely to need modification  */
  
	/**
	 * Returns an array of DragDrop instances
	 * @type {DragDrop[]}
	 */
	get dragDrop() {
	  return this.#dragDrop;
	}
  
	// This is marked as private because there's no real need
	// for subclasses or external hooks to mess with it directly
	#dragDrop;
  
	/**
	 * Create drag-and-drop workflow handlers for this Application
	 * @returns {DragDrop[]}     An array of DragDrop handlers
	 * @private
	 */
	#createDragDropHandlers() {
	  return this.options.dragDrop.map((d) => {
		d.permissions = {
		  dragstart: this._canDragStart.bind(this),
		  drop: this._canDragDrop.bind(this),
		};
		d.callbacks = {
		  dragstart: this._onDragStart.bind(this),
		  dragover: this._onDragOver.bind(this),
		  drop: this._onDrop.bind(this),
		};
		return new DragDrop(d);
	  });
	}
  
	/********************
	 *
	 * Actor Override Handling
	 *
	 ********************/
  
	/**
	 * Submit a document update based on the processed form data.
	 * @param {SubmitEvent} event                   The originating form submission event
	 * @param {HTMLFormElement} form                The form element that was submitted
	 * @param {object} submitData                   Processed and validated form data to be used for a document update
	 * @returns {Promise<void>}
	 * @protected
	 * @override
	 */
	async _processSubmitData(event, form, submitData) {
	  const overrides = foundry.utils.flattenObject(this.actor.overrides);
	  for (let k of Object.keys(overrides)) delete submitData[k];
	  await this.document.update(submitData);
	}
  
	/**
	 * Disables inputs subject to active effects
	 */
	#disableOverrides() {
	  const flatOverrides = foundry.utils.flattenObject(this.actor.overrides);
	  for (const override of Object.keys(flatOverrides)) {
		const input = this.element.querySelector(`[name="${override}"]`);
		if (input) {
		  input.disabled = true;
		}
	  }
	}
  }
