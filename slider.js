var pos = 0;
var numOfImages = document.getElementsByClassName("image-1").length;

function getImageToSlide(pos) {
    var animImage = document.getElementsByClassName("anim");
    var animImage2 = document.getElementsByClassName("anim-2");
    if(animImage2.length!=0)
    {
        var image = animImage2[0];
        image.className="image-1";
    }
    if(animImage.length!=0)
    {
        var image = animImage[0];
        image.className="image-1";
    }
    var images = document.getElementsByClassName("image-1");
    return images[pos];
}

function getNewBackground(pos) {
    var opaqImage = document.getElementsByClassName("opaq");
    if(opaqImage.length!=0) {
        var image = opaqImage[0];
        image.className = "image";
    }
    var images = document.getElementsByClassName("image");
    return images[pos];
}

function changeActiveBtn(idx) {
    // alert(idx);
    var currAct = document.getElementsByClassName("act");
    var prevPos;
    if(currAct.length!=0) {
        var curr = currAct[0];
        var prevIndex = [...curr.parentElement.children].indexOf(curr)
        curr.className = "fa fa-circle inact";
    }
    var btns = document.getElementsByClassName("inact");
    btns[idx].className = "fa fa-circle act";

    if(prevIndex == numOfImages-1 && idx == 0) {
        var newBackground = getNewBackground(pos);
        newBackground.className = "opaq";
        var imageToSlide = getImageToSlide(pos);
        imageToSlide.className = "anim";
        imageToSlide.style.top = "0%";
        return;
    }
    if(prevIndex == 0 && idx == numOfImages-1) {
        var newBackground = getNewBackground(pos);
        newBackground.className = "opaq";
        var imageToSlide = getImageToSlide(pos);
        imageToSlide.className = "anim-2";
        imageToSlide.style.top = "0%";
        return;
    }
    if(prevIndex > idx) {
        var newBackground = getNewBackground(pos);
        newBackground.className = "opaq";
        var imageToSlide = getImageToSlide(pos);
        imageToSlide.className = "anim-2";
        imageToSlide.style.top = "0%";
    }
    if (prevIndex < idx) {
        var newBackground = getNewBackground(pos);
        newBackground.className = "opaq";
        var imageToSlide = getImageToSlide(pos);
        imageToSlide.className = "anim";
        imageToSlide.style.top = "0%";
    }
}
var div = document.getElementsByClassName('fg-slider__dots');
for (var i = 0, len = div[0].children.length; i < len; i++)
{
    (function(index){
        div[0].children[i].onclick = function(){
            changeActiveBtn(index);
        }    
    })(i);
}

function slideDown() {
    if(pos == numOfImages-1) {
        pos = 0;
    } else {
        pos += 1;
    }
    changeActiveBtn(pos);
}
function slideUp() {
    if(pos == 0) {
        pos = numOfImages - 1;
    } else {
        pos -= 1;
    }
    changeActiveBtn(pos);
}