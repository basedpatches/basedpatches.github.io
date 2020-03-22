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

setInputFilter(modAbil, function(value){
    return /^-?\d*$/.test(value);
});

setInputFilter(modProf, function(value){
    return /^\d*$/.test(value);
});

setInputFilter(modAdd, function(value){
    return /^-?\d*$/.test(value);
});
//END INPUT VALIDATION

const acSpace = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,];

document.getElementById("bigButton").onclick = function(){
    let bonus = parseInt(modAbil.value, 10) + parseInt(modProf.value, 10) + parseInt(modAdd.value, 10);
    let reqRoll = acSpace;
    reqRoll.forEach(function(ac, index){
        reqRoll[index] = ac - bonus;
    });
    document.getElementById("displayResult").innerHTML = reqRoll.toString();
    reqRoll = acSpace;
};
