/**
 * Story state.
 */
function Team() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Team.prototype = proto;

Team.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Team.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"team");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
};

Team.prototype.startGame = function() {
	this.game.state.start("Menu");
};