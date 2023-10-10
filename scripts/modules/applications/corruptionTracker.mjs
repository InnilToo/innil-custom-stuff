import { MODULE } from "../../const.mjs";

export class CorruptionTracker extends Application {
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 300,
      height: 150,
      classes: [MODULE, "corruption-tracker"],
      resizable: false,
      template: `modules/${MODULE}/templates/corruptionTracker.hbs`,
    });
  }

  /** @override */
  get title() {
    return `Corruption Tracker: ${this.actor.name}`;
  }

  /** @override */
  getData() {
    const data = super.getData();
    data.corruption = this.actor.getFlag(MODULE, "corruption") ?? 0;
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='increase']").click(this._increaseCorruption.bind(this));
    html.find("[data-action='decrease']").click(this._decreaseCorruption.bind(this));
  }

  async _increaseCorruption() {
    await this.actor.setFlag(MODULE, "corruption", (this.actor.getFlag(MODULE, "corruption") || 0) + 1);
    this.render();
  }

  async _decreaseCorruption() {
    await this.actor.setFlag(MODULE, "corruption", Math.max((this.actor.getFlag(MODULE, "corruption") || 0) - 1, 0));
    this.render();
  }
}
