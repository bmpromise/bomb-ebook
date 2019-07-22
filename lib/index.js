var left = document.getElementById("pageLeft"),
    right = document.getElementById("pageRight"),
    list = document.getElementById("list"),
    op = document.getElementById("op"),
    ListObj = document.getElementById("ListObj"),
    img = document.getElementById("img"),
    IMGSRC = "res/",
    page = 23,
    nowPage = 0,
    indexObj = {
        5: "電線",
        6: "按鈕",
        7: "小鍵盤",
        8: "老師說",
        9: "先到先得",
        11: "記憶遊戲",
        12: "摩斯密碼",
        13: "更複雜的電線",
        12: "電線程序",
        15: "迷宮",
        16: "暗號",
        17: "其他模組",
    },
    indexAry = [],
    lastFlag = -1;

function findIndex() {
    var flag = -1;
    indexAry.map(function (val, inx) {
        if (val <= nowPage + 1 && inx > flag) {
            flag = inx;
        }
    })
    lastFlag = flag;
    return flag;
}
function changePage(c) {
    switch (typeof c) {
        case "number":
            nowPage = c;
            break;
        case "string":
            switch (c) {
                case "right":
                    nowPage = nowPage + 1;
                    break;
                case "left":
                    nowPage = nowPage - 1;
                    break;
                case "up":
                    var _f = findIndex();
                    nowPage = _f > 0 ? indexAry[_f - 1] - 1 : 0;
                    break;
                case "down":
                    var _f = findIndex();
                    if (_f > 0 && _f + 1 >= indexAry.length) {
                        nowPage = indexAry[indexAry.length - 1] - 1; // 超過最後一個標籤,退回最後的標籤
                    } else {
                        nowPage = _f >= 0 ? indexAry[_f + 1] - 1 : indexAry[0] - 1; // 下一個標籤
                    }
                    break;
            }
            break;
        default:
            return console.log("page Error");
    }
    nowPage = nowPage < 0 ? page - Math.abs(nowPage) % page : nowPage % page;
    img.src = IMGSRC + "b" + (nowPage + 1) + ".jpg";
    // window.getComputedStyle(indexAry[5] , ":hover"); //ERROR
    if (lastFlag > 0) {
        //indexAry[];
    }
}

window.onkeydown = function (e) {
    var keynum, keychar;
    if (window.event) {
        keynum = e.keyCode; // IE
    } else if (e.which) {
        keynum = e.which; // Netscape/Firefox/Opera
    }

    keychar = String.fromCharCode(keynum);
    switch (keychar) {
        case '&':
            changePage("up")
            break;
        case '%':
            changePage("left")
            break;
        case '(':
            changePage("down")
            break;
        case '\'':
            changePage("right")
            break;
    }
}
var nowScale = 1,
    nowRegY = 0;
function MouseWheel(e) {
    e = e || window.event;
    //list.style.transform(e.x,e.y)


    if (e.wheelDelta <= 0 || e.detail > 0) {
        nowScale = 1;
        nowRegY = 1;
        img.style.cursor = "";
    } else if (nowScale == 1) {
        nowScale = 2;
        nowRegY = innerHeight / 2 - e.y;
    }
    img.style.transform = 'scale(' + nowScale + ') translateY(' + nowRegY + 'px)';
    img.style.transitionDuration = '.3s';
    img.style.overflow = "hidden";
}
// hook event listener on window object
if ('onmousewheel' in window) {
    window.onmousewheel = MouseWheel;
} else if ('onmousewheel' in document) {
    document.onmousewheel = MouseWheel;
} else if ('addEventListener' in window) {
    window.addEventListener("mousewheel", MouseWheel, false);
    window.addEventListener("DOMMouseScroll", MouseWheel, false);
}
// init
for (var i in indexObj) {
    var li = document.createElement("LI"),
        a = document.createElement("A")
    li.appendChild(document.createTextNode(indexObj[i]));
    li.style.userSelect = "none";
    a.p = i;
    a.appendChild(li);
    list.appendChild(a);
    a.onclick = function () {
        changePage((this.p - 1))
    }
    indexAry.push(i);
}

left.addEventListener("click", function (e) {
    changePage("left")
})
right.addEventListener("click", function (e) {
    changePage("right")
})
op.addEventListener("click", function (e) {
    ListObj.style.right = ListObj.style.right == "0%" ? "-18%" : "0%";
})
ListObj.style.right = "0%";
ListObj.style.animationDuration = "2s";
window.onload = function () {
    changePage(0);
}