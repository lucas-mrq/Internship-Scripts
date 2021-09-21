//display and clear of the console
console.show();
console.clear();

//editing the display of the duplicates table
function write_case1() {
    return "<tr><td style='border:1px solid black;'>" ;
}
function write_case2() {
    return "</td></tr>" ;
}

var pas0=0;

//request the file to be analyzed
var filePath = model.getPath();

var tabId=[];

if(filePath != null) {
    
    //loading all elements
    var elements = $("element");

    //creation of the sorting function
    var Collections = Java.type("java.util.Collections");

    //sort items alphabetically
    Collections.sort(elements);

    //number of elements to process
    var nbElements=elements.length;

    //initialization of loop parameters
    var pas1 = 0;
    var pas2 = 0;

    //initialization of the array containing the false duplicates
    var tableauDoublons = [];

    //look for false duplicates
    while(pas1<nbElements-1){
        var tableauDoublon=[elements[pas1].name,[]];
        //detection of a duplicate, search for all others
        while(elements[pas1].name==elements[pas1+1].name){
            //if it is the first one, we add the type in the table
            if(tableauDoublon[1].length==0){
                tableauDoublon[1].push(elements[pas1].type);
            }
            //otherwise we look if this type is not already in the table
            else{
                for(pas2=0;pas2<tableauDoublon[1].length;pas2++){
                    if(tableauDoublon[1][pas2]!=elements[pas1].type){
                        tableauDoublon[1].push(elements[pas1].type);
                    }
                }
            }
            //increment the step
            pas1++;         
            //if the step exceeds the limit, then we exit the loop
            if(pas1>nbElements-1){
                if(tableauDoublon[1].length==0){
                    tableauDoublon[1].push(elements[pas1].type);
                }
                else{
                    for(pas2=0;pas2<tableauDoublon[1].length;pas2++){
                        if(tableauDoublon[1][pas2]!=elements[pas1].type){
                            tableauDoublon[1].push(elements[pas1].type);
                        }
                    }
                }
                break;
            }
            //if the elements do not have the same name (not false duplicates), then we add the last type (if it is not there)
            if(elements[pas1].name!=elements[pas1+1].name){
                if(tableauDoublon[1].length==0){
                    tableauDoublon[1].push(elements[pas1].type);
                }
                else{
                    for(pas2=0;pas2<tableauDoublon[1].length;pas2++){
                        if(tableauDoublon[1][pas2]!=elements[pas1].type){
                            tableauDoublon[1].push(elements[pas1].type);
                        }
                    }
                }
            }
        }
        //we add the false duplicate in a larger array
        if(tableauDoublon[1].length>1){
            tableauDoublons.push(tableauDoublon);
        }
        pas1++;
    }
    //display editing
    console.log("------------------------");

    //if there is none
    if(tableauDoublons.length==0){
        console.log("There are no false duplicates.");
        console.log("------------------------"); 
    }    
    else{
        //if there is one
        if(tableauDoublons.length==1){
            console.log("There is 1 false duplicate.");
            console.log("------------------------"); 
        }
        //if there are multiple
        else{
            console.log("There are "+tableauDoublons.length+" false duplicates.");
            console.log("------------------------"); 
        }

        var pas0=0;

        //displaying false duplicates
        for(pas0=1;pas0<tableauDoublons.length+1;pas0++){
            console.log("");
            console.log("Duplicate number "+pas0+" which is called \""+tableauDoublons[pas0-1][0]+"\" of different types:");
            for(pas1=0;pas1<tableauDoublons[pas0-1][1].length;pas1++){
                
                console.log("-"+tableauDoublons[pas0-1][1][pas1]);
            }
        }
    }   
}