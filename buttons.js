var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menubtn");
var veorideCheckBox = document.getElementById("VeoOption");
var map = document.getElementById("map");
var text1 = document.getElementById("search1");
var text2 = document.getElementById("search2");
var destination = document.getElementById("destination");
var currentLocation = document.getElementById("currentLocation");
var w = window.innerWidth;
function openMenu(){
    menuBtn.style.left = "408px";
    menu.style.left = "0px";
    menuBtn.innerHTML = "<i class=\"fa fa-caret-left\" style=\"font-size:24px\"></i>";
    map.style.left = "408px";
    map.style.width = w-408+"px";
    menuBtn.setAttribute("onClick","closeMenu()");
}

function closeMenu(){
    menuBtn.style.left = "0px";
    menu.style.left = "-408px";
    menuBtn.innerHTML = "<i class=\"fa fa-caret-right\" style=\"font-size:24px\"></i>";
    map.style.left = "0px";
    map.style.width = "100%";
    menuBtn.setAttribute("onClick","openMenu()");
}

function busButton(){//put all functions for bus button here
    veorideCheckBox.style.visibility = "hidden";
}

function bikeButton(){//put all functions for bike button here
    veorideCheckBox.style.visibility = "visible";
    

}

function walkButton(){//put all functions for walking button here
    veorideCheckBox.style.visibility = "hidden";
   

}

function carButton(){//put all functions for car button here
    veorideCheckBox.style.visibility = "hidden";
    
}

function wheelchairButton(){//put all functions for wheelchair accessible button here
    veorideCheckBox.style.visibility = "hidden";
}

function firstbox(){
    text1.style.visibility = "visible";
    text2.style.visibility = "hidden";
    
    currentLocation.style.width = "82%";
    currentLocation.style.borderBottomRightRadius = "0px";
    currentLocation.style.borderTopRightRadius = "0px";

    destination.style.width = "92%";
    destination.style.borderBottomRightRadius = "4px";
    destination.style.borderTopRightRadius = "4px";
}

function secondbox(){
    text1.style.visibility = "hidden";
    text2.style.visibility = "visible";
    
    currentLocation.style.width = "92%";
    currentLocation.style.borderBottomRightRadius = "4px";
    currentLocation.style.borderTopRightRadius = "4px";

    destination.style.width = "82%";
    destination.style.borderBottomRightRadius = "0px";
    destination.style.borderTopRightRadius = "0px";
}

function Directions(){

}

