// SFC32 prng
function sfc32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    var t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

// Function to generate a random Ethereum-like hash (keccak256)
function randomHash(randomFunction = Math.random) {
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        // Generates a determinate random hexadecimal digit
        hash += Math.floor(randomFunction() * 16).toString(16);
    }
    return hash;
}

let _tokenData;
try {
    _tokenData = tokenData;
} catch {
    _tokenData = {
        tokenId: Math.floor(Math.random() * 10**6).toString(),
        hash: randomHash(),
    }
};

// Array that will hold the 4 seeds that are used to feed the sfc32 algorithm
const seeds = [];
// Split the hash into four 64bit numbers to use as the seeds 
for (let i = 2; i < _tokenData.hash.length; i += 16) {
    seeds.push(parseInt(_tokenData.hash.slice(i, i + 16)))
}

// Generate our prng function
const prng = sfc32(...seeds);
// First few outputs aren't sufficiently random, so we'll just spit out some
// of the early ones up front
[...Array(50)].forEach(prng);

// Define the token data
_tokenData.hashes = [_tokenData.hash];
let numHashes = _tokenData.hashes.length;  // Count number of hashes
let hashPairs = [];  // Array to hold hash pairs


// Generate and add a random hash
let newHash = randomHash(prng);
_tokenData.hashes.push(newHash);
numHashes = _tokenData.hashes.length;

// Split hashes into pairs of two
for (let i = 0; i < numHashes; i++) {
     for (let j = 0; j < 32; j++) {
          // push each 2-character slice of the hash to the hashPairs array
          hashPairs.push(_tokenData.hashes[i].slice(2 + (j * 2), 4 + (j * 2)));
     }
}
// Convert each pair of hexadecimal values to decimal
let decPairs = hashPairs.map(x => {
     return parseInt(x, 16);
});

// Heart shape matrix
const heart = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];

// Heart shape matrix - with glisten
const heartGlisten = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1],
    [0, 1, 1, 1, 2, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];

// Large heart shape matrix
const heartLarge = [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
];


// Color list
const colors = [
    { name: 'Pure Red', rgb: [255, 0, 0]},
    { name: 'Red-Orange', rgb: [255, 51, 0]},
    { name: 'Orange', rgb: [255, 102, 0]},
    { name: 'Yellow-Orange', rgb: [255, 153, 0]},
    { name: 'Bright Yellow', rgb: [255, 204, 0]},
    { name: 'Pure Yellow', rgb: [255, 255, 0]},
    { name: 'Chartreuse', rgb: [204, 255, 0]},
    { name: 'Yellow-Green', rgb: [153, 255, 0]},
    { name: 'Light Green', rgb: [102, 255, 0]},
    { name: 'Bright Green', rgb: [51, 255, 0]},
    { name: 'Pure Green', rgb: [0, 255, 0]},
    { name: 'Spring Green', rgb: [0, 255, 51]},
    { name: 'Turquoise', rgb: [0, 255, 102]},
    { name: 'Light Blue', rgb: [0, 255, 153]},
    { name: 'Sky Blue', rgb: [0, 255, 204]},
    { name: 'Pure Blue', rgb: [0, 0, 255]},
    { name: 'Blue-Purple', rgb: [51, 0, 255]},
    { name: 'Purple', rgb: [102, 0, 255]}
];

const grayscaleColors = [
    { name: 'Black', rgb: [0, 0, 0]},
    { name: 'Dark Gray', rgb: [51, 51, 51]},
    { name: 'Medium Gray', rgb: [102, 102, 102]},
    { name: 'Light Gray', rgb: [153, 153, 153]},
    { name: 'Very Light Gray', rgb: [204, 204, 204]},
    { name: 'White', rgb: [255, 255, 255]}
];

// Initialize the variables for selected colors and colors array
let selectedColor, selectedColor2;
let colorsArray = [];
let currentColorIndex = 5;


// Define 3D transformation and animation settings
const angle = {
    x: 0,
    y: 0,
    z: 0
};
const phaseOffsets = [];
const animation = {
    time: 0,
    animate: false
};

// Initialize the properties and presets
const cube = {
    width: 0,
    height: 0
};
const PRESET_LENGTHS = [1 / 8, 1 / 4, 3 / 8, 1 / 2, 5 / 8, 3 / 4, 7 / 8, 1];
let heartModel = [];
let lengths = [];
//let lengthCounts = [];

let panel;

// Reset view function resets the camera to the original position
function resetView() {
    angle.x = angle.y = angle.z = 0;
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
}

