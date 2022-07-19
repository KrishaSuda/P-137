video = "";
status = "";
input = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    document.getElementById('objectFound').innerHTML = "";
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    input = document.getElementById('input_1').value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById('status').innerHTML = "Status: Objects Detected";

            percent = floor(objects[i].confidence * 100);

            fill("#FF0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height); 

            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById('objectFound').innerHTML = "Status: " + input + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById('objectFound').innerHTML = "Status: " + input + " Not Found";
            }
        }
    }
}