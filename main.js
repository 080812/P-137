status=""
objects=[]
text=""

function preload(){

}

function setup(){
canvas=createCanvas(400,400)
canvas.center()
video=createCapture(VIDEO)
video.size(400,400)
video.hide()
}

function draw(){
image(video,0,0,400,400)

text=document.getElementById("TI").value

if(status!=""){
    objectdetector.detect(video,gotresult)

    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status:Object Detected"
        document.getElementById("no.object").innerHTML="Number of objects detected"+objects.length

        fill("pink")
        percentage=objects[i].confidence
        confidence=percentage.toFixed(2)
        text(objects[i].label+" "+confidence+"%",objects[i].x,objects[i].y)
        noFill()
        stroke("black")
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
    }
    if(objects[i].label==text){
       video.stop()
       objectdetector.detect(gotresult)
       document.getElementById("status").innerHTML="Object mentioned found"
     synth=window.speechSynthesis;
     utterthis=new SpeechSynthesisUtterance(text+" found")
     synth.speak(utterthis);


    }
    else{
        document.getElementById("status").innerHTML="Object not found"
    }
}
}

function start(){
    objectdetector=ml5.objectDetector('COCOSSD',modelLoaded)
    document.getElementById("status").innerHTML="status:detecting objects"
    objectname=document.getElementById("TI").value
}


function modelLoaded(){
console.log("model is loaded")
status=true
}

function gotresult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results
    }
}