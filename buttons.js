var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menubtn");
var veorideCheckBox = document.getElementById("veoride");
var checkboxText = document.getElementById("veorideText")
var map = document.getElementById("map");
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
    checkboxText.style.visibility = "hidden";
}

function bikeButton(){//put all functions for bike button here
    veorideCheckBox.style.visibility = "visible";
    checkboxText.style.visibility = "visible";

}

function walkButton(){//put all functions for walking button here
    veorideCheckBox.style.visibility = "hidden";
    checkboxText.style.visibility = "hidden";

}

function carButton(){//put all functions for car button here
    veorideCheckBox.style.visibility = "hidden";
    checkboxText.style.visibility = "hidden";
}

function wheelchairButton(){//put all functions for wheelchair accessible button here
    veorideCheckBox.style.visibility = "hidden";
    checkboxText.style.visibility = "hidden";
}

