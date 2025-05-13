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
			}),
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
		return {
			isEquipped: new BooleanField({ required: true, initial: false }),
			durability: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 10 }),
				min: new NumberField({ required: true, integer: true, initial: 0 }),
				max: new NumberField({ required: true, integer: true, initial: 10 })
			}),
			lightPreset: new NumberField({ required: true, integer: true, initial: 0 }),
			addedDef: new NumberField({ required: true, integer: true, initial: 0 })
		}
	}
  }

  export class WeaponData extends EquippableData {
	static defineSchema() {
		return {
			/* turn into list of options */
			skillCategory: new StringField({ required: true, initial: "strength" }),
			handedness: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			}),
			range: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			}),
			/* turn into list of options */
			rangeType: new StringField({ required: true, initial: "short" }),
			/* turn into list of options */
			damageType: new StringField({ required: true, initial: "blunt" }),
			damage: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 5 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			}),
			isWeapon: new BooleanField({ required: true, initial: true }),
			isShield: new BooleanField({ required: true, initial: false })
		}
	}
  }

  export class WearableData extends EquippableData {
	static defineSchema() {
		return {
			/* turn into list of options */
			wearableSlot: new StringField({ required: true, initial: "top" })
		}
	}
  }

  export class StuffData extends ItemData {
	static defineSchema() {
		return {
		}
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
		return {
			/* turn into list of options */
			skillCategory: new StringField({ required: true, initial: "strength" }),
			diceBonus: new NumberField({ required: true, integer: true, initial: 1 })
		}
	}
  }

  export class TechniqueData extends FeatData {
	static defineSchema() {
		return {
			staminaCost: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 1 })
			}),
			isSpell: new BooleanField({ required: true, initial: false })
		}
	}
  }

  export class TraitData extends FeatData {
	static defineSchema() {
		return {
			/* turn into list of options */
			traitType: new StringField({ required: true, initial: "positive" })
		}
	}
  }

  export class WeaknessData extends FeatData {
	static defineSchema() {
		return {
			/* turn into list of options */
			weaknessType: new StringField({ required: true, initial: "" })
		}
	}
  }

  export class StatusData extends FeatData {
	static defineSchema() {
		return {
			isTurnBased: new BooleanField({ required: true, initial: true }),
			turnCount: new SchemaField({
				value: new NumberField({ required: true, integer: true, initial: 1 }),
				min: new NumberField({ required: true, integer: true, initial: 0 })
			}),
		}
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
