Webcam.set({
    width: 420,
    height: 320,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("image").innerHTML = '<img id = "picture" src = "' + data_uri + '"/>';
    })
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FHWvq0XCC/model.json', model_loaded);

function model_loaded() {
    console.log("Model loaded!");
}

function identify() {
    img = document.getElementById("picture");
    classifier.classify(img, got_result);
}

function got_result(error, results) {
    if (error) {
        console.log("error")
    } else {
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(4)*100;
    }
}