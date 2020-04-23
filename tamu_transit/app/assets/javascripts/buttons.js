


function openMenu(){
    document.getElementById("menubtn").style.transition = "left 1s";
    document.getElementById('menubtn').style.left = "385px";
    document.getElementById('menubtn').innerHTML = "<i class=\"fa fa-caret-left\" style=\"font-size:24px\"></i>";
    document.getElementById("menubtn").setAttribute("onClick","closeMenu()");
    document.getElementById("menu").style.left = "0px";
    document.getElementById("map").style.transition = "left 1s";
    document.getElementById("map").style.left = "408px";
    //document.getElementById("container").style.left = "0px";
    document.getElementById("second").style.left = "365px";
    document.getElementById("backToTop").style.left = "359px";
    
}

function closeMenu(){
    document.getElementById("menubtn").style.transition = "left 1s";
    document.getElementById('menubtn').style.left = "0px";
    document.getElementById('menubtn').innerHTML = "<i class=\"fa fa-caret-right\" style=\"font-size:24px\"></i>";
    document.getElementById('menubtn').setAttribute("onClick","openMenu()");
    document.getElementById("menu").style.left = "-408px";
    document.getElementById("map").style.transition = "left 1s";
    document.getElementById("map").style.left = "0px";
    //document.getElementById("container").style.left = "-408px";
    document.getElementById("second").style.left = "-43px";
    document.getElementById("backToTop").style.left = "-49px";
    
}

function busButton(){//put all functions for bus button here
    document.getElementById("VeoOption").style.visibility = "visible";
    document.getElementById("output").innerHTML = "";
    
    
}

function bikeButton(){//put all functions for bike button here
    document.getElementById("VeoOption").style.visibility = "visible";
    document.getElementById("output").innerHTML = "";
   
   /*for testing
   var ins1 = [instruction = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];
   var ins2 = [instruction = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"];
   var ins3 = [instruction = "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"];
    var steps = [ ins1,ins2,ins3];
    var step = [instructions = ["one step is all it takes to break this thing smh"]];
    addDirectionLeg("12:26 PM","Somewhere in College stattion you know","her is where you would put the city",0,"WALKING","ABout 1hr 20 min, 10 miles",steps);
    addDirectionLeg("12:26 PM","Somewhere in College stattion you know","her is where you would put the city",1,"not","ABout 1hr 20 min, 10 miles",step);
    */
}

function walkButton(){//put all functions for walking button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("output").innerHTML = "";
}

function carButton(){//put all functions for car button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("output").innerHTML = "";

}

function wheelchairButton(){//put all functions for wheelchair accessible button here
    document.getElementById("VeoOption").style.visibility = "hidden";
    document.getElementById("output").innerHTML = "";
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

function Flip(){
    var text = document.getElementById('currentLocation').value;
    var text2 = document.getElementById('destination').value;
    document.getElementById('currentLocation').value = text2;
    // document.getElementById('currentLocation').click();
    document.getElementById('destination').value = text;
    // document.getElementById('destination').click();
}
var heightChanged;

function showDetails(idx){
    //console.log("open"+idx);
    
    var d = document.getElementsByClassName("tab");
    

    var numDir = d[idx].getElementsByTagName("DIV")[1].getElementsByClassName("step").length;
    var h =0;
    for(var i =0;i<numDir;i++){
        if(d[idx].getElementsByTagName("DIV")[1].getElementsByClassName("step")[i].getElementsByTagName("DIV").length >=1){
            h+=57.4;
        }else{
            h+=41.4;
        }
    }
    d[idx].getElementsByTagName("DIV")[1].style.height = h+"px";//div called steps
    d[idx].getElementsByTagName("DIV")[0].style.height = 121+h+"px"; //dotted line Visual
    d[idx].getElementsByTagName("button")[0].setAttribute("onClick","hideDetails(" +idx+")");//changes function on
    
    d[idx].style.height= 156+h+"px";
    heightChanged = h;
    document.getElementById("menu").height+=heightChanged;
    
}

function hideDetails(idx){
    //console.log("close" + idx);
    var d = document.getElementsByClassName("tab");
    
    //console.log(d);

    d[idx].getElementsByTagName("DIV")[1].style.height = "0px";
    d[idx].getElementsByTagName("DIV")[0].style.height = "121px";
    d[idx].getElementsByTagName("button")[0].setAttribute("onClick","showDetails(" +idx+")");
    d[idx].style.height= "156px";
    document.getElementById("menu").height-=heightChanged;
}

function backToTop(){
    console.log(document.getElementById("menu").scrollTop);
    document.getElementById("menu").scrollTop = 0;
}

function loadingScreen(){
    
var elem = document.getElementById("loading");   
  var pos = 3;
  var id = setInterval(frame, 0);
  function frame() {
    if (pos == -408) {
      clearInterval(id);
    } else {
      pos--; 
      elem.style.left = pos + 'px'; 
    }
  }
    
      
    
}




function closePhoneTab(){
    document.getElementsByClassName("phoneNumber")[0].style.visibility = "hidden";
}

var darkModeIO = false;
function darkMode(){
    
    var b = document.getElementById("darkMode"); // button
    var menuBtn = document.getElementById("menubtn");
    var destBar = document.getElementById("currentLocation");
    var output = document.getElementById("output");
    var search1 = document.getElementById("search1");
    var search2 = document.getElementById("search2");
    var tab = document.getElementById("tab");
    var mode = document.getElementById("mode");
    var details = document.getElementById("details");
    var estimate = document.getElementById("estimate");
    var buttons = [b,menuBtn];
    var divs = [output,destBar,search1,search2, tab, mode, details, estimate];
    if(darkModeIO==false){//turning on
        /*
        .style.color = "#d59563";
        .style.backgroundColor = "#242f3e";
        
        #1f1f1f //buttons backgroun color
        
        */
        var btnBackGround = "#1f1f1f";
        var backGround = "#242f3e";
        var colr = "#d59563";
        
        for(var i =0;i<buttons.length;i++){
            buttons[i].style.color = colr;
            buttons[i].style.backgroundColor = btnBackGround;
        }
        
        for(var i =0;i<divs.length;i++){
            divs[i].style.color = colr;
            divs[i].style.backgroundColor = backGround;
        }
        
        
        
        
        
        darkModeIO = !darkModeIO;
        
       
        
        
    }else{//turning off
    
        /*
            .style.color = "rgb(122,0,0)";
            .style.backgroundColor = "rgb(235,232,224)";
        */
        var btnBackGround = "rgb(235,232,224)";
        var backGround = "white";
        var colr = "rgb(122,0,0)";
        
        for(var i =0;i<buttons.length;i++){
            buttons[i].style.color = colr;
            buttons[i].style.backgroundColor = btnBackGround;
        }
        
        for(var i =0;i<divs.length;i++){
            divs[i].style.color = colr;
            divs[i].style.backgroundColor = backGround;
        }

        darkModeIO = !darkModeIO;
    }
}