// CreateHeartModel function generates the 3D model of the heart
function createHeartModel(heartMatrix) {
    let cubePositions = [];
    let scaleRatio = 1; // Default scale ratio for the small heart

    // If it's the large heart, calculate the scale ratio based on the dimensions
    if (heartMatrix[0].length == 13) {
        scaleRatio = heart[0].length / heartMatrix[0].length;
    }

    // Iterate through the heart matrix
    for (let i = 0; i < heartMatrix.length; i++) {
        for (let j = 0; j < heartMatrix[i].length; j++) {
            if (heartMatrix[i][j] === 1) {
                cubePositions.push({
                    x: (j - heartMatrix[i].length / 2) * cubeWidth * scaleRatio,
                    y: (i - heartMatrix.length / 2) * cubeHeight * scaleRatio,
                    z: 0,
                    size: cubeWidth * scaleRatio
                });
            }
        }
    }

    // Sort the cube positions based on the y value
    cubePositions.sort((a, b) => a.y - b.y);

    return cubePositions;
}


// Count the lengths so that we can put this in the instructions
function countLengths(lengths) {
    let counts = {};
    for (let i = 0; i < lengths.length; i++) {
        let length = lengths[i];
        if (counts[length]) {
            counts[length]++;
        } else {
            counts[length] = 1;
        }
    }
    return counts;
}

let lengthCounts = countLengths(lengths);

