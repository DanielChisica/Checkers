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

function continuity(pos, array){
    for(let i=0;i<array.length;i++){
        if(JSON.stringify(array[i][0])===JSON.stringify(pos)){
            return pos;
        }
    }
    return false
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
        }if((checkPos(lastBeaten[1],lastBeaten[0],B)[0]==0 && checkPos(lastBeaten[1],lastBeaten[0],B)[1]!=0)||
        leftRight==='1'){
            let row=paths[paths.length-1].slice(0)
            row.push(checkPos(lastBeaten[1],lastBeaten[0],B)[1])
            paths.push(row)
            if (fork[0]!=0 && fork[1]!=0){
                leftRight='2'
                B[fork[1][0]][fork[1][1]]='O'
                B[pawn[0]][pawn[1]]='.'
                solution(B)
                B[fork[1][0]][fork[1][1]]='*'
                B[pawn[0]][pawn[1]]='O'
            }
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
        }
    }

    if(JSON.stringify(initPawn)===JSON.stringify(pawn)){
        let finalPath=[]
        let paths2=[]

        for(let i=0;i<paths.length;i++){
            if(paths[i].includes(pawn)){
                paths2.push(paths[i].length)
            }
        }

        for(let i=0; i<paths.length ; i++){
            if(paths[i].includes(pawn) && paths[i].length===Math.max(...paths2)){
                finalPath=paths[i]
            }
        }

        let paths3=[]

        for(let i=0;i<paths.length;i++){
            paths3.push(paths[i].length)
        }

        console.log(finalPath[finalPath.length-1])
        console.log(continuity(finalPath[finalPath.length-1],paths))

        while (continuity(finalPath[finalPath.length-1],paths)!=false){
            let end=finalPath[finalPath.length-1]
            let pathsxBegins=[]

            for(let i=0;i<paths.length;i++){
                if(JSON.stringify(paths[i][0])===JSON.stringify(end)){
                    pathsxBegins.push(paths[i].length)
                }
            }

            for (let i=0;i<paths.length;i++){
                if(JSON.stringify(paths[i][0])===JSON.stringify(end) && paths[i].length==Math.max(...pathsxBegins)){
                    finalPath=finalPath.concat(paths[i])
                }
            }
        }

        console.log(finalPath)

        if(paths.length==1){
            return 0
        }
        for(let i=0;i<B.length;i++){
            console.log(B[i].toString());
        }
        console.log('Pawn is: ' + pawn)
        console.log('Initial pawn is: ' + initPawn)
        return finalPath.length
    }
}

console.log(solution(
    ["...X.X........................", //0
        "..............................", //1
        ".X.X..........................", //2
        "..............................", //3
        ".X............................", //4
        "..............................", //5
        ".X.X..........................", //6
        "..............................", //7
        "...X.X...................X....", //8
        "..............................", //9
        ".....X.X...................X.X", //10
        "..............................", //11
        ".......X.X.................X..", //12
        "..............................", //13
        ".........X.X.............X....", //14
        "..............................", //15
        "...........X.X.........X......", //16
        "..............................", //17
        ".............X.X.....X........", //18
        "..............................", //19
        "..............XX.X.X..........", //20
        "..............................", //21
        ".................X............", //22
        "..............................", //23
        "...............X..............", //24
        "..............................", //25
        ".............X................", //26
        "..............................", //27
        ".........X.X..................", //28
        "..........O..................."  //29
       //012345678901234567890123456789
    ]))
