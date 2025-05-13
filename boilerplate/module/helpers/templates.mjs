/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/boilerplate/templates/actor/parts/actor-inventory.hbs',
    'systems/boilerplate/templates/actor/parts/actor-skills.hbs',
    'systems/boilerplate/templates/actor/parts/actor-traits.hbs',
    // Item partials
    /*'systems/boilerplate/templates/item/parts/item-effects.hbs',*/
  ]);
};
