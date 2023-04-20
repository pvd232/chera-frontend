#ifdef GL_ES
precision mediump float;
#endif

uniform float u_iteration;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float blurRadius = u_iteration;

    float hstep = 1.0 / resolution.x;
    float vstep = 1.0 / resolution.y;
    //blur radius in pixels
    float blur = blurRadius / resolution.x / 4.0;     
    vec4 sum;
    sum += texture2D(inputBuffer, vec2(uv.x - 4.0 * blurRadius * hstep, uv.y - 4.0 * blurRadius*vstep)) * 0.0162162162;
    sum += texture2D(inputBuffer, vec2(uv.x - 3.0 * blurRadius * hstep, uv.y - 3.0 * blurRadius*vstep)) * 0.0540540541;
    sum += texture2D(inputBuffer, vec2(uv.x - 2.0 * blurRadius * hstep, uv.y - 2.0 * blurRadius*vstep)) * 0.1216216216;
    sum += texture2D(inputBuffer, vec2(uv.x - 1.0 * blurRadius * hstep, uv.y - 1.0 * blurRadius*vstep)) * 0.1945945946;

    sum += texture2D(inputBuffer, vec2(uv.x, uv.y)) * 0.2270270270;

    sum += texture2D(inputBuffer, vec2(uv.x + 1.0 * blurRadius*hstep, uv.y + 1.0 * blurRadius*vstep)) * 0.1945945946;
    sum += texture2D(inputBuffer, vec2(uv.x + 2.0 * blurRadius*hstep, uv.y + 2.0 * blurRadius*vstep)) * 0.1216216216;
    sum += texture2D(inputBuffer, vec2(uv.x + 3.0 * blurRadius*hstep, uv.y + 3.0 * blurRadius*vstep)) * 0.0540540541;
    sum += texture2D(inputBuffer, vec2(uv.x + 4.0 * blurRadius*hstep, uv.y + 4.0 * blurRadius*vstep)) * 0.0162162162;
    outputColor = sum;
}
                