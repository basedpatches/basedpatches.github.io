//BEGIN INPUT VALIDATION
function setInputFilter(textbox, inputFilter){
    const events = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"];
    events.forEach(function(event){
        textbox.addEventListener(event, function(){
            if (inputFilter(this.value)){
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")){
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else{
                this.value = "";
            }
        });
    })
    textbox.addEventListener("blur", function(){
        if (/^-?0*\D*\s?$/.test(this.value)){
            this.value = "0";  
        } else if (/\b0+/.test(this.value)){
            this.value = this.value.replace(/\b0+/, '');
        }
    });
}

var modAbil = document.getElementById("modAbil");
var modProf = document.getElementById("modProf");
var modAdd = document.getElementById("modAdd");
var critValue = document.getElementById("critValue");

setInputFilter(modAbil, function(value){
    return /^-?\d*$/.test(value);
});
setInputFilter(modProf, function(value){
    return /^\d*$/.test(value);
});
setInputFilter(modAdd, function(value){
    return /^-?\d*$/.test(value);
});
setInputFilter(critValue, function(value){
    return /^\d*$/.test(value);
});
//END INPUT VALIDATION

//BEGIN ATTACK WORKSPACE
const acSpace = Array.from(new Array(21), (x,i) => i+5);
const attackSpace = Array.from(new Array(20), (x,i) => i+1);


document.getElementById("bigButton").onclick = function(){
    let attackBonus = parseInt(modAbil.value, 10) + parseInt(modProf.value, 10) + parseInt(modAdd.value, 10);
    let attackRoll = [];
    attackSpace.forEach(function(roll, index){
        attackRoll[index] = roll + attackBonus;
    });
    document.getElementById("displayResult").innerHTML = attackRoll.toString();
    
    attackPlot = document.getElementById('attackSpace');
	Plotly.newPlot(attackPlot, [{x:acSpace, y:acSpace}], {margin:{t:0}});
};
//END ATTACK WORKSPACE