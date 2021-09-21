//displays and clears the console
console.show();
console.clear();

//request the file to be analyzed
var filePath = model.getPath();

//console layout
console.log("");

//selection of the view elements
var view = selection.filter("archimate-diagram-model").first();
//children of the view: "parent" elements of the view
var ajoutDossier = $(view).children();
//creation of a table containing the children and parents of the view
var ajoutDossierTotal = [];

//initialization of the steps of the future loops
var pas0 = 0;
var pas1 = 0;
var pas2 = 0;
var pas3 = 0;

//adding parents to the global table
for(pas0=0;pas0<ajoutDossier.length;pas0++){
    ajoutDossierTotal.push(ajoutDossier[pas0]);
}

//array containing all the children
var ajoutDossier2=ajoutDossier.children()

//initialization of pas0
pas0=0;

//test on 10 floors if there are children, grandchildren, etc...
while(pas0!=10){
    if(ajoutDossier2.length!=0){
        for(pas1=0;pas1<ajoutDossier2.length;pas1++){
            //if there are any, then they are added to the total table of children
            ajoutDossierTotal.push(ajoutDossier2[pas1]);
        }
        ajoutDossier=ajoutDossier2.children();
        ajoutDossier2=ajoutDossier;
    }
    else{
        pas0=9;
    }
    pas0++;
}

//array containing the names of the initial Archimate folders
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

    //variable containing all the folders already occupied
    var listeFoldersOccupee=[];

    //processing all my concepts
    while(pas0<concepts.length){
        //if the concept is in my view, then we treat it
        for(pas6=0;pas6<ajoutDossierTotal.length;pas6++){
            if (concepts[pas0].name==ajoutDossierTotal[pas6].name && concepts[pas0].type==ajoutDossierTotal[pas6].type){
                
                //initialization of the indicator and the pas2
                var indicateur=0;
                pas2=0;

                //test if there is already a folder with the type of the element
                while(pas2<folders.length){
                    //if this is the case, then I add my element in it
                    if(folders[pas2].name==concepts[pas0].type){
                        folders[pas2].add(concepts[pas0]);
                        listeFoldersOccupee.push(folders[pas2].name);
                        indicateur=1;
                        pas2=folders.length;
                    }
                    pas2++;
                }

                //if there is not already a folder, then we try to create it and place it correctly
                if (indicateur==0){
                    for(pas2=0;pas2<listeFolder.length;pas2++){
                        for(pas3=0;pas3<listePreType[pas2].length;pas3++){
                            if(listePreType[pas2][pas3]==concepts[pas0].type){
                                pas4=0;
                                while(pas4<folders.length){
                                    if (folders[pas4].name==listeFolder[pas2]){
                                        //file creation
                                        var newFolder = folders[pas4].createFolder(listePreType[pas2][pas3]);
                                        //change the value of the folder collection, with our new folder
                                        var folders = $("folder");
                                        //initialization of pas5
                                        var pas5=0;
                                        //add the elements in the right folder
                                        while(pas5<folders.length){
                                            if (folders[pas5].name==newFolder.name){
                                                folders[pas5].add(concepts[pas0]);
                                                pas5=folders.length;
                                            }
                                            pas5++;
                                        }
                                        listeFoldersOccupee.push(newFolder.name);
                                        pas4=folders.length;
                                    }
                                    pas4++;
                                }
                            }
                        }
                    }
                }
            }
        }
        pas0++;
    }

    //affichage de fin de traitement
    console.log("End of treatment !");
}