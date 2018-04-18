var paper = require("paper");

function FlowerGenerate(flowers,count,ordering,year,scenario){

    var group;
    var myArray = ['#FF6A33','#FFA62F','#E8A317','#FF8040', '#E66C2C'];
    var total = flowers.solar + flowers.bio + flowers.wind + flowers.hydro + flowers.fossil;
    var sunFlower = new paper.Path.Circle(new paper.Point(45, 110), 40);
    var solar = (flowers.solar/total);
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    sunFlower.fillColor = rand;


    if(solar <= 100){
        var cloneSolar = sunFlower.clone();
        cloneSolar.scale(solar);
        sunFlower.strokeColor = "lightblue";
        sunFlower.strokeWidth = 4;
        sunFlower.fillColor = "lightblue";
        sunFlower.opacity = 0;
        cloneSolar.bounds.bottomCenter = sunFlower.bounds.bottomCenter;
        group = new paper.Group([sunFlower,cloneSolar]);
        }
        else{
        group = new paper.Group([sunFlower]);
        }

    //var rectangle = new paper.Rectangle(new paper.Point(30, 100), new paper.Point(20, 180));
    //var shape = new paper.Shape.Ellipse(rectangle);

    //var path = new paper.Path.RoundRectangle(rectangle, cornerSize);
    //shape.fillColor = 'green';
    var combine;
    //Scale leaf  percent and make sure it's still attached to stem.
    //var leaf = new paper.Path().importSVG("resizedLeaf4.svg");
    var leaf = new paper.Raster('leaf');
    /*var leaf = new paper.Path.Ellipse(
        { point: [0, 200],
        size: [180, 60],
        fillColor: 'green'});*/
    leaf.position = new paper.Point(0,220);
    var bio = (flowers.bio/total);
    if(bio <= 100){
    var cloneleaf = leaf.clone();
    cloneleaf.scale(bio);
    if(bio< 74){
    cloneleaf.position.x +=4;    
    }
    if(bio < 65 ){
    cloneleaf.position.x +=4;
    }
    if(bio<54){
    cloneleaf.position.x +=4;
    }
    if(bio<46){
    cloneleaf.position.x +=4;
    }
    if(bio<38){
     cloneleaf.position.x +=4;   
    }
    if(bio<30){
     cloneleaf.position.x +=4;   
    }
    if(bio<22){
     cloneleaf.position.x +=4;   
    }
    leaf.opacity = 0;
    cloneleaf.fillColor = 'black';
    combine = new paper.Group([group,leaf,cloneleaf]);
    }
    else{
    combine = new paper.Group([group,leaf]);
    }
    //leaf.position.x += flowers.bio/10;
    
    //leaf.rotate(flowers.bio);
    //var group = new paper.Group();


    var stem = new paper.Path.Rectangle(combine.bounds.center.x+18,combine.bounds.center.y-20,20,150);
    //console.log(group.bounds.center);
    //stem.fillColor = '#8B4513';
    //stem.fillColor = "#669900";
    stem.fillColor = "#84AD32";
    combine.addChild(stem);

    
   // console.log(group.position);

    //var rotP = new paper.Point((group.bounds.x + group.bounds.width/2),(group.bounds.y + group.bounds.height));
    var rotP = new paper.Point(combine.bounds.bottomCenter.x+28,combine.bounds.bottomCenter.y);
    //var rect = new paper.Path.Rectangle(group.bounds.x,group.bounds.y,group.bounds.width,group.bounds.height);
    //rect.strokeColor = "red";

    var drop = new paper.Raster('drop');
    
    drop.position.x = combine.bounds.rightCenter.x + 60;
    drop.position.y = combine.bounds.rightCenter.y + 60;
    combine.addChild(drop);
   
    var cloneDrop = drop.clone();
    cloneDrop.scale((flowers.hydro/total)*10);
    //cloneDrop.strokeColor = black;
    //cloneDrop.strokeWidth = 10;
    drop.opacity = 0;
    combine.addChild(cloneDrop);

        

    //var rotP = new paper.Point(combine.bounds.bottomCenter.x+20,combine.bounds.bottomCenter.y);

    //group.rotate(45);

    //console.log(group.position);

    //console.log(group.bounds.bottomCenter);
   //var triangle = new paper.Path.RegularPolygon(rotP, 3, 60);
    //triangle.fillColor = '#303030';
    
    var root;
    var cloneGround;
    //var ground = new paper.Raster('ground');
    var ground = new paper.Path.Ellipse(
        { point: [20, 20],
        size: [200, 80],
        fillColor: '#A9A9A9'});
    ground.position = rotP;
    //ground.position.height += 300;


    root = new paper.Group([combine,ground]);

    combine.bringToFront();

        cloneGround = ground.clone();
        //cloneGround.bounds.width += (flowers.fossil/8);
        cloneGround.scale(flowers.fossil/total);
        //cloneGround.bounds.height -= (flowers.fossil/10);
        //cloneGround.position.y -= (flowers.fossil/20);
        //cloneGround.bounds.bottomCenter = ground.bounds.bottomCenter;
        ground.opacity = 0;
        root.addChild(cloneGround);

    group.bringToFront();
    var doRot = true;


    var rotV = 35;
    var w = (flowers.wind/total)*100;
    var combineClone = combine.clone();
    if(doRot){
     if(w <= 100){
         rotV -= (35*(w/100));
         combineClone.children[2].rotate(rotV,rotP);
         combineClone.children[5].children[1].rotate(rotV,rotP);
         combineClone.children[1].rotate(rotV,rotP);
         combine.opacity = 0;
         root.position.y += 10;
         if(w < 100){
         stem.bounds.height += 7;
         stem.bounds.y +=7;
         cloneGround.position.y += (w/10);
         }
     }else{
        combine.rotate(rotV, rotP);
        drop.rotate(-rotV);
     }
    }

    var doScale = true;
    if(doScale){
    root.position = new paper.Point(60,60);
    root.bounds.height = 90;
    root.bounds.width = 90;
    root.position = new paper.Point(45,45);

    }else{
        //root.position.x += 30;
    }



    var boundary = new paper.Path.Rectangle(root.bounds);
    //boundary.strokeColor = "#E6F3D3";
    //boundary.strokeWidth = 5;
    //boundary.fillColor = '#E6F3D3';
    var text = new paper.PointText(boundary.bounds.bottomCenter);
    text.justification = 'center';
    text.fillColor = 'black';
    text.content = count;
    text.visible =false;

    /*var center = new paper.Point(50, 50);
    var points = 12;
    var radius1 = 25;
    var radius2 = 40;
    var path = new paper.Path.Star(center, points, radius1, radius2);
    path.fillColor = 'yellow';
    path.opacity = 0.4;*/

    var center = new paper.Point(root.bounds.topLeft.x + 10, root.bounds.topLeft.y + 23);
    var points = 5;
    var radius1 = 7.5;
    var radius2 = 15;

    var path = new paper.Path.Star(center, points, radius1, radius2);
    /*star.fillColor = {
        gradient: {
            stops: [['red', flowers["shine"]], ['red', 1]],
            radial: true
        },
        origin: star.position,
        destination: star.bounds.rightCenter
    };*/
    path.fillColor = '#ffb74c';

    path.rotate(35);


    var star = path.clone();
    
    star.scale(flowers.shine);

    star.opacity = flowers.shine;

    /*star.on('frame', function(){
        star.rotate(1);
    });*/

    path.opacity = 0;
    root.addChild(path);
    root.addChild(star);
    path.sendToBack();
    boundary.sendToBack();

 


    var info = new paper.PointText({
        point: [150,10],
        content: "Scenario " + scenario + " Year: " + year + '\n' + '\n'
                 + "Solar:  " + Math.round(flowers["solar"]) +"\n" 
                 + "Wind:  " + Math.round(flowers["wind"]) +"\n" 
                 + "Hydro: " + Math.round(flowers["hydro"]) +"\n" 
                 + "Bio:     " + Math.round(flowers["bio"]) +"\n"
                 + "Fossil: " + Math.round(flowers["fossil"]),
        fillColor: 'black',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: '',
        fontSize: 8
    });


    var OmegaRoot = new paper.Group([root,boundary,text,info]);
    //OmegaRoot.addChild(text);
    //OmegaRoot.bounds.height += 20;
    //OmegaRoot.bounds.width +=20;
    combineClone.bringToFront();
    root.bringToFront();
    //text.bringToFront();
    //root.position.x += 5;
    //root.position.y+= 10;
    //ground.position = new paper.Point(root.bounds.bottomCenter.x,root.bounds.bottomCenter.y)
    /*for (var i = 0; i < 20; i++) {
        var plantRow = root.clone();
        plantRow.position.x += i * plantRow.bounds.width;
        for(var j = 0; j < 10; j++){
            var plantCol = plantRow.clone();
            plantCol.position.y += j *plantCol.bounds.height;
        }
    }*/

   /* paper.view.onFrame = function(event) { 
       //if(rotV < 35){
        combineClone.rotate(1,rotP);
        //drop.rotate(-1);
        combineClone.children[4].rotate(-1);
            //}
        //rotV++;
    };*/
    var hover;
   
    info.visible = false;
    OmegaRoot.attach('mouseenter', function() {
        hover = OmegaRoot.clone();
        hover.bounds.height += 400;
        hover.bounds.width += 400;
        hover.children[0].opacity = 0.75;
        hover.children[0].bounds.width += 300;
        hover.bringToFront();
        //hover.children[1].visible = true;
        hover.children[2].justification = 'right';
        hover.children[2].visible = true;
        boundary.fillColor = "yellow";
        boundary.opacity = 0.4;
        boundary.bringToFront();
        if(ordering <  500){
            hover.position.x +=90;
         }
        /*if((ordering%20) > 10){
            hover.position.x -= 900;
        }
        if(ordering > 99){
            hover.position.y -= 100;
        }
        if(ordering > 119){
            hover.position.y -= 100;
        }
        if(ordering > 139){
            hover.position.y -= 100;
        }
        if(ordering > 159){
            hover.position.y -= 100;
        }
        if(ordering > 179){
            //hover.position.y -= 100;
        }*/
    });
    
    // When the mouse leaves the item, set its fill color to black
    // and remove the mover function:
    OmegaRoot.on('mouseleave', function() {
        hover.visible = false;
        boundary.fillColor = "white";
        boundary.opacity = 1;
        boundary.sendToBack();
    });

    
        return OmegaRoot;
}

function addWeights(data,slidePars){
    for(var i = 0; i < data.length; i++){
    data[i].score = ((data[i].solar) * (slidePars.solarWeight)) +
    ((data[i].hydro) * (slidePars.hydroTight))+
    ((data[i].bio) * (slidePars.bioWeight))+
    ((data[i].wind)*(slidePars.windWeight))+
    ((data[i].fossil) * (slidePars.fossilWeight));
    }
}

