/**
 * Level2 state.
 */
function Level2() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level2.prototype = proto;

Level2.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	
	this.bg = this.game.add.sprite(0, 0, "spookybg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	this.music = this.add.sound("spookysong") ;
	this.music.loop =  true;
    this.music.allowMultiple=true ;
    this.music.play() ;
	
	 this.map = this.game.add.tilemap("pjgame");
	 this.map.addTilesetImage('tile_set');
	 this.maplayer = this.map.createLayer("Tile Layer 1");
	 this.maplayer2 = this.map.createLayer("Tile Layer 2");
	 this.maplayer3 = this.map.createLayer("Tile Layer 3");
	 this.maplayer.resizeWorld();
	 this.maplayer2.resizeWorld();
	 this.maplayer3.resizeWorld();
	 this.map.setCollisionBetween(0, 8000, true, this.maplayer);
	 //this.map.setCollisionBetween(0, 9999, true, this.maplayer2);
	 this.map.setCollisionBetween(0, 8000, true, this.maplayer3);
	 
	 this.enemies = this.add.group();

		for (x in this.map.objects.Object) {
			var obj = this.map.objects.Object[x];
			 if(obj.type == "player"){
				 this.player = this.addPlayer(obj.x,obj.y);
				 this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
			} else if (obj.type == "enemy1") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "enemy2") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "enemy3") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "enemy4") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "enemy5") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "enemy7") {
				
				var c = this.addSkel(obj.x, obj.y);
				this.enemies.add(c);
			} else if (obj.type == "goal") {
				this.g =this.addGoal(obj.x,obj.y);
				
				// เพิ่ม sprite goal
				// this.goal = this.addGoal(obj.x,obj.y);
			}
		}
		
	this.createWeapon();
	//this.player.events.onInputDown.add(this.fireWeapon, this);
};

Level2.prototype.update = function() {
	if(this.player == null){
		return;
	}
	
	//this.game.physics.arcade.collide(this.player, this.maplayer);
	//this.game.physics.arcade.collide(this.enemies, this.maplayer);
	
	this.game.physics.arcade.collide(this.player, this.maplayer);
	this.game.physics.arcade.collide(this.g, this.maplayer);
	this.game.physics.arcade.collide(this.g, this.maplayer3);
	this.game.physics.arcade.collide(this.enemies, this.maplayer);
	//this.game.physics.arcade.collide(this.player, this.maplayer3);
	this.game.physics.arcade.collide(this.enemies, this.maplayer3);
	this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy,null,this);
	this.game.physics.arcade.collide(this.player, this.maplayer3, this.onCollide,null,this);
	this.game.physics.arcade.collide(this.player, this.g, this.onCollideGate,null,this);
	this.game.physics.arcade.collide(this.weapon1.bullets, this.enemies, this.onCollideBullet,null,this);

	
	if(this.player.body.velocity.y==0){
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x = -300;
			this.player.play("walk");
			this.player.scale.x = -0.2;
			this.player.scale.y = 0.2;
			//this.player.scale.set(0.2);
			this.player.body.drag.setTo(100, 0);
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x = 300;
			this.player.play("walk");
			this.player.scale.x = 1;
			this.player.scale.set(0.2);
			this.player.body.drag.setTo(100, 0);
			//this.player.x=6800;
		} else {
			this.player.body.velocity.x = 0;
			this.player.play("idle");
			this.player.scale.set(0.2);	
		}
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -800;
			this.player.body.velocity.x = 10;
			this.player.play("jump");
			this.player.scale.set(0.2);
			this.player.body.drag.setTo(300, 0);
			if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -300;
				this.player.play("walk");
				this.player.scale.x = -1;
				this.player.scale.set(0.2);
				//this.player.body.drag.setTo(100, 0);
				
				
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 450;
				this.player.play("walk");
				this.player.scale.x = 1;
				this.player.scale.set(0.2);
				//this.player.body.drag.setTo(100, 0);
			}
		}
		
	}
	
	if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.player.play("attack");
		this.player.scale.set(0.2);
		this.fireWeapon();
		
		this.music = this.add.sound("explotion") ;
	    this.music.play() ;
	}
	
	
};


Level2.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(10,"Bullet",1);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player, 30,-30);
	this.weapon1.bulletSpeed = 2000;
	this.weapon1.fireAngle = 360;
	this.weapon1.rate = 50;
	this.weapon1.bulletGravity.y=-1000;
};

Level2.prototype.fireWeapon = function() {
	this.weapon1.fire();
};

Level2.prototype.addSkel = function(x1, y) {
	var c = this.add.sprite(x1, y, "skel");
	c.animations.add("idle", mframe("idle", 12), 12, true);
	
	c.anchor.set(0, 1);
	c.smoothed = false;
	this.game.physics.arcade.enable(c);
	c.play("idle");
	this.game.physics.enable(c);
	
	c.body.drag.setTo(500, 0);
	c.body.collideWorldBounds = true;
	c.scale.x = -0.15;
	c.scale.y= 0.15;
	//c.scale.set(0.15);
	
	return c;
};

Level2.prototype.addPlayer = function(x1, y) {
	var t = this.add.sprite(x1, y, "cop");
	t.animations.add("attack", mframe("attack", 6), 12, true);
	t.animations.add("die", mframe("die", 9), 12, true);
	t.animations.add("idle", mframe("idle", 8), 12, true);
	t.animations.add("jump", mframe("jump", 8), 12, true);
	t.animations.add("walk", mframe("walk", 8), 12, true);
	
	t.anchor.set(0, 1);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	this.game.physics.enable(t);
	
	t.body.drag.setTo(500, 0);
	t.body.collideWorldBounds = true;
	return t;
};

Level2.prototype.addGoal = function(x, y) {
	var t = this.add.sprite(x+10, y-10, "door");
	t.scale.x=0.25;
	t.scale.y=0.25;
	
	t.anchor.set(0, 1);
	//t.y=t.y+500;
	//t.smoothed = false;
	this.game.physics.arcade.enable(t);
	
	this.game.physics.enable(t);
	t.body.collideWorldBounds = true;
	return t;
};

function mframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key + i );
	}
	return f;
}
Level2.prototype.hitEnemy=function(p, x){
	// player ชนผี
	x.damage(1);
	this.game.state.start("Level2");
	this.game.sound.stopAll();
};

Level2.prototype.onCollide=function(p, x){
	//player ชน แมพ
	p.damage(1);
	this.game.state.start("Level2");
	this.game.sound.stopAll();
};
Level2.prototype.onCollideGate=function(p, x){
	//function ชน โกล
	p.damage(1);
	this.game.state.start("Menu");
	this.game.sound.stopAll();
};

Level2.prototype.onCollideBullet=function(b, e){
	//กระสุนชนผี
	e.kill();
	b.kill();

	this.music = this.add.sound("gun") ;
    this.music.play() ;
};