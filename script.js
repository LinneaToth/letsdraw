const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d"); //canvas context for drawing
const colorPicker = document.querySelector("#drawColor");
const penSize = document.querySelector("#penSize");
const printBtn = document.querySelector("#printBtn");
const resetBtn = document.querySelector("#resetBtn");

let canvasDim = 600;
canvas.width = canvasDim;
canvas.height = canvasDim;

let pen = "round";
let penWidth = 5;
let color = "black";
let drawing = false;

//Handling start, stopping and drawing on the canvas through mouse events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

//Pressing the reset button resets canvas, pen color and pen size
resetBtn.addEventListener("click", () => {
    colorPicker.value = "#000000";
    color = "#000000";
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    penWidth = 5;
    penSize.value = 5;
})

//Pressing the print button will save the current drawing as a PNG image
printBtn.addEventListener("click", () => {
    let imgUrl = canvas.toDataURL('image/png');
    let downloadTag = document.createElement("a");
    downloadTag.href = imgUrl;
    downloadTag.download = "amazingArtwork";
    downloadTag.click();
    downloadTag.remove();
})

//Update the pen color, based on user input
colorPicker.addEventListener("input", () => {
    color = colorPicker.value;
})

//Update the pen size, based on user input
penSize.addEventListener("input", () => {
    penWidth = penSize.value;
})

//Drawing start, triggered by pressing down mouse button
function startDrawing(event) {
    console.log(event);
    drawing = true;
    draw(event);
}

//Drawing stops, triggered by releasing the mouse button
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}


//Drawing function repeatedly fired while the mouse is down and user is drawing
function draw(event) {
    if (!drawing) {
        return;
    }

    ctx.lineWidth = penWidth;
    ctx.lineCap = pen;
    ctx.strokeStyle = color;

    //ClientX and clientY are coordinates of the mouse realative to the viewport.
    //The offset is subtracted to translate it into canvas coordinates
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    //Prepares for a new segment, adds to a smoother drawing experience
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}
