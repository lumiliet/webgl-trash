export function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
) {
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(shader);
    }

    return shader;
}

export function createProgram(
    gl: WebGLRenderingContext,
    shaders: WebGLShader[]
) {
    const program = gl.createProgram()!;

    shaders.forEach(shader => gl.attachShader(program, shader));

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }

    return program;
}
