//displays and clears the console
console.show();
console.clear();

//creation of a collection in which I will arrange my elements, 
//the loop step and an array containing the future elements to be deleted
var conceptCache = { };
var pas1=0;
var pas0=0;
var deleteElements=[];

//creation of two alphabets, one with all the letters and the other without the characters following the \
var alphabet=["a","z","e","y","u","i","o","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b"];
var alphabet2=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//selection of my elements arranged in my collection in the following form:
//{ type1 : {nom1 : {a}}, type2 : { nom2 : {b} , nom3 : {c, d} , }, type3 : {nom4 : {e, f}}, type4 : {nom5 : {g, h, i}}}         
$('element').each(function(c) {

  //sort by type
  if (!conceptCache[c.type]) {
    conceptCache[c.type]= { };
  }
 
  //sort by name
  if (!conceptCache[c.type][c.name]) {
    conceptCache[c.type][c.name] = $('#empty');
  }
 
  //added to the collection
  conceptCache[c.type][c.name].add($(c));
});

//search for duplicates (same type and same name) => length greater than 1
Object.keys(conceptCache).forEach(function(type) {
  Object.keys(conceptCache[type]).forEach(function(name) {
    
    //creation of the array with elements of the same type and name
    duplicates = conceptCache[type][name];
   
    //test if it is a duplicate
    if (duplicates.size() > 1) {

        //detection of the length in characters of the element type
        var longueur=duplicates[0].type.length;
        
        //verification of the type of the concept: it must be neither a relation, nor a junction
        if(duplicates[0].type[longueur-1]!="p" && duplicates[0].type[longueur-2]!="i" && duplicates[0].type!="junction"){
            
            //display of the processed duplicate
            console.log("\""+duplicates[0].name+"\" of type \""+duplicates[0].type+"\"");
            
            //merge duplicates and put them in the deletion array.
            for(pas1=1;pas1<duplicates.length;pas1++){
                duplicates[0].merge(duplicates[pas1]);
                deleteElements.push(duplicates[pas1]);
            }
        }

        //creation of an indicator, used to check some steps of the script
        var indicateur = 0;
        //creation of a text, used to separate the different documentation of the merged element
        var texte="";
        //array containing every description
        var tableauDoc=[];
        //step initialization
        pas0=0;

        //test all the characters of the documentation and separate them in sub documentations
        while(pas0<duplicates[0].documentation.length){
            if(duplicates[0].documentation[pas0]!="\n"){
                texte+=duplicates[0].documentation[pas0];
                indicateur=0;
            }
            else{
                if (indicateur==0){
                    tableauDoc.push(texte);
                    indicateur=1;
                    texte="";
                }
            }
            pas0++;
        }
        tableauDoc.push(texte);
        
        //initializations of variables
        indicateur=0;
        pas0=0;

        //display of all documentation
        while(pas0<duplicates[0].documentation.length){
            //initialization  pas1
            pas1=0;
            
            //verification of the validity of the description
            while(pas1<alphabet.length){
                if (duplicates[0].documentation[pas0]==alphabet[pas1]){
                    
                    texte="";
                    for(pas0=0;pas0<tableauDoc.length;pas0++){
                        texte+=(pas0+1)+": "+tableauDoc[pas0]+"\n";
                    }
                    indicateur=1;
                    pas0=duplicates[0].documentation.length;
                    pas1=30;
                    //display all the descriptions and select the one you want to keep
                    var factor = window.prompt("What description do you want to associate with the element? \n\n"+texte, "1");
                    
                    //selection of the first if no choice is made
                    if (!factor) {
                        duplicates[0].documentation=tableauDoc[0];
                        console.log("We keep the first description");
                    }
                    //otherwise it is the one chosen
                    else{
                        var numero=parseInt(factor);
                        duplicates[0].documentation=tableauDoc[(numero-1)];
                    }
                }
                pas1++;
            }
            pas0++;
        }
        
        //if there is no valid documentation, we enter an empty text
        if(indicateur==0){
            duplicates[0].documentation="";
        }

        //extraction of all properties of the element
        var propriete = duplicates[0].prop();
        //property selection text
        var texte2="-";
        
        //display all properties
        if(propriete.length!=0){
            texte="List of properties\r";
            
            //creation of the text to be displayed
            for(pas0=0;pas0<propriete.length;pas0++){
                texte+=alphabet2[pas0]+": "+propriete[pas0]+"\n";
                texte2+=alphabet2[pas0]+"-";
            }
            
            //window with the text of the properties
            var factor = window.prompt("Which properties do you want to keep? \r\r"+texte, texte2);
            
            //if nothing is selected, then we keep all properties
            if (!factor) {
                console.log("We keep all the properties.");
            }
            //otherwise we delete those that have not been selected
            else{
                var compteur=0;
                pas0=0;
                while(pas0<factor.length){
                    if(factor[pas0]!="-"){
                        if(factor[pas0]!=alphabet2[compteur]){
                            duplicates[0].removeProp(propriete[compteur]);
                        }
                        else{
                            pas0++;
                        }
                        compteur++;
                    }
                    else{
                        pas0++;
                    }
                }
            }
        }
        console.log(" ");
    }
  });
});

//requests the removal of unused duplicates
if (window.confirm("Do you want to delete unused duplicate elements?")){
    for(pas0=0;pas0<deleteElements.length;pas0++){
        deleteElements[pas0].delete();
    }
}
