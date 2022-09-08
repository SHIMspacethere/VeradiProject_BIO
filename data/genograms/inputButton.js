'use strict';


const urlImage = {
    'none': '../../static/image/genograms/none.png',
    'none2': '../../static/image/genograms/none2.png',
    'man': '../../static/image/genograms/man.png',
    'woman': '../../static/image/genograms/woman.png',
    'generation1' : '../../static/image/genograms/generation1.png',
    'generation2' : '../../static/image/genograms/generation2.png',
    'generation3' : '../../static/image/genograms/generation3.png',
    'generation4' : '../../static/image/genograms/generation4.png',
    'up_center' : '../../static/image/genograms/up_center.png',
    'up_line' : '../../static/image/genograms/up_line.png',
    'center1' : '../../static/image/genograms/center1.png',
    'center2' : '../../static/image/genograms/center2.png',
    'center3' : '../../static/image/genograms/center3.png',
    'line1' : '../../static/image/genograms/line1.png',
    'line2' : '../../static/image/genograms/line2.png',
    'line3' : '../../static/image/genograms/line3.png',
    'line4' : '../../static/image/genograms/line4.png',
    'Q' : '../../static/image/genograms/Q.png',
    'W' : '../../static/image/genograms/W.png',
    'E' : '../../static/image/genograms/E.png',
    'R' : '../../static/image/genograms/R.png',
    'A' : '../../static/image/genograms/A.png',
    'S' : '../../static/image/genograms/S.png',
    'D' : '../../static/image/genograms/D.png',
    'F' : '../../static/image/genograms/F.png',
    'Z' : '../../static/image/genograms/Z.png',
    'X' : '../../static/image/genograms/X.png',
    'C' : '../../static/image/genograms/C.png',
    'V' : '../../static/image/genograms/V.png',
}

// ------ 글로벌 변수 ------
const global_xnum = 7 
const global_ynum = 8   // can modify
const global_keyi = 3
const global_keyj = 4
let keySet = 0
let button_i = 0
let button_j = 0
let centerNum = 1

// ------ 글로벌 배열 선언 ------
let buttonArr = new Array(global_xnum)
for (let i = 0; i < buttonArr.length; i++) {
    buttonArr[i] = new Array(global_ynum)
}

let keyArr = new Array(global_keyi)
for (let i = 0; i < keyArr.length; i++) {
    keyArr[i] = new Array(global_keyj)
}


// ------ <버튼> 초기 생성 ------
function buttonBuild() {
    let x = global_xnum
    let y = global_ynum
    document.open()
    document.write('<body onkeydown="keyPadPress(event)">')
    document.write('<input type="button" value="초기화" onClick="buttonDefault()" style="float:left">')
    document.write('<input type="button" value="정립" onClick="settlement()" style="float:left">')
    document.write('<table id="buttonTable" width="200" height="200" border=1 style="float:left"> ')
    for (let i=1; i<x+1; i++) {
        document.write('<tr>')
        document.write('<td>')
        if (i==1){
            document.write("<img src='"+urlImage.generation1+"'>")
        }
        else if (i==3){
            document.write("<img src='"+urlImage.generation2+"'>")
        }
        else if (i==5){
            document.write("<img src='"+urlImage.generation3+"'>")
        }
        else if (i==7){
            document.write("<img src='"+urlImage.generation4+"'>")
        }
        else {}
        document.write('</td>')
        for (let j=1; j<y+1; j++) {
            document.write(
                '<td onclick="buttonSelect('+i+', '+j+')">'+
                '<img id="buttonImg['+i+']['+j+']" src="'+urlImage.none+'"></td>')
            buttonArr[i-1][j-1] = 0
        }
        document.write('</tr>')
    }
    document.write('</table>')
    // ---------------------------------------------------------- //
    document.write('<table id="keyTable" width = "150" height="150" border=1'+
        'borderColor="" style="float:left">')
    for (let i=1; i<global_keyi+1; i++) {
        document.write('<tr>')
        for (let j=1; j<global_keyj+1; j++) {
            document.write(
                '<td onclick="keyPadSelect('+i+', '+j+')" >'+
                '<img id="keyImg['+i+']['+j+']" src="'+urlImage.none+'"></td>')
        }
        document.write('</tr>')
    }
    document.write('</tr>')
    document.write('</body>')
    document.close()
    keyPadDefault()
}


