
function openMenu(){
    document.getElementById('menubtn').style.left = "385px";
    document.getElementById('menubtn').innerHTML = "<i class=\"fa fa-caret-left\" style=\"font-size:24px\"></i>";
    document.getElementById("menubtn").setAttribute("onClick","closeMenu()");
    document.getElementById("menu").style.left = "0px";
    
}

function closeMenu(){
    
    document.getElementById('menubtn').style.left = "0px";
    document.getElementById('menubtn').innerHTML = "<i class=\"fa fa-caret-right\" style=\"font-size:24px\"></i>";
    document.getElementById('menubtn').setAttribute("onClick","openMenu()");
    document.getElementById("menu").style.left = "-408px";
    
}

function busButton(){//put all functions for bus button here
    document.getElementById("VeoOption").style.visibility = "visible";
    document.getElementById("bus").style.color = "Black";
    document.getElementById("bike").style.color = "#a7a7a7";
    document.getElementById("walk").style.color = "#a7a7a7";
    document.getElementById("car").style.color = "#a7a7a7";
    document.getElementById("wheelchair").style.color = "#a7a7a7";
}

function bikeButton(){//put all functions for bike button here
    document.getElementById("VeoOption").style.visibility = "visible";
    document.getElementById("bus").style.color = "#a7a7a7";
    document.getElementById("bike").style.color = "Black";
    document.getElementById("walk").style.color = "#a7a7a7";
    document.getElementById("car").style.color = "#a7a7a7";
    document.getElementById("wheelchair").style.color = "#a7a7a7";
}

function walkButton(){//put all functions for walking button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("bus").style.color = "#a7a7a7";
    document.getElementById("bike").style.color = "#a7a7a7";
    document.getElementById("walk").style.color = "Black";
    document.getElementById("car").style.color = "#a7a7a7";
    document.getElementById("wheelchair").style.color = "#a7a7a7";
}

function carButton(){//put all functions for car button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("bus").style.color = "#a7a7a7";
    document.getElementById("bike").style.color = "#a7a7a7";
    document.getElementById("walk").style.color = "#a7a7a7";
    document.getElementById("car").style.color = "Black";
    document.getElementById("wheelchair").style.color = "#a7a7a7";
}

function wheelchairButton(){//put all functions for wheelchair accessible button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("bus").style.color = "#a7a7a7";
    document.getElementById("bike").style.color = "#a7a7a7";
    document.getElementById("walk").style.color = "#a7a7a7";
    document.getElementById("car").style.color = "#a7a7a7";
    document.getElementById("wheelchair").style.color = "Black";
}

function firstbox(){
    document.getElementById("search1").style.visibility = "visible";
    document.getElementById("search2").style.visibility = "hidden";
    
    document.getElementById("currentLocation").style.width = "82%";
    document.getElementById("currentLocation").style.borderBottomRightRadius = "0px";
    document.getElementById("currentLocation").style.borderTopRightRadius = "0px";

    document.getElementById("destination").style.width = "92%";
    document.getElementById("destination").style.borderBottomRightRadius = "4px";
    document.getElementById("destination").style.borderTopRightRadius = "4px";
}

function secondbox(){
    document.getElementById("search1").style.visibility = "hidden";
    document.getElementById("search2").style.visibility = "visible";

    document.getElementById("currentLocation").style.width = "92%";
    document.getElementById("currentLocation").style.borderBottomRightRadius = "4px";
    document.getElementById("currentLocation").style.borderTopRightRadius = "4px";

    document.getElementById("destination").style.width = "82%";
    document.getElementById("destination").style.borderBottomRightRadius = "0px";
    document.getElementById("destination").style.borderTopRightRadius = "0px";
}

function Directions(){

}

