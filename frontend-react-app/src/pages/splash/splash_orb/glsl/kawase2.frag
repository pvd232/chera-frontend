#ifdef GL_ES
precision mediump float;
#endif

uniform float delta_x;
uniform float delta_y;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 delta = vec2(delta_x, delta_y);
	vec4 sum = vec4( 0. );
	vec2 inc = delta / resolution;

	sum += texture2D( inputBuffer, ( uv - inc * 4. ) ) * 0.051;
	sum += texture2D( inputBuffer, ( uv - inc * 3. ) ) * 0.0918;
	sum += texture2D( inputBuffer, ( uv - inc * 2. ) ) * 0.12245;
	sum += texture2D( inputBuffer, ( uv - inc * 1. ) ) * 0.1531;
	sum += texture2D( inputBuffer, ( uv + inc * 0. ) ) * 0.1633;
	sum += texture2D( inputBuffer, ( uv + inc * 1. ) ) * 0.1531;
	sum += texture2D( inputBuffer, ( uv + inc * 2. ) ) * 0.12245;
	sum += texture2D( inputBuffer, ( uv + inc * 3. ) ) * 0.0918;
	sum += texture2D( inputBuffer, ( uv + inc * 4. ) ) * 0.051;

	outputColor = sum;

}
