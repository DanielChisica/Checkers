function checkPos(x,y,B) {
    let movements=[0,0]
    try{
        if(B[y-2][x-2]=='.'&& B[y-1][x-1]=='X'){
            movements[0]=[y-2,x-2]
        }
        if(B[y-2][x+2]=='.'&& B[y-1][x+1]=='X'){
            movements[1]=[y-2,x+2]
        }
    }finally {
        return movements
    }
}

function getCoordinates(array, char) {
    for (let i = 0; i < array.length; i++) {
        const i2 = array[i].indexOf(char);
        if (i2 !== -1)
            return [i, i2]
    }
    return undefined
}

let paths=[];
let lastBeaten;
let leftRight;
let initPawn=false;

function solution(B) {
// write your code in JavaScript (Node.js 8.9.4)
    if(typeof B[0]==="string"){
        for(let n=0;n<B.length;n++){
            B[n]=B[n].split("")
        }
    }
    let pawn=getCoordinates(B,'O');
    if(!initPawn){
        initPawn=pawn
    }
    paths.push([pawn]);
    while (checkPos(paths[paths.length-1][paths[paths.length-1].length-1][1],paths[paths.length-1][paths[paths.length-1].length-1][0], B)[0]!=0 || checkPos(paths[paths.length-1][paths[paths.length-1].length-1][1],paths[paths.length-1][paths[paths.length-1].length-1][0], B)[1]!=0){
        lastBeaten=paths[paths.length-1][paths[paths.length-1].length-1]
        let fork=checkPos(lastBeaten[1],lastBeaten[0],B);
        leftRight='0';
        if(checkPos(lastBeaten[1],lastBeaten[0],B)[0]!=0 && checkPos(lastBeaten[1],lastBeaten[0],B)[1]!=0){
            let row1=paths[paths.length-1].slice(0)
            let row2=paths[paths.length-1].slice(0)
            row1.push(checkPos(lastBeaten[1],lastBeaten[0],B)[0])
            row2.push(checkPos(lastBeaten[1],lastBeaten[0],B)[1])
            paths.push(row1)
            paths.push(row2)
            if (fork[0]!=0 && fork[1]!=0){
                leftRight='1'
            }
            for(let i=0;i<B.length;i++){
                console.log(B[i].toString());
            }
            console.log("******************")
        }if((checkPos(lastBeaten[1],lastBeaten[0],B)[0]==0 && checkPos(lastBeaten[1],lastBeaten[0],B)[1]!=0)||
        leftRight==='1'){
            let row=paths[paths.length-1].slice(0)
            row.push(checkPos(lastBeaten[1],lastBeaten[0],B)[1])
            paths.push(row)
            if (fork[0]!=0 && fork[1]!=0){
                B[fork[1][0]][fork[1][1]]='O'
                B[pawn[0]][pawn[1]]='.'
                solution(B)
                leftRight='2'
                B[fork[1][0]][fork[1][1]]='*'
                B[pawn[0]][pawn[1]]='O'
            }
            for(let i=0;i<B.length;i++){
                console.log(B[i].toString());
            }
            console.log("******************")
        } if((checkPos(lastBeaten[1],lastBeaten[0],B)[0]!=0 && checkPos(lastBeaten[1],lastBeaten[0],B)[1]==0)||
            leftRight==='2'){
            let row=paths[paths.length-1].slice(0)
            row.push(checkPos(lastBeaten[1],lastBeaten[0],B)[0])
            paths.push(row)
            if (fork[0]!=0 && fork[1]!=0){
                B[fork[0][0]][fork[0][1]]='O'
                B[pawn[0]][pawn[1]]='.'
                solution(B)
                B[fork[0][0]][fork[0][1]]='*'
                B[pawn[0]][pawn[1]]='O'
            }
            for(let i=0;i<B.length;i++){
                console.log(B[i].toString());
            }
            console.log("******************")
        }
    }
    if(JSON.stringify(initPawn)===JSON.stringify(pawn)){
        if(paths.length==1){
            return 0
        }

        let headPos=[]
        for(let i=0;i<paths.length;i++){
            let end=paths[i][paths[i].length-1]
            headPos.push(end[0])
        }
        headPos=headPos.filter(function (el) {
            return el != null;
        });
        console.log('Pawn is: ' + pawn)
        //console.log('Initial pawn is: ' + initPawn)
        //console.log(paths)
        //console.log('**Lets get physical**')
        //console.log('**Follow the noise**')
        //
        return (initPawn[0]-Math.min(...headPos))/2
    }
}

console.log(solution(
    [
        "OX............................", //0
        "XX............................", //1
        "..............................", //2
        "...X..........................", //3
        "..............................", //4
        "..............................", //5
        "..............................", //6
        "..............................", //7
        "..............................", //8
        "..............................", //9
        "..............................", //10
        "..............................", //11
        "..............................", //12
        "..............................", //13
        "..............................", //14
        "..............................", //15
        "..............................", //16
        "..............................", //17
        "..............................", //18
        "..............................", //19
        "..............................", //20
        "..............................", //21
        "..............................", //22
        "..............................", //23
        "..............................", //24
        "..............................", //25
        "..............................", //26
        "..............................", //27
        "..............................", //28
        ".............................."  //29
        //012345678901234567890123456789
    ]))
