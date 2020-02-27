var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menubtn");
function openMenu(){
    menuBtn.style.left = "408px";
    menu.style.left = "0px";
    menuBtn.innerHTML = "<i class=\"fa fa-caret-left\" style=\"font-size:24px\"></i>";

    menuBtn.setAttribute("onClick","closeMenu()");
}

function closeMenu(){
    menuBtn.style.left = "0px";
    menu.style.left = "-408px";
    menuBtn.innerHTML = "<i class=\"fa fa-caret-right\" style=\"font-size:24px\"></i>";

    menuBtn.setAttribute("onClick","openMenu()");
}