// Setup function initializes the canvas and sets up the initial state of the sketch
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(grayscaleColors[currentColorIndex].rgb[0], grayscaleColors[currentColorIndex].rgb[1], grayscaleColors[currentColorIndex].rgb[2]);
    cameraMatrix = new p5.Matrix();

    // Calculate cube dimensions based on the smallest canvas dimension
    updateCubeDimensions();

    // Randomly select either the `heart` or `heartLarge` model
    // Calculate sum of decPairs
    let sumDecPairs = decPairs.reduce((a, b) => a + b, 0);

    // Select the heartMatrix based on the sum of decPairs
    let modValue = sumDecPairs % 3;
    let heartMatrix;
    if (modValue === 0) {
        heartMatrix = heart;
    } else if (modValue === 1) {
        heartMatrix = heartLarge;
    } 
    else {
        heartMatrix = heartGlisten;
    }


    heartModel = createHeartModel(heartMatrix);

    // Instead of picking one or two colors, we now have to consider four options
    let colorIndices = []; // Array to hold chosen color indices
    let numColors; // Number of colors to choose

    // determine the number of colors
    let decValue = decPairs[32] / 255; // Use 32nd decimal pair and normalize it to range [0, 1]
    if (heartMatrix === heartGlisten) {  // If it's a glistening heart, choose only one color
        numColors = 1;
    } else if (decValue < 0.1) {
        numColors = 1;
    } else if (decValue < 0.3) {
        numColors = 2;
    } else if (decValue < 0.5) {
        numColors = 3;
    } else if (decValue < 0.7) {
        numColors = 4;
    } else if (decValue < 0.8) {
        numColors = 5;
    } else {
        numColors = 18;
    }

   // Choose the color indices
    let initialColorIndex = Math.floor((decPairs[33] / 255) * colors.length);  // Use 33rd decimal pair and normalize it to range [0, colors.length)
    for (let i = 0; i < numColors; i++) {
        colorIndices.push((initialColorIndex + i) % colors.length);
    }


    // Initialize lengths, phaseOffsets, and colorsArray based on the heartModel length
    for (let i = 0; i < heartModel.length; i++) {

        // Choose a length from the preset list and multiply it by the cube size
        // We will use decPairs to deterministically select a length
        let lengthIndex = decPairs[i % decPairs.length] % PRESET_LENGTHS.length;
        let chosenLength = PRESET_LENGTHS[lengthIndex] * heartModel[i].size;
        lengths.push(chosenLength);

        // Calculate the corresponding phase offset based on the chosen length
        let phaseOffset = asin(2 * (chosenLength / heartModel[i].size - 0.5));
        phaseOffsets.push(phaseOffset);

        // Assign color to this cube using one of the chosen colors
        // We will use decPairs to deterministically select a color
        let colorIndex = decPairs[i % decPairs.length] % colorIndices.length;
        colorsArray[i] = colors[colorIndices[colorIndex]];
    }
    
    // Assume you've defined your canvas somewhere and its size is (canvasWidth, canvasHeight)
    let canvasWidth = windowWidth;
    let canvasHeight = windowHeight;

    // Create panel with text and hide it initially
    let panelWidth = canvasWidth;
    let panelHeight = canvasHeight;

    let closeButton = `<button id="closeBtn" style="position:absolute; right:20px; top:20px;">X</button>`;
    let instructionsContent = closeButton + `
        <p>Snowfro Presents</p>
        <h2>How to Build a 3D Heart</h2>
        
        <h3>A STEP-BY-STEP GUIDE</h3>
        <p>Specific instructions for heart #` + _tokenData.tokenId + `</p>
        
        <p>Hey there, fren! Ready to dive into the world of 3D printing and unleash your inner artist? You're about to create something really cool—a heart made entirely of 3D printed, hand-painted cubes. Don't worry if you're new to this, we've got easy-peasy instructions to help you print your cubes, pick out the perfect paint colors, and put it all together. This is gonna be a fun, hands-on adventure, so let's jump right in and start creating!</p>
        
        <hr/>
        <h3>STEP 1: Print Your Cubes</h3>

        <p>Alrighty, step one is all about bringing your cubes into the real world. This is where the magic of 3D printing comes into play! We're gonna turn those digital STL files into tangible, touchable cubes.</p>

        <p><b>Printing at Home</b></p>

        <p>Got a 3D printer? Awesome! See below for a link to download the STL files for the cubes. Just download the files, load them into your printer's software, and get the printing party started. Make sure to print the right number and sizes of cubes as indicated—we've got a perfect heart-shaped puzzle waiting to be assembled.</p>

        <button id="downloadBtn">Download 3D Printing Files</button>
        </br></br>
        <table>
            <thead>
                <tr>
                <th>Size</th>
                <td>0.125</td>
                <td>0.25</td>
                <td>0.375</td>
                <td>0.5</td>
                <td>0.625</td>
                <td>0.75</td>
                <td>0.875</td>
                <td>1</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th>Qty</th>
                <td>6</td>
                <td>2</td>
                <td>3</td>
                <td>3</td>
                <td>5</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                </tr>
            </tbody>
            </table>



        <p><b>Don't Have a 3D Printer? No Worries!</b></p>

        <p>Don't have a 3D printer at home? No problemo! You can still join the cube heart club. Download the STL files and send them over to a 3D printing service. They'll print the cubes for you. Just make sure to give them the specifics on how many and what sizes you need!</p>

        <p>That's all for step one, folks. Once you've got your cubes in hand, you're ready to move on to the next exciting phase: painting!</p>

        <hr/>
        <h3>STEP 2: Grab Your Paint</h3>

        <p>It's time to add some color to those cubes! This step is all about choosing the right paint and transforming your 3D prints into vibrant building blocks of your heart model.</p>

        <p><b>Choosing Your Paint</b></p>

        <p>We've got a list of specific colors that'll make your heart pop. Check out the color list we've provided and head to your local craft store or online retailer to get your hands on them.</p>

        <p><b>Mixing Colors</b></p>

        <p>Can't find a specific color? Not a problem at all! You can be a paint mixologist and create the color yourself. Here's a quick guide on how to do that:</p>

        <p><b>Primary Colors:</b> Remember, red, yellow, and blue are your primary colors. You can mix these to create a whole spectrum of colors.</p>

        <p><b>Color Mixing Guide:</b> We've provided a color mixing guide along with the color list. This will help you create the specific colors you need by mixing two or more paints together. It's like a little science experiment!</p>

        <p><b>Test Your Colors:</b> Before you paint your cubes, try your mixed colors on a small piece of paper or scrap material. This way, you can adjust your mixture as needed without affecting your cubes.</p>

        <p>That's it for step two! Once you've gathered your paint, you're ready to start bringing your heart model to life with color. Happy painting!</p>

        <hr/>
        <h3>STEP 3: Paint the Cubes</h3>

        <p>Now comes the fun part—painting your cubes! This is where you really start to see your heart model take shape. Let's add some color to your project!</p>

        <p><b>Prepping Your Cubes</b></p>

        <p>Before we begin, make sure your cubes are clean and dust-free. This will help the paint adhere better and give you a smoother finish.</p>

        <p><b>Painting Guide</b></p>

        <p>We've got a handy painting guide for you to make sure each cube gets the right color. The guide matches each cube size with a specific color. Follow this guide closely, and you'll have a perfectly colored heart model.</p>

        <p><b>Painting Tips</b></p>

        <p><b>Use a Primer:</b> If you want your colors to pop and last longer, consider using a primer before you apply your paint.</p>

        <p><b>Multiple Coats:</b> For a vibrant and even color, you may need to apply multiple coats of paint. Just make sure each coat is dry before applying the next one.</p>

        <p><b>Patience is Key:</b> Remember, patience is a virtue, especially when painting. Let each cube dry completely before moving on to the next step.</p>

        <p>That's it for step three! Once you've painted all your cubes, you're ready for the final step: assembly. But for now, sit back and admire your colorful cubes!</p>
        
        <hr/>
        <h3>STEP 4: Glue the Cubes</h3>

        <p>We're on the home stretch now! You've printed, painted, and now it's time to put all the pieces together. This step is all about taking your colorful cubes and turning them into a stunning heart model.</p>

        <b>Choosing Your Glue</b>

        <p>First things first, you're going to need some strong adhesive to hold your cubes together. We recommend a strong craft glue or a glue specifically designed for plastics. Make sure it's something that dries clear so it doesn't interfere with your beautiful paint job.</p>

        <b>Assembly Guide</b>

        <p>We've created a unique map to help you assemble your heart model. It shows exactly where each cube goes, like a 3D puzzle. Follow the map closely, and you'll see your heart shape come to life.</p>

        <b>Assembly Tips</b>

        <ol>
        <li><strong>One at a Time</strong>: Start by gluing one cube at a time. This will help you maintain control over the placement and alignment of the cubes.</li>

        <li><strong>Let it Dry</strong>: Allow the glue to dry between additions of cubes. This will ensure a strong bond and keep your model stable.</li>

        <li><strong>Patience, Again</strong>: This is another step where patience pays off. Rushing might lead to mistakes, so take your time and enjoy the process.</li>
        </ol>

        <p>And that's it! Step four is the last step in creating your 3D cube heart model. Once you're done, you'll have a beautiful, handcrafted piece of art to display and be proud of.</p>

    `;


    panel = createElement('div', instructionsContent).size(panelWidth, panelHeight);

    document.getElementById("downloadBtn").addEventListener("click", function(){
        // Create a blob from a string
        let textToWrite = stlText;
        let textFileAsBlob = new Blob([textToWrite], { type: 'application/octet-stream' });
        
        // Create a URL for the blob
        let downloadLink = URL.createObjectURL(textFileAsBlob);
        
        // Create a temporary download link
        let tempLink = document.createElement('a');
        tempLink.download = '3DPrinting.stl';
        tempLink.href = downloadLink;
        
        // Trigger the download by programmatically clicking the link
        tempLink.click();
    });
    
    // Position the panel at the center of the canvas
    let posX = (canvasWidth - panelWidth) / 2;
    let posY = (canvasHeight - panelHeight) / 2;

    panel.position(posX, posY);
    panel.style('display', 'none');
    panel.style('width', '100%');
    panel.style('height', '100vh');
    panel.style('max-width', '100%');
    panel.style('max-height', '100vh');
    panel.style('overflow', 'hidden auto');
    panel.style('box-sizing', 'border-box');
    panel.style('text-align', 'left');
    panel.style('font-family', 'Arial, sans-serif');
    panel.style('color', '#333');
    panel.style('background-color', '#f9f9f9');
    panel.style('padding', '20px');
    panel.style('line-height', '1.6');
    panel.style('font-size', '14px');

    // Create a canvas and assign it to a variable
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);

    // Attach the mouseClicked event to the canvas
    canvas.mouseClicked(() => {
        // Display the panel only if mouse hasn't been dragged
        if (!mouseDraggedFlag) {
            panel.style('display', 'block');
            panel.style('z-index', '5');
        }
    });

    // Attach the mousePressed event to the canvas
    canvas.mousePressed(() => {
        // Reset the flag
        mouseDraggedFlag = false;
    });

    // Function to close the panel
    function closePanel() {
        panel.style('display', 'none');
        panel.style('z-index', '-1');
    }

    // Add an event listener for the close button
    document.getElementById("closeBtn").addEventListener("click", closePanel);

    // Add an event listener for the 'Escape' key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePanel();
        }
    });


}


