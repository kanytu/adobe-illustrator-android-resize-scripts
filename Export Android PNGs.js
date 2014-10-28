var folder = Folder.selectDialog();
var d = app.activeDocument;
var baseW = d.width;
var baseH = d.height;

startRoutine();


function startRoutine(){	
baseW = prompt("mhdpi width (baseline)", baseW);
if (!baseW || isNaN(baseW)) return;
baseH = prompt("mhdpi height (baseline)", baseH);
if (!baseH || isNaN(baseH)) return;


//----------------------------------
saveDocumentAsPng(baseW*3, baseH*3, "xxhdpi");
saveDocumentAsPng(baseW*2, baseH*2, "xhdpi");
saveDocumentAsPng(baseW*1.5, baseH*1.5, "hdpi");
saveDocumentAsPng(baseW, baseH, "mhdpi");
//saveDocumentAsPng(baseW*0.75, baseH*0.75, "lhdpi"); deprecated
//----------------------------------
alert("Done!");
}

//
function saveDocumentAsPng(width, height, density){
    var fileName =  d.name.toLowerCase().replace(".ai","").replace(" ","_");
    var myFolder = new Folder(folder.absoluteURI + "/drawable-" + density);
    if(!myFolder.exists) myFolder.create();

    var file = new File(myFolder.fsName + "/" + fileName + ".png");

    var exportOptions = new ExportOptionsPNG24();
    exportOptions.antiAliasing = true;
	exportOptions.transparency = true;
    exportOptions.artBoardClipping = true;
    exportOptions.horizontalScale = 100 * (width / d.width);
    exportOptions.verticalScale = 100 * (height / d.height);

    d.exportFile(file, ExportType.PNG24, exportOptions);
}
