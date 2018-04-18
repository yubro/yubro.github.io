var paper = require("paper");
//var AsciiTable = require('ascii-table');
//const {table} = require('table');


function FlowerGenerate(flowers,count,ordering, fossilColor){

    //console.log(flowers);

    var ttable = createTable([{Type: "Scenario", MwH: parseInt(flowers["scenario"])},
                              {Type: "Solar", MwH: flowers['solar']},
                              {Type: "Wind", MwH: flowers['wind']},
                              {Type: "Hydro", MwH: flowers['hydro']},
                              {Type: "Bio", MwH: flowers['bio']},
                              {Type: "Fossil", MwH: flowers['fossil']},
                              {Type: "Energy ", MwH: parseInt(flowers["shine"] * 100)}],
                              {
                                headerSeparator: ' ',
                                outerBorder: ' ',
                                innerBorder: ' '
                              });
    
    //console.log(ttable);

    var group;
    var sunFlower = new paper.Path.Circle(new paper.Point(45, 110), 40);
    var cloneSolar;
    sunFlower.fillColor = "#FF6A33";
    if(flowers.solar <= 100){
        cloneSolar = sunFlower.clone();
        cloneSolar.scale(flowers.solar/100);
        sunFlower.strokeColor = "lightblue";
        sunFlower.strokeWidth = 4;
        sunFlower.fillColor = "lightblue";
        sunFlower.opacity = 0;
        cloneSolar.bounds.bottomCenter = new paper.Point(sunFlower.bounds.bottomCenter.x,sunFlower.bounds.bottomCenter.y - 9);
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
    var bio = flowers.bio;
    if(bio <= 100){
    var cloneleaf = leaf.clone();
    cloneleaf.scale(flowers.bio/100);
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


    var rec = new paper.Rectangle(combine.bounds.center.x+18,combine.bounds.center.y-20,20,150);
    var cornerSize = new paper.Size(10,10);
    var stem = new paper.Path.Rectangle(rec, cornerSize);
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
    cloneDrop.scale(flowers.hydro/100);
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
    /*var ground = new paper.Path.Ellipse(
        { point: [20, 20],
        size: [200, 80],
        fillColor: '#A9A9A9'});*/
    
    var rec2 = new paper.Rectangle(20,20,200,80);
    var corner = new paper.Size(50,50);
    var ground = new paper.Path.Rectangle(rec2, corner);
    
    ground.fillColor = '#4E4E4E';
    ground.position = rotP;

    //ground.position.height += 300;


    root = new paper.Group([combine,ground]);

    combine.bringToFront();

    if(flowers.fossil <= 100){
        cloneGround = ground.clone();
        //cloneGround.bounds.width += (flowers.fossil/8);
        cloneGround.scale(flowers.fossil/100);
        //cloneGround.bounds.height -= (flowers.fossil/10);
        //cloneGround.position.y -= (flowers.fossil/20);
        //cloneGround.bounds.bottomCenter = ground.bounds.bottomCenter;
        ground.opacity = 0;
        root.addChild(cloneGround);
    }

    group.bringToFront();
    var doRot = true;


    var rotV = 35;
    var combineClone = combine.clone();

    //var center = new paper.Point(combineClone.children[2].bounds.center.x, combineClone.children[2].bounds.center.y);
    /*var center = new paper.Point(combineClone.children[5].children[1].position.x, combineClone.children[5].children[1].position.y);
    var points = 10;
    var radius1 = 40;
    var radius2 = 70;
    var star = new paper.Path.Star(center, points, radius1, radius2);
    star.fillColor = 'yellow';*/
    //star.opacity = 0.4;
    //star.scale(flowers["shine"]);
    //combineClone.addChild(star);
    
    console.log(combineClone.children);

   /* var glow = new paper.Path.Circle(combineClone.position,85);
    //combineClone.children[2].strokeColor = 'black';
    glow.position.x -= 70;
    //glow.strokeColor = 'black';
    glow.fillColor = {
        gradient: {
            stops: [['yellow', 0.05], ['yellow', 0.8], ['#E6F3D3', 1]],
            radial: true
        },
        origin: glow.position,
        destination: glow.bounds.rightCenter
    };
    //glow.opacity = flowers["shine"];
    glow.scale(flowers["shine"]);
    //glow.position.x *= flowers["shine"];
    root.addChild(glow);*/
    
    if(doRot){
     if(flowers.wind <= 100){
         rotV -= (35*(flowers.wind/100));
         combineClone.children[2].rotate(rotV,rotP);
         combineClone.children[5].children[1].rotate(rotV,rotP);
         combineClone.children[1].rotate(rotV,rotP);
         //combineClone.children[6].rotate(rotV,rotP);
         //combineClone.children[6].rotate(rotV,rotP);
         //combineClone.rotate(rotV, rotP);
         //console.log(combineClone.children);
         //combineClone.children[4].position.x += 50;
         //combineClone.children[4].position.y += 50;
         combine.opacity = 0;
         root.position.y += 10;
         if(flowers.wind < 100){
         stem.bounds.height += 7;
         stem.bounds.y +=7;
         cloneGround.position.y += (flowers.wind/10);
         }
     }else{
        combine.rotate(rotV, rotP);
        drop.rotate(-rotV);
     }
    }

    var doScale = true;
    if(doScale){
    //root.position = new paper.Point(60,60);
    root.bounds.height = 90;
    root.bounds.width = 90;
    root.position = new paper.Point(45,80);

    }else{
        //root.position.x += 30;
    }



    var boundary = new paper.Path.Rectangle(root.bounds);
    boundary.bounds.height += 50;
    //boundary.bounds.width += 50;
    boundary.position.y -= 50;
    //boundary.position.x -= 50;
    //boundary.strokeColor = "#E6F3D3";
    //boundary.strokeWidth = 5;
   
    //boundary.fillColor = '#E6F3D3';
    
    var text = new paper.PointText(boundary.bounds.bottomCenter);
    text.justification = 'center';
    text.fillColor = 'black';
    text.content = count;
    text.visible =false;

    var center = new paper.Point(root.bounds.topCenter.x - 16, cloneSolar.bounds.topCenter.y - 15);
    var points = 16;
    var radius1 = 8;
    var radius2 = 10;
    var star = new paper.Path.Star(center, points, radius1, radius2);
    star.fillColor = {
        gradient: {
            stops: [['gold', 0.4], ['white', 0.45], ['orange', 1]],
            radial: true
        },
        origin: star.position,
        destination: star.bounds.rightCenter
    };
    //star.fillColor = 'red';

    star.opacity = flowers['shine'];
    star.scale(flowers['shine']);



    star.rotate(15);

    root.addChild(star);

    //root.children[4].sendToBack();
    //star.sendToBack();
    /*
     *
     */
    
    boundary.sendToBack();

    //var tableText = stringTable.create("flowers");
    var info = new paper.PointText({
        point: [150,10],
        content: ttable,/*"Scenario " + parseInt(flowers["scenario"]) + '\n' + '\n'
                 + "Solar:  " + flowers["solar"] +"% \n" 
                 + "Wind:  " + flowers["wind"] +"% \n" 
                 + "Hydro: " + flowers["hydro"] +"% \n" 
                 + "Bio:     " + flowers["bio"] +"% \n"
                 + "Fossil: " + flowers["fossil"] + "% \n"
                 + "Energy: " + parseInt(flowers["shine"] * 100) + "%",*/
        fillColor: 'black',
        fontFamily: 'Lucida Console , Monaco, monospace',
        fontWeight: '',
        fontSize: 8
    });


    var OmegaRoot = new paper.Group([root,boundary,text,info]);
    //OmegaRoot.scale(0.8);
    //OmegaRoot.bounds.height += 20;
    //OmegaRoot.bounds.width +=20;
    combineClone.bringToFront();
    star.sendToBack();
    root.bringToFront();
    //group.children[1].bringToFront();
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
        hover.bounds.width += 300;
        hover.children[0].opacity = 0.8;
        hover.children[0].bounds.width += 300;
        hover.position.y += 100;
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
        if((ordering%20) > 10){
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
        }
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

function createTable(records, options) {
    if (!records || records.length === 0) {
      return '';
    }

    console.log(records);

    options = options || {};

    var headers           = options.headers || Object.keys(records[0]),
        outerBorder       = options.outerBorder || '|',
        innerBorder       = options.innerBorder || '|',
        headerSeparator   = options.headerSeparator || '-',
        rowSeparator      = options.rowSeparator,
        capitalizeHeaders = options.capitalizeHeaders || false,
        formatters        = options.formatters || {},
        typeFormatters    = options.typeFormatters || {},
        rows              = [createHeaderRow(headers, capitalizeHeaders, true)],
        formats           = [];

    for (var i = 0; i < records.length; ++i) {
      // Yes, this is getting completely out of hand.
      appendRowAndFormat(records[i], headers, formatters, typeFormatters, rows, formats);
    }

    var totalWidth =
      // Width of outer border on each side
      (strLength(outerBorder) * 2) +

      // There will be an inner border between each cell, hence 1 fewer than total # of cells
      (strLength(innerBorder) * (headers.length - 1)) +

      // Each cell is padded by an additional space on either side
      (headers.length * 2);

    var columnWidths = [];
    for (var i = 0; i < rows[0].length; ++i) {
      (function(columnIndex) {
        var columnWidth = getMaxWidth(rows, columnIndex);
        columnWidths.push(columnWidth);
        totalWidth += columnWidth;
      }(i));
    }

    var columnTypes = [];
    for (var i = 0; i < rows[0].length; ++i) {
      columnTypes.push(getColumnType(rows, i));
    }

    var formattedLines = [];
    for (var i = 0; i < rows.length; ++i) {
      (function(row, cellFormats) {
        // Determine the height of each row
        var rowHeight = getMaxHeight(row),
            currentLine;

        // Get the lines of each cell once, so we don't have to keep splitting
        // over and over in the loop after this one.
        var cellLines = [];
        for (var col = 0; col < row.length; ++col) {
          cellLines.push(String(row[col]).split('\n'));
        }

        // Print the row one line at a time (this requires revisiting each cell N times for N lines)
        for (var line = 0; line < rowHeight; ++line) {
          currentLine = [];

          for (var j = 0; j < row.length; ++j) {
            (function(cell, width, type, format) {
              var lines = cellLines[j];
              currentLine.push(formatCell(lines[line] || '', width, type, format));
            }(row[j], columnWidths[j], columnTypes[j], i > 0 && cellFormats[j]));
          }

          formattedLines.push(outerBorder + ' ' + currentLine.join(' ' + innerBorder + ' ') + ' ' + outerBorder);
        }

        if (rowSeparator && i > 0 && i < rows.length - 1) {
          formattedLines.push(createRowSeparator(totalWidth, rowSeparator));
        }

        // Add the header separator right after adding the header
        if (i === 0) {
          formattedLines.push(createRowSeparator(totalWidth, headerSeparator));
        }
      }(rows[i], formats[i - 1]));
    }

    return formattedLines.join('\n');
  }

  function appendRowAndFormat(data, headers, formatters, typeFormatters, rows, formats) {
    var row         = [],
        cellFormats = [];

    for (var i = 0; i < headers.length; ++i) {
      (function(header, columnIndex) {
        var value = data[header];

        var formatter = formatters[header] ||
          typeFormatters[typeof value] ||
          identity;

        var formatted = formatter(value, header);
        if (formatted && typeof formatted === 'object') {
          value = formatted.value;
          if (formatted.format && formatted.format.color) {
            value = value[formatted.format.color];
          }
          cellFormats.push(formatted.format);

        } else {
          value = formatted;
          cellFormats.push(null);
        }

        row.push(value);

      }(headers[i], i));
    }

    rows.push(row);
    formats.push(cellFormats);
  }

  function createHeaderRow(headers, capitalizeHeaders, noName) {
    var row = Array.prototype.slice.call(headers, 0);
    if (capitalizeHeaders) {
      for (var i = 0; i < row.length; ++i) {
        row[i] = capitalize(row[i]);
      }
    }
    if(noName){
        for (var i = 0; i < row.length; ++i) {
            row[i] = ' ';
          }
    }
    return row;
  }

  function createRowSeparator(totalWidth, separator) {
    return repeatToLength(separator, totalWidth);
  }

  function getMaxWidth(rows, columnIndex) {
    var maxWidth = 0,
        lines;
    for (var i = 0; i < rows.length; ++i) {
      lines = String(rows[i][columnIndex]).split('\n');
      for (var j = 0; j < lines.length; ++j) {
        maxWidth = Math.max(maxWidth, strLength(lines[j]));
      }
    }
    return maxWidth;
  }

  function getMaxHeight(row) {
    var maxHeight = 1;
    for (var i = 0; i < row.length; ++i) {
      maxHeight = Math.max(maxHeight, lineCount(String(row[i])));
    }
    return maxHeight;
  }

  function getColumnType(rows, columnIndex) {
    return rows[1] && typeof rows[1][columnIndex];
  }

  function capitalize(value) {
    if (!value) {
      return value;
    }

    return value.charAt(0).toUpperCase() + value.substring(1);
  }

  function formatCell(value, width, type, format) {
    var padding = width - strLength(value);

    var alignment = (format && format.alignment) ||
      (type === 'number' ? 'right' : 'left');

    switch (alignment) {
      case 'right':
        return padRight(value, padding);

      case 'left':
      default:
        return padLeft(value, padding);
    }
  }

  function strLength(value) {
    return String(value).replace(/\u001b\[\d{1,2}m?/g, '').length;
  }

  /**
   * @examples
   * countOccurrences('foo', 'f') => 1
   * countOccurrences('foo', 'o') => 2
   * countOccurrences('bar', 'z') => 0
   */
  function countOccurrences(str, char) {
    var count = 0,
        index = str.indexOf(char);

    while (index !== -1) {
      ++count;
      index = str.indexOf(char, index + char.length);
    }

    return count;
  }

  function lineCount(str) {
    return countOccurrences(str, '\n') + 1;
  }

  /**
   * @examples
   * padLeft('foo', 2) => 'foo  '
   * padLeft('foo', 0) => 'foo'
   */
  function padLeft(value, padding) {
    return value + repeat(' ', padding);
  }

  /**
   * @examples
   * padRight('foo', 2) => '  foo'
   * padRight('foo', 0) => 'foo'
   */
  function padRight(value, padding) {
    return repeat(' ', padding) + value;
  }

  /**
   * @examples
   * repeat('a', 3)   => 'aaa'
   * repeat('abc', 3) => 'abcabcabc'
   * repeat('a', 0)   => ''
   */
  function repeat(value, count) {
    return new Array(count + 1).join(value);
  }

  /**
   * @examples
   * repeatToLength('a', 3)   => 'aaa'
   * repeatToLength('foo', 7) => 'foofoof'
   */
  function repeatToLength(value, length) {
    if (length < value.length) {
      return value.substring(0, length);
    }

    var str = value;
    while ((str.length * 2) < length) {
      str += str;
    }

    str += str.substring(0, length - str.length);

    return str;
  }

  function identity(value) {
    return value;
  }