// UpdateCubeDimensions function updates the dimensions of the cube when the window size changes
function updateCubeDimensions() {
    let minDimension = min(width, height);
    cubeWidth = minDimension / 12;
    cubeHeight = minDimension / 12;
}


// This function should draw a cube but without the front face.
// function drawCubeWithoutFrontFace(x, y, z, size) {
//     var padding = 0.01; // Define the amount of "padding" you want.
//     push();
//     translate(x, y, z);
//     beginShape(TRIANGLES);

//     // Add vertices for the back face
//     vertex(-size/2, -size/2, -size/2);
//     vertex(size/2 - padding, -size/2, -size/2);
//     vertex(size/2 - padding, size/2 - padding, -size/2);

//     vertex(-size/2, -size/2, -size/2);
//     vertex(size/2 - padding, size/2 - padding, -size/2);
//     vertex(-size/2, size/2 - padding, -size/2);
    
//     // Add vertices for the left face
//     vertex(-size/2, -size/2, size/2);
//     vertex(-size/2, size/2 - padding, size/2);
//     vertex(-size/2, size/2 - padding, -size/2);

//     vertex(-size/2, -size/2, size/2);
//     vertex(-size/2, size/2 - padding, -size/2);
//     vertex(-size/2, -size/2, -size/2);
    
