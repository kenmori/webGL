window.onload = function(){

	var c = document.getElementById('canvas');
	c.width  = 512;
	c.height = 512;

	var gl = c.getContext('webgl');
	if(!gl){
		alert('webgl not supported');
		return;
	}
	gl.clearColor(0.0, 0.0, 1.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	//三角形を形成する頂点のデータを受け取る
	var triangleData = genTriangle();

	//頂点データからバッファを生成
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleData.p), gl.STATIC_DRAW);

	var vertexSource = document.getElementById('vs').textContent;
	var fragmentSource = document.getElementById('fs').textContent;

	function shaderProgram(vertexSource, fragmentSource){
		//シェダーオブジェクトの生成
		var vertexShader =  gl.createShader(gl.VERTEX_SHADER);
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		// シェダーにソースを割り当ててコンパイル
		gl.shaderSource(vertexShader, vertexSource);
		gl.shaderSource(fragmentShader, fragmentSource);
		gl.compileShader(vertexShader);
		gl.compileShader(fragmentShader);

		//プログラムオブジェクトの生成から選択まで
		var programs = gl.createProgram();
		gl.attachShader(programs, vertexShader);
		gl.attachShader(programs, fragmentShader);
		gl.linkProgram(programs);
		gl.useProgram(programs);

		return programs;
	}


	//プログラムオブジェクトに三角形の頂点データを登路

	var attLocation = gl.getAttribLocation(shaderProgram(vertexSource, fragmentSource), 'position');
	gl.enableVertexAttribArray(attLocation);
	gl.vertexAttribPointer(attLocation, 3, gl.FLOAT, false, 0, 0);

	//描画
	gl.drawArrays(gl.TRIANGLES, 0, triangleData.p.length / 3);
	gl.flush();
}

function genTriangle(){
	var obj = {};
	obj.p = [
		0.0, 0.5, 0.0,
		0.5, -0.5, 0.0,
		-0.5, -0.5, 0.0,
//y座標だけ反転させる
		0.0, -0.5, 0.0,
		0.5, 0.5, 0.0,
		-0.5, 0.5, 0.0,


	];
	return obj;
}
