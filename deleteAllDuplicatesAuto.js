//displays and clears the console
console.show();
console.clear();

//creation of a collection in which I will arrange my elements, 
//the loop step and an array containing the future elements to be deleted
var conceptCache = { };
var pas1=0;
var deleteElements=[];

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

        //extraction of the documentation of the first element and its size
        var doc=duplicates[0].documentation;
        var longueur=duplicates[0].type.length;

        //if it's not a relationship, then we treat it
        if(duplicates[0].type[longueur-1]!="p" && duplicates[0].type[longueur-2]!="i" && duplicates[0].type!="junction"){

            //display the duplicate in the console
            console.log("\""+duplicates[0].name+"\" of type \""+duplicates[0].type+"\"");
            console.log(" ");

            //merge duplicates and add to the deletion array
            for(pas1=1;pas1<duplicates.length;pas1++){
                duplicates[0].merge(duplicates[pas1]);
                deleteElements.push(duplicates[pas1]);
            }
        }
        //change of doc (we put the one of the first duplicate)
        duplicates[0].documentation=doc;
    }
  });
});

//deleting unused duplicates
for(pas0=0;pas0<deleteElements.length;pas0++){
    deleteElements[pas0].delete();
}