// ------ <버튼> 선택 ------
function buttonSelect(i, j) {
    button_i = i
    button_j = j
    for (let i=1; i<global_keyi+1; i++) {
        for (let j=1; j<global_keyj+1; j++) {
            keyArr[i-1][j-1] = -1
            document.getElementById("keyImg["+i+"]["+j+"]").src = urlImage.none
        }
    }
    keySet = 1
    document.getElementById("keyImg[1][1]").src = urlImage.none2
    keyArr[0][0] = 0
    if ((i % 2) == 1) {
        document.getElementById("keyTable").style.borderColor = "red"
        document.getElementById("keyImg[1][2]").src = urlImage.man
        document.getElementById("keyImg[1][3]").src = urlImage.woman
        document.getElementById("keyImg[2][1]").src = urlImage.up_center
        document.getElementById("keyImg[3][1]").src = urlImage.up_line
        keyArr[0][1] = 1
        keyArr[0][2] = 2
        keyArr[1][0] = 11
        keyArr[2][0] = 21
        if (j == 1 || j == global_ynum || i == global_xnum) {
            document.getElementById("keyImg[2][1]").src = urlImage.none
            document.getElementById("keyImg[3][1]").src = urlImage.none
            keyArr[1][0] = -1
            keyArr[2][0] = -1
        }
    }
    else {
        document.getElementById("keyTable").style.borderColor = "orange"
        document.getElementById("keyImg[2][1]").src = urlImage.center1
        document.getElementById("keyImg[2][2]").src = urlImage.center2
        document.getElementById("keyImg[2][3]").src = urlImage.center3
        document.getElementById("keyImg[3][1]").src = urlImage.line1
        document.getElementById("keyImg[3][2]").src = urlImage.line2
        document.getElementById("keyImg[3][3]").src = urlImage.line3
        document.getElementById("keyImg[3][4]").src = urlImage.line4
        keyArr[1][0] = 31
        keyArr[1][1] = 32
        keyArr[1][2] = 33
        keyArr[2][0] = 41
        keyArr[2][1] = 42
        keyArr[2][2] = 43
        keyArr[2][3] = 44
        if (j == 1 || j == global_ynum) {
            document.getElementById("keyImg[2][2]").src = urlImage.none
            document.getElementById("keyImg[2][3]").src = urlImage.none
            document.getElementById("keyImg[3][1]").src = urlImage.none
            document.getElementById("keyImg[3][4]").src = urlImage.none
            keyArr[1][1] = -1
            keyArr[1][2] = -1
            keyArr[2][0] = -1
            keyArr[2][3] = -1
            if (j == 1) {
                document.getElementById("keyImg[3][3]").src = urlImage.none
                keyArr[2][2] = -1
            }
            if (j == global_ynum) {
                document.getElementById("keyImg[3][2]").src = urlImage.none
                keyArr[2][1] = -1
            }
        }
    }
}


// ------ <버튼> 초기화 ------
// 모든 button 이미지를 none으로 바꾸고, 값 또한 바꿉니다.
function buttonDefault() {
    let x = global_xnum
    let y = global_ynum
    keyPadDefault()
    for (let i=1; i<x+1; i++) {
        for (let j=1; j<y+1; j++) {
            document.getElementById("buttonImg["+i+"]["+j+"]").src = urlImage.none
        }
    }
}


// ------ <키패드> 초기화 ------
function keyPadDefault() {
    keySet = 0
    for (let i=0; i<global_keyi; i++) {
        for (let j=0; j<global_keyj; j++) {
            keyArr[i][j] = -1
        }
    }
    document.getElementById("keyImg[1][1]").src = urlImage.Q
    document.getElementById("keyImg[1][2]").src = urlImage.W
    document.getElementById("keyImg[1][3]").src = urlImage.E
    document.getElementById("keyImg[1][4]").src = urlImage.R
    document.getElementById("keyImg[2][1]").src = urlImage.A
    document.getElementById("keyImg[2][2]").src = urlImage.S
    document.getElementById("keyImg[2][3]").src = urlImage.D
    document.getElementById("keyImg[2][4]").src = urlImage.F
    document.getElementById("keyImg[3][1]").src = urlImage.Z
    document.getElementById("keyImg[3][2]").src = urlImage.X
    document.getElementById("keyImg[3][3]").src = urlImage.C
    document.getElementById("keyImg[3][4]").src = urlImage.V
    document.getElementById("keyTable").style.borderColor = "green"

}


// ------ <키패드> 선택 ------
function keyPadSelect(i, j) {
    if (keySet == 1 && keyArr[i-1][j-1] != -1) {
        if (keyArr[i-1][j-1] == 0) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.none
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 1) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.man
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 2) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.woman
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 11) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.up_center
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 21) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.up_line
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 31) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.center1
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 32) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.center2
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 33) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.center3
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 41) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.line1
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 42) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.line2
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 43) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.line3
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else if (keyArr[i-1][j-1] == 44) {
            document.getElementById("buttonImg["+button_i+"]["+button_j+"]").src = urlImage.line4
            buttonArr[button_i-1][button_j-1] = keyArr[i-1][j-1]
        }
        else {}
        keyPadDefault()
        keySet = 0
    }
}


