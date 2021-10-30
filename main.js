song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songPlay = "";
song2Play = "";

function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}

function modelLoded(){
    console.log("Model Loaded");
}

function draw(){
    image(video, 0, 0, 500, 450); 

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
        song.isPlaying();
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(songPlay == false){
            song.play();
            document.getElementById("song_name").innerHTML = "Song Name = Harry Potter Theme Song";
        }
    }

    if(scoreRightWrist > 0.2){
        song2.isPlaying();
        circle(rightWristX, rightWristY, 20);
        song.stop();
        if(song2Play == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name = Peter Pan Song";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = " + scoreLeftWrist + ", Score Right Wrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist y = " + leftWristY + ", Left wrist x = " + leftWristX);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist y = " + rightWristY + ", Right Wrist x = " + rightWristX);
    }
}

function stop(){
    song.stop();
    song2.stop();
    document.getElementById("song_name").innerHTML = "Song Name";
}