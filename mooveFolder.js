//displays and clears the console
console.show();
console.clear();

//request the file to be analyzed
var filePath = model.getPath();

//table containing the names of the original Archimate folders
var listeFolder=["Strategy","Business","Application","Technology & Physical","Motivation","Implementation & Migration", "Other", "Relations"];

//table containing all types of future files
var listePreType=[ ["resource","capability","value-stream","course-of-action"],
                    ["business-actor","business-role","business-collaboration","business-interface","business-process","business-function","business-interaction","business-event","business-service","business-object","contract","representation","product"],
                    ["application-component","application-collaboration","application-interface","application-function","application-interaction","application-process","application-event","application-service","data-object"],
                    ["node","device","system-software","technology-collaboration","technology-interface","path","communication-network","technology-function","technology-process","technology-interaction","technology-event","technology-service","artifact","equipment","facility","distribution-network","material"],
                    ["stakeholder","driver","assessment","goal","outcome","principle","requirement","constraint","meaning","value"],
                    ["work-package","deliverable","implementation-event","plateau","gap"],
                    ["location","grouping","junction"],
                    ["composition-relationship","aggregation-relationship","assignment-relationship","realization-relationship","serving-relationship","access-relationship","influence-relationship","triggering-relationship","flow-relationship","specialization-relationship","association-relationship"]];

//if a model is selected, then there is a treatment
if(filePath != null) {
    
    //selection of all files and concepts (elements and relations)
    var folders = $("folder");
    var concepts = $("concept");

    //initialization of loop parameters
    var pas0 = 0;
    var pas1 = 0;
    var pas2 = 0;
    var pas3 = 0;

    //processing all my concepts
    for(pas0=0;pas0<concepts.length;pas0++){
        var indicateur=0;
        pas2=0;
        //test if there is already a folder with the type of the element
        while(pas2<folders.length){
            //if this is the case, then I add my element in it
            if(folders[pas2].name==concepts[pas0].type){
                folders[pas2].add(concepts[pas0]);
                indicateur=1;
                pas2=folders.length;
            }
            pas2++;
        }

        //if there is not already a folder, then we try to create it and place it correctly
        if (indicateur==0){
            for(pas1=0;pas1<listeFolder.length;pas1++){
                for(pas2=0;pas2<listePreType[pas1].length;pas2++){
                    if(listePreType[pas1][pas2]==concepts[pas0].type){
                        pas3=0;
                        while(pas3<folders.length){
                            if (folders[pas3].name==listeFolder[pas1]){
                                //file creation
                                var newFolder = folders[pas3].createFolder(listePreType[pas1][pas2]);
                                //add the element to the folder
                                newFolder.add(concepts[pas0]);
                                //change the value of the folder collection, with our new folder
                                folders = $("folder");
                                pas3=folders.length;
                            }
                            pas3++;
                        }
                    }
                }
            }
        }
    }
    //end-of-process display
    console.log("End of treatment !");
}