// ------ <키패드> 키보드인식 ------
function keyPadPress(event) {
    if(keySet = 1) {    
        if(event.keyCode == 81) {
            keyPadSelect(1, 1)
        }
        if(event.keyCode == 87) {
            keyPadSelect(1, 2)
        }
        if(event.keyCode == 69) {
            keyPadSelect(1, 3)
        }
        if(event.keyCode == 82) {
            keyPadSelect(1, 4)
        }
        if(event.keyCode == 65) {
            keyPadSelect(2, 1)
        }
        if(event.keyCode == 83) {
            keyPadSelect(2, 2)
        }
        if(event.keyCode == 68) {
            keyPadSelect(2, 3)
        }
        if(event.keyCode == 70) {
            keyPadSelect(2, 4)
        }
        if(event.keyCode == 90) {
            keyPadSelect(3, 1)
        }
        if(event.keyCode == 88) {
            keyPadSelect(3, 2)
        }
        if(event.keyCode == 67) {
            keyPadSelect(3, 3)
        }
        if(event.keyCode == 86) {
            keyPadSelect(3, 4)
        }
    }
}

// ----------------------------------------------

function settlement() {
    let center = []
    centerNum = 0
    for (let i=0; i<global_xnum; i++) {
        for (let j=0; j<global_ynum; j++) { 
            if (buttonArr[i][j] == 11) {
                centerNum++
                center.push(new setFamily(i, j))
                center[centerNum - 1].calc()
                center[centerNum - 1].test()
            }
        }
    }
    
    if (centerNum == 0) {
        alert("오류")
    }
}


// ------ <계산> ------
class setFamily {
    constructor(i, j) {
        this.row = i
        this.column = j
        this.upLeft = ""
        this.upLefti = 0
        this.upLeftj = 0
        this.upRight = ""
        this.upRighti = 0
        this.upRightj = 0
        this.downArr = new Array()
    }

    calc() { // ---------- up Array -------------
            let a = -1
            while(true) {
                if (buttonArr[this.row][this.column+a] == 21) {
                    a--
                }
                else if (buttonArr[this.row][this.column+a] > 0 && buttonArr[this.row][this.column+a] < 10) {
                    this.upLeft = buttonArr[this.row][this.column+a]
                    this.upLefti = this.row
                    this.upLeftj = this.column+a
                    break
                }
                else { break }
            }
            a = 1
            while(true) {
                if (buttonArr[this.row][this.column+a] == 21) {
                    a++
                }
                else if (buttonArr[this.row][this.column+a] > 0 && buttonArr[this.row][this.column+a] < 10) {
                    this.upRight = buttonArr[this.row][this.column+a]
                    this.upRighti = this.row
                    this.upRightj = this.column+a
                    break
                }
                else { break }
            }
            // ------------------- down Array -------------------
            let r = this.row
            let c = this.column
            if (buttonArr[r+1][c] == 31) {
                this.downArr.push(new downTree(r+2, c, buttonArr[r+2][c]))
            }
            else if (buttonArr[r+1][c] == 32 || 
                buttonArr[r+1][c] == 33) {
                while(true) {
                    c--
                    if (buttonArr[r+1][c] == 41
                        || buttonArr[r+1][c] == 44) {
                         // none
                    }
                    else { break }
                }
                for(let a=0; a<=this.column-c; a++) {
                    if (buttonArr[r+1][c+a] == 42 ||
                        buttonArr[r+1][c+a] == 44 ||
                        buttonArr[r+1][c+a] == 33) {
                        this.downArr.push(new downTree(r+2, c+a, buttonArr[r+2][c+a]))
                    }
                }
                c = this.column
                while(true) {
                    c = c+1
                    if (buttonArr[r+1][c] == 43 ||
                        buttonArr[r+1][c] == 44) {
                        this.downArr.push(new downTree(r+2, c, buttonArr[r+2][c]))
                    }
                    else if (buttonArr[r+1][c] == 41) { }
                    else { break }
                }
            }
            else {}
    }

    get_row() {
        return this.row
    }

    get_column() {
        return this.column
    }

    get_upLeft(string) {
        if (string == "") {
            return this.upLeft
        }
        else if (string == "i") {
            return this.upLefti
        }
        else if (string == "j") {
            return this.upLeftj
        }
        else {}
    }

    get_upRight(string) {
        if (string == "") {
            return this.upRight
        }
        else if (string == "i") {
            return this.upRighti
        }
        else if (string == "j") {
            return this.upRightj
        }
        else {}
    }

    get_down(num, string) {
        if (string == "") {
            return this.downArr[num].get_key()
        }
        else if (string == "i") {
            return this.downArr[num].get_row()
        }
        else if (string == "j") {
            return this.downArr[num].get_column()
        }
        else {}
    }

    test() {
        for (let z=0; z<this.downArr.length; z++) {
            console.log(this.downArr[z].get_row()+", "+
            this.downArr[z].get_column()+" => "+
            this.downArr[z].get_key())
        }
    }
}

class downTree {
    constructor(i, j, key) {
        this.num = 0
        this.row = i
        this.column = j
        this.key = key
    }
    get_row() {
        return this.row
    }
    get_column() {
        return this.column
    }
    get_key() {
        return this.key
    }
}