//     // Add vertices for the right face
//     vertex(size/2 - padding, -size/2, -size/2);
//     vertex(size/2 - padding, size/2 - padding, -size/2);
//     vertex(size/2 - padding, size/2 - padding, size/2);

//     vertex(size/2 - padding, -size/2, -size/2);
//     vertex(size/2 - padding, size/2 - padding, size/2);
//     vertex(size/2 - padding, -size/2, size/2);
    
//     // Add vertices for the top face
//     vertex(-size/2, -size/2, -size/2);
//     vertex(size/2 - padding, -size/2, -size/2);
//     vertex(size/2 - padding, -size/2, size/2);

//     vertex(-size/2, -size/2, -size/2);
//     vertex(size/2 - padding, -size/2, size/2);
//     vertex(-size/2, -size/2, size/2);
    
//     // Add vertices for the bottom face
//     vertex(-size/2, size/2 - padding, size/2);
//     vertex(size/2 - padding, size/2 - padding, size/2);
//     vertex(size/2 - padding, size/2 - padding, -size/2);

//     vertex(-size/2, size/2 - padding, size/2);
//     vertex(size/2 - padding, size/2 - padding, -size/2);
//     vertex(-size/2, size/2 - padding, -size/2);

//     endShape();
//     pop();
// }



// DrawHeartModel function draws the 3D model of the heart
function drawHeartModel() {
    let shapeIndex = 0;

    // Draw the heart shape with rectangular prisms
    for (const cubePosition of heartModel) {
        push();
        fill(
            colorsArray[shapeIndex].rgb[0],
            colorsArray[shapeIndex].rgb[1],
            colorsArray[shapeIndex].rgb[2]
        );
        translate(
            cubePosition.x,
            cubePosition.y,
            lengths[shapeIndex] / 2
        );

        box(cubePosition.size, cubePosition.size, lengths[shapeIndex]);
        
        pop();
        shapeIndex++;
    }
}

// DrawHeartModel function - White Top
function drawHeartModelWhiteTop() {
    let shapeIndex = 0;

    // Draw the heart shape with rectangular prisms
    for (const cubePosition of heartModel) {
        push();
        fill(
            colorsArray[shapeIndex].rgb[0],
            colorsArray[shapeIndex].rgb[1],
            colorsArray[shapeIndex].rgb[2]
        );
        translate(
            cubePosition.x,
            cubePosition.y,
            lengths[shapeIndex] / 2
        );

        box(cubePosition.size, cubePosition.size, lengths[shapeIndex]);
        
        

        pop();
        // Iterate over the heart model and draw each cube
        for (let i = 0; i < heartModel.length; i++) {
            let cube = heartModel[i];
            let length = lengths[i];
            let color = colorsArray[i].rgb;

            push();
            translate(cube.x, cube.y, cube.z);

            // Calculate the new cube's size and position
            let newDepth = 1;
            let newSize = cube.size;
            let newPos = (cube.size + newSize);

            // Draw the new cube on the front side of the original one, facing the camera
            // We adjust the translation by the depth/2 of the new cube, to ensure it sits on the front face of the original cube
            translate(0, 0, cube.z + length);
            fill(255);  // color the new cubes white
            box(newSize, newSize, newDepth);  // Draw the new cube

            pop();
        }
        shapeIndex++;
    }
}

// DrawHeartModel function - No Front Face
// function drawHeartModelFlowerBox() {
//     let shapeIndex = 0;

//     // Draw the heart shape with rectangular prisms
//     for (const cubePosition of heartModel) {
//         push();
//         fill(
//             colorsArray[shapeIndex].rgb[0],
//             colorsArray[shapeIndex].rgb[1],
//             colorsArray[shapeIndex].rgb[2]
//         );
//         translate(
//             cubePosition.x,
//             cubePosition.y,
//             lengths[shapeIndex]  // Adjust the z coordinate
//         );

//         // Draw the cube at the origin
//         drawCubeWithoutFrontFace(0, 0, 0, cubePosition.size); // No need to translate the cube

//         pop();
//         shapeIndex++;
//     }
// }



function draw() {
    //background(255);
    background(grayscaleColors[currentColorIndex].rgb[0], grayscaleColors[currentColorIndex].rgb[1], grayscaleColors[currentColorIndex].rgb[2]);
    orbitControl(1, 1, 0.1);

    let lightDir = createVector(1, 1, -1);
    lightDir.normalize();
    directionalLight(255, 255, 255, lightDir);

    ambientLight(185, 185, 185);
    strokeWeight(0);

    rotateX(angle.x);
    rotateY(angle.y - 0.15);
    rotateZ(angle.z);

    scale(0.85);

    if (animation.animate) {
        for (let i = 0; i < lengths.length; i++) {
            lengths[i] = heartModel[i].size * (0.5 + 0.5 * sin(phaseOffsets[i] + animation.time));
        }
        animation.time += 0.03;
    }

    

    let decValue = decPairs[34] / 255;
    if (decValue < 0) {
        //drawHeartModelFlowerBox();
    } else if (decValue < .1){
        drawHeartModelWhiteTop();
    } else {
        drawHeartModel();
    }
}


