import { vertexShaderText, fragmentShaderText } from "./shaders.js";
import { createShader, createProgram } from "./utils.js";
// @ts-ignore
const { mat4, glMatrix } = window.glMatrix;
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const gl = canvas.getContext("webgl");
// @ts-ignore
window.gl = gl;
gl.enable(gl.DEPTH_TEST);
// gl.enable(gl.CULL_FACE);
// gl.frontFace(gl.CCW);
// gl.cullFace(gl.BACK);
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);
const program = createProgram(gl, [vertexShader, fragmentShader]);
const boxVertices = [
// -1.0, 1.0, -1.0,             0, 0,
// -1.0, 1.0, 1.0,             0, 1,
// 1.0, 1.0, 1.0,             1, 1,
// 1.0, 1.0, -1.0,             1, 0,
// -1.0, 1.0, 1.0,             0, 0,
// -1.0, -1.0, 1.0,             0, 1,
// -1.0, -1.0, -1.0,             1, 1,
// -1.0, 1.0, -1.0,             1, 0,
// 1.0, 1.0, 1.0,              0, 0,
// 1.0, -1.0, 1.0,              0, 1,
// 1.0, -1.0, -1.0,              1, 1,
// 1.0, 1.0, -1.0,              1, 0,
// 1.0, 1.0, 1.0,              0, 0,
// 1.0, -1.0, 1.0,              0, 1,
// -1.0, -1.0, 1.0,              1, 1,
// -1.0, 1.0, 1.0,              1, 0,
// 1.0, 1.0, -1.0,             0, 0,
// 1.0, -1.0, -1.0,             0, 1,
// -1.0, -1.0, -1.0,             1, 1,
// -1.0, 1.0, -1.0,             1, 0,
// -1.0, -1.0, -1.0,           1, 1,
// -1.0, -1.0, 1.0,           1, 0,
// 1.0, -1.0, 1.0,           0, 0,
// 1.0, -1.0, -1.0,           0, 1,
];
const box = [
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
];
const getRandomVertex = () => {
    const randomValue = () => Math.random() * 2 - 1;
    return [randomValue(), randomValue(), randomValue()];
};
const getRandomColor = () => {
    const randomValue = () => Math.random();
    return [randomValue(), randomValue(), randomValue()];
};
for (let i = 0; i < 24; i++) {
    const vertex = [
        ...box.slice(i * 3, i * 3 + 3), ...getRandomColor(),
    ];
    vertex.forEach(v => boxVertices.push(v));
}
const boxIndices = [
    0, 1, 2,
    0, 2, 3,
    5, 4, 6,
    6, 4, 7,
    8, 9, 10,
    8, 10, 11,
    13, 12, 14,
    15, 14, 12,
    16, 17, 18,
    16, 18, 19,
    21, 20, 22,
    22, 20, 23,
];
const boxVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
const boxIndexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
gl.enableVertexAttribArray(positionAttribLocation);
const texCoordAttribLocation = gl.getAttribLocation(program, "vertColor");
gl.vertexAttribPointer(texCoordAttribLocation, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
gl.enableVertexAttribArray(texCoordAttribLocation);
gl.useProgram(program);
// const boxTexture = gl.createTexture();
// gl.bindTexture(gl.TEXTURE_2D, boxTexture);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// const imageElement = document.getElementById("crate-texture") as HTMLImageElement;
// console.log(imageElement);
// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageElement);
// gl.bindTexture(gl.TEXTURE_2D, null);
const matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
const worldMatrix = new Float32Array(16);
mat4.identity(worldMatrix);
gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
const matViewUniformLocation = gl.getUniformLocation(program, "mView");
const viewMatrix = new Float32Array(16);
mat4.lookAt(viewMatrix, [1, 10, 0], [0, 0, 0], [0, 1, 0]);
gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);
const matProjUniformLocation = gl.getUniformLocation(program, "mProj");
const projMatrix = new Float32Array(16);
mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, .1, 1000);
gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);
// @ts-ignore
window.render = true;
let angle;
let distance = 5;
let velocity = 0;
let acceleration = -.00002;
let startVelocity = 0;
let startTime = performance.now();
let lastTime = performance.now();
const toggleDirection = () => {
    startTime = performance.now();
    startVelocity = velocity * -1;
};
const fall = () => {
    const diff = performance.now() - lastTime;
    velocity = (lastTime - startTime) * acceleration + startVelocity;
    distance = distance + velocity * diff;
    if (distance <= -15 && velocity < 0) {
        toggleDirection();
    }
    lastTime = performance.now();
    return distance;
};
const identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
const xRotationMatrix = new Float32Array(16);
const yRotationMatrix = new Float32Array(16);
const yTranslationMatrix = new Float32Array(16);
const viewRotationMatrix = new Float32Array(16);
const viewLookMatrix = new Float32Array(16);
const tempMatrix1 = new Float32Array(16);
const tempMatrix2 = new Float32Array(16);
const loop = () => {
    angle = performance.now() / 1000 / 5 * 2 * Math.PI;
    distance = fall();
    mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    mat4.rotate(yRotationMatrix, identityMatrix, angle / 3, [-1, 0, 0]);
    mat4.translate(yTranslationMatrix, identityMatrix, [0, distance, 0]);
    mat4.mul(tempMatrix1, yTranslationMatrix, yRotationMatrix);
    mat4.mul(worldMatrix, tempMatrix1, xRotationMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    // mat4.translate(viewRotationMatrix, identityMatrix, [0, distance / 2, 0]);
    // mat4.lookAt(viewLookMatrix, [1,10,0], [0,0,0], [0,1,0]);
    // mat4.mul(viewMatrix, viewLookMatrix, viewRotationMatrix);
    // gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
    // @ts-ignore
    if (window.render) {
        window.requestAnimationFrame(loop);
    }
};
window.requestAnimationFrame(loop);
