const {
	HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
  } = foundry.data.fields;
  
  export class BoilerplateDataModel extends foundry.abstract.TypeDataModel {
	/**
	 * Convert the schema to a plain object.
	 * 
	 * The built in `toObject()` method will ignore derived data when using Data Models.
	 * This additional method will instead use the spread operator to return a simplified
	 * version of the data.
	 * 
	 * @returns {object} Plain object either via deepClone or the spread operator.
	 */
  }

  export class CharacterData extends BoilerplateDataModel {
	static defineSchema() {
	  return {
		biography: new HTMLField(),
		resources: new SchemaField({
			hp: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 20 }),
				min: new NumberField({ required: true, integer: true, initial: 0 }),
				max: new NumberField({ required: true, integer: true, initial: 20 })
			  }),
			stamina: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 10 }),
				min: new NumberField({ required: true, integer: true, initial: 0 }),
				max: new NumberField({ required: true, integer: true, initial: 10 })
			})
		}),
		def: new NumberField({ required: true, integer: true, initial: 0 }),
		eva: new NumberField({ required: true, integer: true, initial: 0 }),
		spd: new SchemaField({
			value: new NumberField({ required: true, integer: true, initial: 4 }),
			min: new NumberField({ required: true, integer: true, initial: 0 })
		}),
		xp: new SchemaField({
			value: new NumberField({ required: true, integer: true, initial: 0 }),
			min: new NumberField({ required: true, integer: true, initial: 0 })
		}),
		miasma: new SchemaField({
			value: new NumberField({ required: true, integer: true, initial: 0 }),
			min: new NumberField({ required: true, integer: true, initial: 0 }),
			max: new NumberField({ required: true, integer: true, initial: 100 })
		}),
		hands: new SchemaField({
			value: new NumberField({ required: true, integer: true, initial: 2 }),
			min: new NumberField({ required: true, integer: true, initial: 0 })
		})
	  };
	}
  }

  class ItemData extends BoilerplateDataModel {
	static defineSchema() {
		return {
			description: new HTMLField(),
			quantity: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			}),
			priceDefault: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 100 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			}),
			priceActual: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 100 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			})
		}
	}
  }

  export class EquippableData extends ItemData {
	static defineSchema() {
		const schema = super.defineSchema();
			schema.isEquipped = new StringField({ required: true, initial: "false" });
			schema.durability = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 10 }),
				min: new NumberField({ required: true, integer: true, initial: 0 }),
				max: new NumberField({ required: true, integer: true, initial: 10 })
			});
			schema.lightPreset = new NumberField({ required: true, integer: true, initial: 0 });
			schema.addedDef = new NumberField({ required: true, integer: true, initial: 0 });

			return schema;
	}
  }

  export class WeaponData extends EquippableData {
	static defineSchema() {
		const schema = super.defineSchema();
			/* turn into list of options */
			schema.skillCategory = new StringField({ required: true, initial: "strength" });
			schema.handedness = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			});
			schema.range = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			});
			/* turn into list of options */
			schema.rangeType = new StringField({ required: true, initial: "short" });
			/* turn into list of options */
			schema.damageType = new StringField({ required: true, initial: "blunt" });
			schema.damage = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 5 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			});
			schema.isWeapon = new StringField({ required: true, initial: "true" });
			schema.isShield = new StringField({ required: true, initial: "false" });

			return schema;
	}
  }

  export class WearableData extends EquippableData {
	static defineSchema() {
		const schema = super.defineSchema();
			/* turn into list of options */
			schema.wearableSlot = new StringField({ required: true, initial: "head" });

			return schema;
	}
  }

  export class StuffData extends ItemData {
	static defineSchema() {
		const schema = super.defineSchema();
		return schema;
	}
  }

  class FeatData extends BoilerplateDataModel {
	static defineSchema() {
		return {
			description: new HTMLField()
		}
	}
  }

  export class SkillData extends FeatData {
	static defineSchema() {
		const schema = super.defineSchema();
			/* turn into list of options */
			schema.skillCategory = new StringField({ required: true, initial: "strength" });
			schema.diceBonus = new NumberField({ required: true, integer: true, initial: 1 });

			return schema;
	}
  }

  export class TechniqueData extends FeatData {
	static defineSchema() {
		const schema = super.defineSchema();
			schema.staminaCost = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			});
			schema.techniqueType = new StringField({ required: true, initial: "spell" });
			
			return schema;
	}
  }

  export class TraitData extends FeatData {
	static defineSchema() {
		const schema = super.defineSchema();
			/* turn into list of options */
			schema.traitType = new StringField({ required: true, initial: "positive" });

			return schema;
	}
  }

  export class WeaknessData extends FeatData {
	static defineSchema() {
		const schema = super.defineSchema();
			/* turn into list of options */

			schema.testValue = new NumberField({ required: true, integer: true, initial: 0 });
			
			schema.threshold1Description = new HTMLField();
			schema.threshold2Description = new HTMLField();
			schema.threshold3Description = new HTMLField();
			schema.threshold4Description = new HTMLField();
			schema.threshold5Description = new HTMLField();

			return schema;
	}
  }

  export class StatusData extends FeatData {
	static defineSchema() {
		const schema = super.defineSchema();
			schema.isTurnBased = new StringField({ required: true, initial: "true" });
			schema.turnCount = new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			});

			return schema;
	}
  }

  /*Hooks.on("init", () => {
	CONFIG.Actor.dataModels.person = CharacterData;
	CONFIG.Actor.dataModels.monster = CharacterData;
	CONFIG.Actor.dataModels.shop = CharacterData;

	CONFIG.Item.dataModels.weapon = WeaponData;
	CONFIG.Item.dataModels.wearable = WearableData;
	CONFIG.Item.dataModels.stuff = StuffData;

	CONFIG.Item.dataModels.skill = SkillData;
	CONFIG.Item.dataModels.technique = TechniqueData;
	CONFIG.Item.dataModels.trait = TraitData;
	CONFIG.Item.dataModels.weakness = WeaknessData;
	CONFIG.Item.dataModels.status = StatusData;
  });*/

  // Export Actors
export {CharacterData as BoilerplateActorBase};
export {CharacterData as BoilerplatePerson};
export {CharacterData as BoilerplateMonster};
export {CharacterData as BoilerplateShop};

// Export Items
export {ItemData as BoilerplateItemBase};
export {WeaponData as BoilerplateWeapon};
export {WearableData as BoilerplateWearable};
export {StuffData as BoilerplateStuff};

export {SkillData as BoilerplateSkill};
export {TechniqueData as BoilerplateTechnique};
export {TraitData as BoilerplateTrait};
export {WeaknessData as BoilerplateWeakness};
export {StatusData as BoilerplateStatus};

/*  // Export Actors
export {CharacterData};
export {CharacterData};
export {CharacterData};
export {CharacterData};

// Export Items
export {ItemData};
export {WeaponData};
export {WearableData};
export {StuffData};

export {SkillData};
export {TechniqueData};
export {TraitData};
export {WeaknessData};
export {StatusData};*/