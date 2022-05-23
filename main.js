song = "";

leftWristX = 0;
leftWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound('music.mp3');
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet is Initialized");
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill('##FF0000');
    stroke('#FF0000');

if(scorerightWrist > 0.2)
{
    circle(rightWristX , rightWristY , 20);

    if(rightWristY >0 && rightWristY<= 100)
    {
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY<= 200)
    {
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300)
    {
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400)
    {
        song.rate(2);
    }
    else(rightWristY > 400)
    {
        song.rate(2.5);
    }

}
    if(scoreleftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InleftWrisxtY = Number(leftWristY);
    remove_decimal = floor(InleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {

        scoreleftWrist = results[0].pose.keypoint[9].score;
        scorerightWrist = results[0].pose.keypoint[10].score;
        console.log("scoreLeftWrist = " + scoreleftWrist + "scoreRightWrist = " + scorerightWrist);

        console.log(results);
        leftWristX = results[0].leftWrist.pose.x;
        leftWristY = results[0].leftWrist.pose.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].rightWrist.pose.x;
        rightWristY = results[0].rightWrist.pose.y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);
    }
}