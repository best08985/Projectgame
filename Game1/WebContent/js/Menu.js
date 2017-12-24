/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "startbg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var cx=this.world.centerX;
	var mstart = this.add.sprite(650,180,"play");
	var mstory = this.add.sprite(650,180+120,"story");
	var mteam = this.add.sprite(650,180+120*2,"devteam");

	mstart.anchor.set(0.5, 0.5);
	mstory.anchor.set(0.5, 0.5);
	mteam.anchor.set(0.5, 0.5);
	
	mstart.inputEnabled = true;
	mstory.inputEnabled = true;
	mteam.inputEnabled = true;
	
    mstart.events.onInputDown.add(this.startLevel, this);
    mstory.events.onInputDown.add(this.startStory, this);
    mteam.events.onInputDown.add(this.startTeam, this);    
};
Menu.prototype.startLevel = function(){
	this.game.state.start("Level");
};
Menu.prototype.startStory = function(){
	this.game.state.start("Story");
};
Menu.prototype.startTeam = function(){
	this.game.state.start("Team");
};