// Function to handle mouse dragging events
function mouseDragged() {
    // Set the flag to true because mouse is being dragged
    mouseDraggedFlag = true;

    // Update the angle of rotation based on the mouse movement
    angle.x += (mouseY - pmouseY) * 0.0003;
    angle.y += (mouseX - pmouseX) * 0.0003;
}

// Function to handle window resizing events
function windowResized() {
    // Calculate the scaling factor based on the old and new cubeHeight
    let oldCubeHeight = cubeHeight;
    resizeCanvas(windowWidth, windowHeight);

    // Update cube dimensions based on the smallest new canvas dimension
    updateCubeDimensions();
    let scaleFactor = cubeHeight / oldCubeHeight;

    // Update lengths array to adjust to the new canvas size
    for (let i = 0; i < lengths.length; i++) {
        lengths[i] *= scaleFactor; // Update length based on the scaleFactor
    }
}

// KeyPressed function handles key press events
function keyPressed() {
    if (key === 'a') { // Check if the 'a' key was pressed
        animation.animate = !animation.animate; // Toggle the animation state
    } else if (key === '1') { // Check if the '1' key was pressed
        resetView(); // Reset the view to the original position
    } else if (key === 's') { // Check if the 's' key was pressed
        //event.preventDefault();
        saveCanvas('heart', 'png');
    } else if (key === ' ') {
        // Cycle through the grayscaleColors array
        currentColorIndex = (currentColorIndex + 1) % grayscaleColors.length;
    }
}

