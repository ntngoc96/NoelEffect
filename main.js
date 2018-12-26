document.addEventListener("DOMContentLoaded",()=>{
    var canvas = document.querySelector('canvas');
    var heart = document.getElementById('heart');
    var arrSnow = document.querySelectorAll('.snow');
    var imgHeart = document.querySelector('.heart img');
    var boy = document.getElementById('boy');
    var boyHeart = document.getElementById('boy-heart');
    var girl = document.getElementById('girl');
    var snowman = document.getElementById('snowman');
    var loadingSnow =0;
    var christmas = document.getElementById('christmas')
    var bell = document.getElementById('bell');
    var pine = document.getElementById('pine');
    var question = document.getElementById('question');
    var exclamation = document.getElementById('exclamation');

    var c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.addEventListener('resize',()=>{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    function Snow(){
      this.radius = Math.random()*4;
      this.x = Math.floor(Math.random()* canvas.width);
      this.y = -this.radius;
      this.color = '#ffffff';
      this.velocity = {
        x: Math.random()  * 4 -2,
        y: Math.random()  * 3 + 2
      };
    };
    
    function makeSnow(){
      if(loadingSnow == 300){
        arrSnow[0].style.visibility = "visible";
        arrSnow[1].style.visibility = "visible";
      }
      else if(loadingSnow == 400){
        arrSnow[2].style.visibility = "visible";
        imgHeart.style.animation = "none";
  
      }
      else if(loadingSnow == 600){
        arrSnow[3].style.visibility = "visible";
        arrSnow[4].style.visibility = "visible";
      }
      else if(loadingSnow == 800){
        arrSnow[5].style.visibility = "visible";
        arrSnow[6].style.visibility = "visible";
      }
      else if(loadingSnow == 950){
        arrSnow[7].style.visibility = "visible";
      }
    }
    
    function destroySnow(){
      console.log('call me')
      arrSnow.forEach(function(snow){
        snow.style.visibility="hidden";
      });
      loadingSnow = 0;
      imgHeart.src = "https://www.freeiconspng.com/uploads/blank-heart-love-hd-png-28.png";
      imgHeart.style.animation = 'beat 1s linear 1s infinite alternate'
    }
    Snow.prototype.draw = function(c){
      c.beginPath();
      c.arc(this.x,this.y,this.radius,0,Math.PI * 2);
      c.fillStyle = this.color;
      c.shadowColor = this.color;
      c.shadowBlur = 5;
      c.fill();
      c.closePath();
    }
    
    Snow.prototype.update = function(c){
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      
       if(this.y >= canvas.height)
         this.velocity.y = 0;
       
         
      this.draw(c);
    }
    var arraySnow = [];
    function init(){
      for(let i = 0 ; i < 2; i++){
        arraySnow.push(new Snow());
        if(loadingSnow < 1000){
          loadingSnow++;
          
        }
      }
    }
    
    function animate(){
      window.requestAnimationFrame(animate);
      c.clearRect(0,0,canvas.width,canvas.height);
      arraySnow.forEach(function(snow){
        snow.update(c);
      });
      init();
      if(!girlMove){
        if(loadingSnow<1001){
          makeSnow();
          
        }
        if(loadingSnow == 1000){
          imgHeart.src= "https://cdn4.iconfinder.com/data/icons/love-and-valentine-2-12/48/56-512.png";
        }
      }
      
      if(girl.offsetLeft < 0){
        christmas.style.visibility = "visible"
        pine.style.visibility = "visible";
        bell.style.visibility = "visible";
        snowman.style.visibility = "visible";
      }
      if(boy.offsetLeft > girl.offsetLeft - 20 && boy.offsetLeft < girl.offsetLeft + 50 ){
        destroySnow();
      }
      if(arraySnow.length > 500)
        arraySnow.splice(0,2);
    };
     animate();
   
    //information
    // var clientX = document.getElementById('clientX');
    // var clientY = document.getElementById('clientY');
    // var innerWidth = document.getElementById('innerWidth');
    // var innerHeight = document.getElementById('innerHeight');
    // var distance = document.getElementById('distance');
    // var heartX = document.getElementById('heartX');
    // var heartY = document.getElementById('heartY');
    // function getDistance(x1,y1,x2,y2){
    //   let x = x2-x1;
    //   let y = y2-y1;
    //   return Math.floor(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)))
    // }
  // document.onmousemove = function(){
  //         clientX.innerHTML = event.clientX;
  //         clientY.innerHTML = event.clientY;
  //         innerWidth.innerHTML = window.innerWidth;
  //         innerHeight.innerHTML = window.innerHeight;
  //         distance.innerHTML = getDistance(event.clientX,event.clientY,window.innerWidth,window.innerHeight);
  //         heartX.innerText = boy.offsetLeft;
  //         heartY.innerText = girl.offsetLeft;
  //     };
    
    //boy
    var left = false; //quay qua ben trai
    var girlMove = false;
    document.addEventListener('keydown',function(){
      if(event.keyCode === 37 || event.keyCode === 65){
        boy.style.left = (parseInt(window.getComputedStyle(boy,null).getPropertyValue('left').split('px')[0])-15) + "px";
        if(!left){
          boy.style.transform = "scaleX(-1)";
          left = true;
        }
        if(girlMove){
          girl.style.left = (parseInt(window.getComputedStyle(girl,null).getPropertyValue('left').split('px')[0])-15) + "px";
          heart.style.left = (parseInt(window.getComputedStyle(heart,null).getPropertyValue('left').split('px')[0])-15) + "px";
        }
      }
      else if(event.keyCode === 39 || event.keyCode === 68){
        boy.style.left = (parseInt(window.getComputedStyle(boy,null).getPropertyValue('left').split('px')[0])+15) + "px";
        if(left){
          boy.style.transform = "none";
          left= false;
        }
        if(girlMove){
          girl.style.left = (parseInt(window.getComputedStyle(girl,null).getPropertyValue('left').split('px')[0])+15) + "px";
          heart.style.left = (parseInt(window.getComputedStyle(heart,null).getPropertyValue('left').split('px')[0])+15) + "px";
        }
      }
      else if(event.keyCode === 32){
        girlMove = true;
        boyHeart.style.visibility = "visible";
        exclamation.style.visibility = "hidden";
        question.style.visibility = "hidden";

      }
      else if(event.keyCode === 81){
        exclamation.style.visibility = "hidden";
        question.style.visibility = "visible";
      } 
      else if(event.keyCode === 69){
        question.style.visibility = "hidden";
        exclamation.style.visibility = "visible";
        exclamation.style.animation = "suprise .5s linear 0s"
      }
    }); 
    // end of event keydown
    
  
  })