var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.moveTo(400,0);
            ctx.lineTo(400,900);
            ctx.moveTo(800,0);
            ctx.lineTo(800,900);
            ctx.moveTo(0,300);
            ctx.lineTo(1200,300);
            ctx.moveTo(0,600);
            ctx.lineTo(1200,600);
            ctx.stroke();

    var btn = document.getElementById('downBtn');
        btn.onclick = function() {
            var timeDate = +new Date;
            console.log(timeDate)
  domtoimage.toJpeg(document.getElementById('myCanvas'))
    .then(function(blob) {
      window.saveAs(blob, timeDate);
    });

  }


    function canvasCheck(x,y){
        var drawn   = null;
        var d       = ctx.getImageData(x, y, 400-5, 300-5);
        var len     = d.data.length;
            for(var i =0; i< len; i++) {
                if(!d.data[i]) {
                    drawn = true;
                }else if(d.data[i]) {
                     drawn = true;
                    console.log('Something drawn on Canvas');
                    return false;
                    break;
                }
            }
            if(drawn) {
                console.log('Nothing drawn on canvas.. AKA, Canvas is Empty');
                    return true;
                
            }
    }

            function loadImages(sources,callback){
                var images = {};
                var loadedimges = 0 ;
                var numimages = 0;

                for(var src in sources){
                    numimages++;
                }
                var i = 1;
                for(var src in sources){
                    var x = "value"+i;
                    console.log(x);
                    images[x] = new Image();
                    images[x].onload = function(){
                        if(++loadedimges >= numimages){
                            console.log("return")
                            callback(images);
                        }
                    };
                    images[x].src = sources[src];
                    console.log(images[x])
                    i++;
                }
            }
            
            // get the x and y axis
            function getAxis(sources){
                loadImages(sources, function(images){
                    console.log(images.value1.currentSrc);
                    console.log(images);
                    //var z=2;

                    var x,y;
                    for(var j=0;j<9;j++){
                    
                    if(j>=0 && j<=2){
                        y=2;
                    }
                    else if(j>=3 && j<=5){
                        y = 302;
                    }
                    else if(j>=6 && j<=8){
                        y=602;
                    }
                    if(j==0 || j== 3 || j==6){
                        x=2;
                    }
                    else if(j==1 || j== 4 || j==7){
                        x=402;
                    }
                    else if(j==2 || j== 5 || j==8){
                        x=802;
                    }
                    var response = canvasCheck(x,y);
                    if(response){
                        console.log(Object.keys(images).length);
                        if((Object.keys(images).length)+j<=9){
                            drawingImagesOnCanvas(x,y,images);
                            break;
                        }else{
                            console.log("Space not enough")
                        }
                    }
                }
                });
            }


            loadFile = function(event){
                var sources = {}
                for (var i=0;i<event.target.files.length;i++){
                    var data = "value"+(i+1);
                    sources[data] = URL.createObjectURL(event.target.files[i] );
                }
                console.log(sources);
                getAxis(sources);
                
            }

            window.onload=function(){ 
            var canvas = document.getElementById('myCanvas');
            //var ctx=holder.getContext("2d");

            canvas.ondragover = function () { this.className = 'hover'; return false; };
            canvas.ondragend = function () { this.className = ''; return false; };
            canvas.ondrop = function (e) {
                 e.stopPropagation();
                e.preventDefault();
                var sources = {};
                //var url=e.dataTransfer.getData('text/plain');
                var files = e.dataTransfer.files
                // for img elements, url is the img src so 
                // create an Image Object & draw to canvas
                for (var i=0;i<files.length;i++) {
                    //var file = files[i];
                    var data = "value"+(i+1);
                    sources[data] = URL.createObjectURL(e.dataTransfer.files[i] );
                }
                
                //console.log(file.name);
                getAxis(sources);
            }}

            function drawingImagesOnCanvas(x,y,images){
                for(var src in images){
                        console.log(images[src]);
                        ctx.drawImage(images[src],x,y,400-5,300-5);
                        //z = z+300;
                        x = x+400;
                        if(x>1004){
                            x=0;
                            y = y +300;
                        }
                        
                    }
            }