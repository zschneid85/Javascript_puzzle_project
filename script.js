/* eslint-disable no-unused-vars */
let VIDEO=null;
let CANVAS=null;
let CONTEXT=null;
let SCALER=0.6;
let SIZE={x:0,y:0,width:0,height:0,row:0,columns:3};
let PIECES=[];


function main (){
    CANVAS=document.getElementById("myCanvas");
    CONTEXT=CANVAS.getContext("2d");
    
    let promise=navigator.mediaDevices.getUserMedia({video:true});
    promise.then(function(signal){
        VIDEO=document.createElement("video");
        VIDEO.srcObject=signal;
        VIDEO.play();

        VIDEO.onloadeddata=function() {
            /*let resizer=SCALER*
            Math.min(
                window.innerWidth/VIDEO.videoWidth,
                window.innerHeight/VIDEO.videoHeight
            );
            SIZE.width=resizer*VIDEO.videoWidth;
            SIZE.height=resizer*VIDEO.videoHeight;
            SIZE.x=window.innerWidth/2-SIZE.width/2;
            SIZE.y=window.innerHeight/2-SIZE.height/2; */
            
            // Using an EventListenner to not use the above code

            handleResizer();
            //window.addEventListener('resize',handleResizer);
            updateCanvas();
        }
    }).catch(function(err){
        alert("Camera error: "+err);
    });
}

function handleResizer() {
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;
    
    let resizer=SCALER*
    Math.min(
        window.innerWidth/VIDEO.videoWidth,
        window.innerHeight/VIDEO.videoHeight
    );
    
    SIZE.width=resizer*VIDEO.videoWidth;
    SIZE.height=resizer*VIDEO.videoHeight;
    SIZE.x=window.innerWidth/2-SIZE.width/2;
    SIZE.y=window.innerHeight/2-SIZE.height/2; 
}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO,
    SIZE.x, SIZE.y,
    SIZE.width, SIZE.height);
    
    for(let i=0; i<PIECES.length;i++) {
        PIECES[i].draw(CONTEXT);
    }
    window.requestAnimationFrame(updateCanvas);
}

function initializePieces(){
    PIECES=[];
    for(let i=0;i<SIZE.rows; i++){
        for(let j=0;j<SIZE.columns;j++){
            PIECES.push(new Piece(i,j));
        }
    }
}

class Piece{
    constructor(rowIndex,colIndex) {
        this.rowIndex=rowIndex;
        this.colIndex=colIndex;
        this.x=SIZE.x+SIZE.width*this.colIndex/SIZE.columns;
        this.y=SIZE.y+SIZE.height*this.rowIndex/SIZE.rows;
        this.width=SIZE.width/SIZE.columns;
        this.height=SIZE.height/SIZE.rows;
    
    }
    draw(context){
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.stroke();
    }
}