let stlText = `solid 
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 6.331470 1.508200
vertex -2.000000 6.331470 1.508200
vertex -2.000000 4.331470 1.508200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 6.331470 1.508200
vertex -2.000000 4.331470 1.508200
vertex 0.000000 4.331470 1.508200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 4.331470 0.008200
vertex 0.000000 4.331470 1.508200
vertex -2.000000 4.331470 1.508200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 4.331470 0.008200
vertex -2.000000 4.331470 1.508200
vertex -2.000000 4.331470 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 4.331470 0.008200
vertex -2.000000 4.331470 1.508200
vertex -2.000000 6.331470 1.508200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 4.331470 0.008200
vertex -2.000000 6.331470 1.508200
vertex -2.000000 6.331470 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 6.331470 0.008200
vertex 0.000000 6.331470 0.008200
vertex 0.000000 4.331470 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 6.331470 0.008200
vertex 0.000000 4.331470 0.008200
vertex -2.000000 4.331470 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 6.331470 0.008200
vertex 0.000000 6.331470 1.508200
vertex 0.000000 4.331470 1.508200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 6.331470 0.008200
vertex 0.000000 4.331470 1.508200
vertex 0.000000 4.331470 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 6.331470 0.008200
vertex -2.000000 6.331470 1.508200
vertex 0.000000 6.331470 1.508200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 6.331470 0.008200
vertex 0.000000 6.331470 1.508200
vertex 0.000000 6.331470 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.070745 1.008200
vertex -2.000000 2.070745 1.008200
vertex -2.000000 0.070745 1.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 2.070745 1.008200
vertex -2.000000 0.070745 1.008200
vertex 0.000000 0.070745 1.008200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 0.070745 0.008200
vertex 0.000000 0.070745 1.008200
vertex -2.000000 0.070745 1.008200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 0.070745 0.008200
vertex -2.000000 0.070745 1.008200
vertex -2.000000 0.070745 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 0.070745 0.008200
vertex -2.000000 0.070745 1.008200
vertex -2.000000 2.070745 1.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 0.070745 0.008200
vertex -2.000000 2.070745 1.008200
vertex -2.000000 2.070745 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 2.070745 0.008200
vertex 0.000000 2.070745 0.008200
vertex 0.000000 0.070745 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 2.070745 0.008200
vertex 0.000000 0.070745 0.008200
vertex -2.000000 0.070745 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 2.070745 0.008200
vertex 0.000000 2.070745 1.008200
vertex 0.000000 0.070745 1.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 2.070745 0.008200
vertex 0.000000 0.070745 1.008200
vertex 0.000000 0.070745 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 2.070745 0.008200
vertex -2.000000 2.070745 1.008200
vertex 0.000000 2.070745 1.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 2.070745 0.008200
vertex 0.000000 2.070745 1.008200
vertex 0.000000 2.070745 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.042968 4.192177 1.258200
vertex -1.957032 4.192177 1.258200
vertex -1.957032 2.192177 1.258200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.042968 4.192177 1.258200
vertex -1.957032 2.192177 1.258200
vertex 0.042968 2.192177 1.258200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.042968 2.192177 0.008200
vertex 0.042968 2.192177 1.258200
vertex -1.957032 2.192177 1.258200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.042968 2.192177 0.008200
vertex -1.957032 2.192177 1.258200
vertex -1.957032 2.192177 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.957032 2.192177 0.008200
vertex -1.957032 2.192177 1.258200
vertex -1.957032 4.192177 1.258200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -1.957032 2.192177 0.008200
vertex -1.957032 4.192177 1.258200
vertex -1.957032 4.192177 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.957032 4.192177 0.008200
vertex 0.042968 4.192177 0.008200
vertex 0.042968 2.192177 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -1.957032 4.192177 0.008200
vertex 0.042968 2.192177 0.008200
vertex -1.957032 2.192177 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.042968 4.192177 0.008200
vertex 0.042968 4.192177 1.258200
vertex 0.042968 2.192177 1.258200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.042968 4.192177 0.008200
vertex 0.042968 2.192177 1.258200
vertex 0.042968 2.192177 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -1.957032 4.192177 0.008200
vertex -1.957032 4.192177 1.258200
vertex 0.042968 4.192177 1.258200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -1.957032 4.192177 0.008200
vertex 0.042968 4.192177 1.258200
vertex 0.042968 4.192177 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 0.758200
vertex -2.000000 0.000000 0.758200
vertex -2.000000 -2.000000 0.758200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 0.000000 0.758200
vertex -2.000000 -2.000000 0.758200
vertex 0.000000 -2.000000 0.758200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -2.000000 0.008200
vertex 0.000000 -2.000000 0.758200
vertex -2.000000 -2.000000 0.758200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -2.000000 0.008200
vertex -2.000000 -2.000000 0.758200
vertex -2.000000 -2.000000 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -2.000000 0.008200
vertex -2.000000 -2.000000 0.758200
vertex -2.000000 0.000000 0.758200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -2.000000 0.008200
vertex -2.000000 0.000000 0.758200
vertex -2.000000 0.000000 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 0.000000 0.008200
vertex 0.000000 0.000000 0.008200
vertex 0.000000 -2.000000 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 0.000000 0.008200
vertex 0.000000 -2.000000 0.008200
vertex -2.000000 -2.000000 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 0.000000 0.008200
vertex 0.000000 0.000000 0.758200
vertex 0.000000 -2.000000 0.758200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 0.000000 0.008200
vertex 0.000000 -2.000000 0.758200
vertex 0.000000 -2.000000 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 0.000000 0.008200
vertex -2.000000 0.000000 0.758200
vertex 0.000000 0.000000 0.758200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 0.000000 0.008200
vertex 0.000000 0.000000 0.758200
vertex 0.000000 0.000000 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 8.425074 1.758200
vertex -2.000000 8.425074 1.758200
vertex -2.000000 6.425074 1.758200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 8.425074 1.758200
vertex -2.000000 6.425074 1.758200
vertex 0.000000 6.425074 1.758200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 6.425074 0.008200
vertex 0.000000 6.425074 1.758200
vertex -2.000000 6.425074 1.758200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 6.425074 0.008200
vertex -2.000000 6.425074 1.758200
vertex -2.000000 6.425074 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 6.425074 0.008200
vertex -2.000000 6.425074 1.758200
vertex -2.000000 8.425074 1.758200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 6.425074 0.008200
vertex -2.000000 8.425074 1.758200
vertex -2.000000 8.425074 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 8.425074 0.008200
vertex 0.000000 8.425074 0.008200
vertex 0.000000 6.425074 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 8.425074 0.008200
vertex 0.000000 6.425074 0.008200
vertex -2.000000 6.425074 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 8.425074 0.008200
vertex 0.000000 8.425074 1.758200
vertex 0.000000 6.425074 1.758200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 8.425074 0.008200
vertex 0.000000 6.425074 1.758200
vertex 0.000000 6.425074 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 8.425074 0.008200
vertex -2.000000 8.425074 1.758200
vertex 0.000000 8.425074 1.758200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 8.425074 0.008200
vertex 0.000000 8.425074 1.758200
vertex 0.000000 8.425074 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 -2.130355 0.508200
vertex -2.000000 -2.130355 0.508200
vertex -2.000000 -4.130355 0.508200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 -2.130355 0.508200
vertex -2.000000 -4.130355 0.508200
vertex 0.000000 -4.130355 0.508200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -4.130355 0.008200
vertex 0.000000 -4.130355 0.508200
vertex -2.000000 -4.130355 0.508200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -4.130355 0.008200
vertex -2.000000 -4.130355 0.508200
vertex -2.000000 -4.130355 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -4.130355 0.008200
vertex -2.000000 -4.130355 0.508200
vertex -2.000000 -2.130355 0.508200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -4.130355 0.008200
vertex -2.000000 -2.130355 0.508200
vertex -2.000000 -2.130355 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 -2.130355 0.008200
vertex 0.000000 -2.130355 0.008200
vertex 0.000000 -4.130355 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 -2.130355 0.008200
vertex 0.000000 -4.130355 0.008200
vertex -2.000000 -4.130355 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 -2.130355 0.008200
vertex 0.000000 -2.130355 0.508200
vertex 0.000000 -4.130355 0.508200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 -2.130355 0.008200
vertex 0.000000 -4.130355 0.508200
vertex 0.000000 -4.130355 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 -2.130355 0.008200
vertex -2.000000 -2.130355 0.508200
vertex 0.000000 -2.130355 0.508200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 -2.130355 0.008200
vertex 0.000000 -2.130355 0.508200
vertex 0.000000 -2.130355 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 -4.269606 0.258200
vertex -2.000000 -4.269606 0.258200
vertex -2.000000 -6.269606 0.258200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 -4.269606 0.258200
vertex -2.000000 -6.269606 0.258200
vertex 0.000000 -6.269606 0.258200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -6.269606 0.008200
vertex 0.000000 -6.269606 0.258200
vertex -2.000000 -6.269606 0.258200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 -6.269606 0.008200
vertex -2.000000 -6.269606 0.258200
vertex -2.000000 -6.269606 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -6.269606 0.008200
vertex -2.000000 -6.269606 0.258200
vertex -2.000000 -4.269606 0.258200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 -6.269606 0.008200
vertex -2.000000 -4.269606 0.258200
vertex -2.000000 -4.269606 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 -4.269606 0.008200
vertex 0.000000 -4.269606 0.008200
vertex 0.000000 -6.269606 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 -4.269606 0.008200
vertex 0.000000 -6.269606 0.008200
vertex -2.000000 -6.269606 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 -4.269606 0.008200
vertex 0.000000 -4.269606 0.258200
vertex 0.000000 -6.269606 0.258200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 -4.269606 0.008200
vertex 0.000000 -6.269606 0.258200
vertex 0.000000 -6.269606 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 -4.269606 0.008200
vertex -2.000000 -4.269606 0.258200
vertex 0.000000 -4.269606 0.258200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 -4.269606 0.008200
vertex 0.000000 -4.269606 0.258200
vertex 0.000000 -4.269606 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 10.540681 2.008200
vertex -2.000000 10.540681 2.008200
vertex -2.000000 8.540681 2.008200
endloop
endfacet
facet normal 0.000000 0.000000 1.000000
outer loop
vertex 0.000000 10.540681 2.008200
vertex -2.000000 8.540681 2.008200
vertex 0.000000 8.540681 2.008200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 8.540681 0.008200
vertex 0.000000 8.540681 2.008200
vertex -2.000000 8.540681 2.008200
endloop
endfacet
facet normal 0.000000 -1.000000 0.000000
outer loop
vertex 0.000000 8.540681 0.008200
vertex -2.000000 8.540681 2.008200
vertex -2.000000 8.540681 0.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 8.540681 0.008200
vertex -2.000000 8.540681 2.008200
vertex -2.000000 10.540681 2.008200
endloop
endfacet
facet normal -1.000000 0.000000 0.000000
outer loop
vertex -2.000000 8.540681 0.008200
vertex -2.000000 10.540681 2.008200
vertex -2.000000 10.540681 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 10.540681 0.008200
vertex 0.000000 10.540681 0.008200
vertex 0.000000 8.540681 0.008200
endloop
endfacet
facet normal 0.000000 0.000000 -1.000000
outer loop
vertex -2.000000 10.540681 0.008200
vertex 0.000000 8.540681 0.008200
vertex -2.000000 8.540681 0.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 10.540681 0.008200
vertex 0.000000 10.540681 2.008200
vertex 0.000000 8.540681 2.008200
endloop
endfacet
facet normal 1.000000 0.000000 0.000000
outer loop
vertex 0.000000 10.540681 0.008200
vertex 0.000000 8.540681 2.008200
vertex 0.000000 8.540681 0.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 10.540681 0.008200
vertex -2.000000 10.540681 2.008200
vertex 0.000000 10.540681 2.008200
endloop
endfacet
facet normal 0.000000 1.000000 0.000000
outer loop
vertex -2.000000 10.540681 0.008200
vertex 0.000000 10.540681 2.008200
vertex 0.000000 10.540681 0.008200
endloop
endfacet
endsolid`;
