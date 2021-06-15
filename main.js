sound = "";
status = "";
objects = [];
obj_label = "";
function preload(){
    sound = loadSound('audio.mp3');
}

function setup(){
    canvas = createCanvas(450 , 400);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    detector = ml5.objectDetector('cocossd' , modelLoaded);
}

function modelLoaded(){
    console.log("Model Loaded!!");
    status = true;
}

function draw(){
    image(webcam , 0 , 0 , 450 , 400);

    if (status != " "){
        detector.detect(webcam , gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill('#f00000');
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke('#f00000');
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            obj_label = objects[i].label;
        }
        if (obj_label == "person"){
            sound.stop();
            document.getElementById("d_result").innerHTML = "Person Found!";
        }
        else {
            sound.play();
            document.getElementById("d_result").innerHTML = "Person Not Found!";
        }
    }
}

function gotResult(error , result){
    if(error){
        console.log(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}