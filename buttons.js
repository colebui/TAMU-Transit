var bus = document.getElementById("bus");
var bike = document.getElementById("bike");
var walk = document.getElementById("walk");
var car = document.getElementById("car");
var wheelchair = document.getElementById("wheelchair");
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menubtn");
var veorideCheckBox = document.getElementById("VeoOption");
var map = document.getElementById("map");
var text1 = document.getElementById("search1");
var text2 = document.getElementById("search2");
var destination = document.getElementById("destination");
var currentLocation = document.getElementById("currentLocation");
var output = document.getElementById("output");
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
    bus.style.color = "Black";
    bike.style.color = "#a7a7a7";
    walk.style.color = "#a7a7a7";
    car.style.color = "#a7a7a7";
    wheelchair.style.color = "#a7a7a7";
    output.innerHTML = "<h1>  Bus Tab </h1>";

}

function bikeButton(){//put all functions for bike button here
    veorideCheckBox.style.visibility = "visible";
    bus.style.color = "#a7a7a7";
    bike.style.color = "Black";
    walk.style.color = "#a7a7a7";
    car.style.color = "#a7a7a7";
    wheelchair.style.color = "#a7a7a7";
    output.innerHTML = "<h1>  Bike Tab </h1>";

}

function walkButton(){//put all functions for walking button here
    veorideCheckBox.style.visibility = "hidden";
    bus.style.color = "#a7a7a7";
    bike.style.color = "#a7a7a7";
    walk.style.color = "Black";
    car.style.color = "#a7a7a7";
    wheelchair.style.color = "#a7a7a7";
    output.innerHTML = "<h1>  Walk Tab </h1>";

}

function carButton(){//put all functions for car button here
    veorideCheckBox.style.visibility = "hidden";
    bus.style.color = "#a7a7a7";
    bike.style.color = "#a7a7a7";
    walk.style.color = "#a7a7a7";
    car.style.color = "Black";
    wheelchair.style.color = "#a7a7a7";

    output.innerHTML = "<h1>  Car Tab </h1>";
}

function wheelchairButton(){//put all functions for wheelchair accessible button here
    veorideCheckBox.style.visibility = "hidden";
    bus.style.color = "#a7a7a7";
    bike.style.color = "#a7a7a7";
    walk.style.color = "#a7a7a7";
    car.style.color = "#a7a7a7";
    wheelchair.style.color = "Black";

    output.innerHTML = "<h1>  Wheelchair Tab </h1>";
    
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

