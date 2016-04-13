styleActive = {
    font: "28px VT323",
    fill: "#ff0044",
    align: "left"
};
styleInactive = {
    font: "28px VT323",
    fill: "#ddffdd",
    align: "left"
};
eLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "-", "*", "/", "!", "@", "$", "%", "&", "+", "?", "|", "_"];

function rollingLetterClass() {
    this.eIndex = eLetters.length - 1;
}
rollingLetterClass.prototype.setNext = function() {
    this.eIndex += 1;
    if (this.eIndex > (eLetters.length - 1)) {
        this.eIndex = 0;
    }
}
rollingLetterClass.prototype.setPrev = function() {
    this.eIndex -= 1;
    if (this.eIndex < 0) {
        this.eIndex = (eLetters.length - 1);
    }
}
rollingLetterClass.prototype.get = function() {
    return eLetters[this.eIndex];
}
    

    
function rollingTextInput(eLength, x, y, d, game) {
    this.game = game;
    this.complete = 0;
    this.active = 0;
    this.count = 0;
    this.eText = [];
    this.eText[0] = {   roll: new rollingLetterClass(),
                        obj:  this.game.add.text(x, y, "_", styleActive) };
    for (var i = 1; i < eLength; i++) {
        this.eText[i] = {   roll: new rollingLetterClass(),
                            obj:  this.game.add.text(x + i*d, y, "_", styleInactive) } ;
    }
    this.eText[i] = {obj: this.game.add.text(x + (eLength+2)*d, y, "OK", styleInactive)};    
}

rollingTextInput.prototype.update = function() {
    if (this.count++ > 5) {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            if (this.active == (this.eText.length - 1)) {
                // get name
                // exit
                this.complete = 1;
            }
            else {
                this.eText[this.active].roll.setNext();
                this.eText[this.active].obj.text = this.eText[this.active].roll.get();
            } 
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            if (this.active == (this.eText.length - 1)) {
                // get name
                // exit
                this.complete = 1;
            }
            else {
                this.eText[this.active].roll.setPrev();
                this.eText[this.active].obj.text = this.eText[this.active].roll.get();
            } 
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            var old = this.active;
            this.active -= 1;
            if(this.active < 0) {
                this.active = this.eText.length - 1;
            } 
            this.eText[old].obj.setStyle(styleInactive);
            this.eText[this.active].obj.setStyle(styleActive);
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            var old = this.active;
            this.active += 1;
            if(this.active > (this.eText.length - 1)) {
                this.active = 0;
            } 
            this.eText[old].obj.setStyle(styleInactive);
            this.eText[this.active].obj.setStyle(styleActive);
        }        
        
        this.count = 0;
    }
}

rollingTextInput.prototype.getName = function() {
    var str;
    this.update();
    if (this.complete) {
        str = '';
        for (var i = 0; i < (this.eText.length - 1); i++) {
            str += this.eText[i].roll.get();
        }
    }
    return str;
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {create: create, update: update});

function create() {
    game.world.setBounds(0, 0, 800, 600);    
    rollInput = new rollingTextInput(8, 200, 300, 30, game);
}
var rollName;
function update() {
    if (!rollName) {
        if (rollName = rollInput.getName()) {
            alert(rollName);
        }
    }
}