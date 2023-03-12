import { MODULE_NAME } from "../const.mjs";

export class INNIL_ADDITIONS {
  // Add Equipement types
  static add_equipment_types = () => {
    if (!game.settings.get(MODULE_NAME, "additionSettings").add_equipment_types) return;

    // Wand Equipement type
    const toAdd = { wand: "Wand" };
    foundry.utils.mergeObject(CONFIG.DND5E.equipmentTypes, toAdd);
    foundry.utils.mergeObject(CONFIG.DND5E.miscEquipmentTypes, toAdd);
  };

  // Add Turned Condition
  static add_conditions = () => {
    if (!game.settings.get(MODULE_NAME, "additionSettings").add_conditions) return;

    const toAdd = { turned: "Turned" };
    foundry.utils.mergeObject(CONFIG.DND5E.conditionTypes, toAdd);
  };
}
