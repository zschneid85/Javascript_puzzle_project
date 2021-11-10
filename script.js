/* eslint-disable no-unused-vars */
let VIDEO=null;
let CANVAS=null;
let CONTEXT=null;
let SCALER=0.6;
let SIZE={x:0,y:0,width:0,height:0};



function main (){
    CANVAS=document.getElementById("myCanvas");
    CONTEXT=CANVAS.getContext("2d");
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;
    
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

            handleResizer
            window.addEventListener('resize',handleResizer);
            updateCanvas();
        }
    }).catch(function(err){
        alert("Camera error: "+err);
    });
}

function handleResizer() {
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
    
    window.requestAnimationFrame(updateCanvas);
}
