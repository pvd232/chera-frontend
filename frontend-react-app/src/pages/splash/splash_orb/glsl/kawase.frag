#ifdef GL_ES
precision mediump float;
#endif

uniform float u_iteration;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
	vec2 texelSize05 = texelSize * 0.5;
	
	vec2 uvOffset = texelSize.xy * vec2(u_iteration, u_iteration) + texelSize05;
	
	vec2 texCoordSample;
	vec4 color = inputColor;
	
	texCoordSample.x = uv.x - uvOffset.x;
	texCoordSample.y = uv.y + uvOffset.y;
	color += texture2D(inputBuffer, texCoordSample);
	
	texCoordSample.x = uv.x + uvOffset.x;
	texCoordSample.y = uv.y + uvOffset.y;
	color += texture2D(inputBuffer, texCoordSample);
	
	texCoordSample.x = uv.x + uvOffset.x;
	texCoordSample.y = uv.y - uvOffset.y;
	color += texture2D(inputBuffer, texCoordSample);
	
	texCoordSample.x = uv.x - uvOffset.x;
	texCoordSample.y = uv.y - uvOffset.y;
	color += texture2D(inputBuffer, texCoordSample);
	
	outputColor = color / 5.0;
}
