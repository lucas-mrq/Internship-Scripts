console.show();
console.clear();

//power of 2 function  (2^x)
function puissance2(obj){
    if(obj==0){
        return 1;
    }
    else{
        var pas0;
        var compt=1;
        for(pas0=1;pas0<=obj;pas0++){
            compt=compt*2;
        }
        return compt;
    }
}

//hexadecimal to binary conversion function
function hexaBin(obj) {
    var hexaVal =["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    var decVal =["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
    var pas0;
    var valeurDec="";
    for(pas0=0;pas0<hexaVal.length;pas0++){
        if (obj[0]==hexaVal[pas0]){
            valeurDec=valeurDec+decVal[pas0];
        }
    }
    for(pas0=0;pas0<hexaVal.length;pas0++){
        if (obj[1]==hexaVal[pas0]){
            valeurDec=valeurDec+decVal[pas0];
        }
    }
    return valeurDec;
}

//binary decimal conversion function
function binDec(obj) {
    var compt=0;
    var pas0;
    for(pas0=0;pas0<obj.length;pas0++){
        if (obj[pas0]=="1"){
            compt=compt+puissance2(7-pas0);
        }
    }
    return compt;
}

//decimal binary conversion function
function decBin(obj){
    var decimal=obj;
    var valeur="";
    var pas0;
    for(pas0=0;pas0<8;pas0++){
        if (decimal>=puissance2(7-pas0)){
            valeur+="1";
            decimal=decimal-puissance2(7-pas0);
        }
        else{
            valeur+="0";
        }
    }
    return valeur;
}

//binary hexadecimal conversion function
function binHexa(obj) {
    var hexaVal =["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    var decVal =["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
    var pas0;
    var valeurHex="";
    var valeurDec1=obj[0]+obj[1]+obj[2]+obj[3];
    var valeurDec2=obj[4]+obj[5]+obj[6]+obj[7];
    for(pas0=0;pas0<hexaVal.length;pas0++){
        if (valeurDec1==decVal[pas0]){
            valeurHex=hexaVal[pas0];
        }
    }
    for(pas0=0;pas0<hexaVal.length;pas0++){
        if (valeurDec2==decVal[pas0]){
            valeurHex+=hexaVal[pas0];
        }
    }
    return valeurHex;
}

//function to change the color according to a percentage
function changeCouleur(obj) {
    var couleurElement=obj[0];
    var pourcentage=obj[1];
    var rougeBinaire = binDec(hexaBin(couleurElement[1]+couleurElement[2]));
    var vertBinaire = binDec(hexaBin(couleurElement[3]+couleurElement[4]));
    var bleuBinaire = binDec(hexaBin(couleurElement[5]+couleurElement[6]));
    rougeBinaire=rougeBinaire+(255-rougeBinaire)*(pourcentage/100);
    vertBinaire=vertBinaire+(255-vertBinaire)*(pourcentage/100);
    bleuBinaire=bleuBinaire+(255-bleuBinaire)*(pourcentage/100);
    var rouge=binHexa(decBin(rougeBinaire));
    var vert=binHexa(decBin(vertBinaire));
    var bleu=binHexa(decBin(bleuBinaire));
    couleurElement="#"+rouge+vert+bleu
    return couleurElement;
}

//request of the percentage of reduction of the element (50% at the beginning)
var factor = window.prompt("How much do you want to reduce the element ? (in percent) ", 50);

//if no value is entered, displays a sentence
if (!factor) {
    console.log("Nothing happened");
    exit();
}

//if you press ok
else{
    //array filled with all possible types of elements
    var listePreType=[["business-actor","business-role","business-collaboration","business-interface","business-process","business-function","business-interaction","business-event","business-service","business-object","contract","representation","product"],
                    ["application-component","application-collaboration","application-interface","application-function","application-interaction","application-process","application-event","application-service","data-object"],
                    ["node","device","system-software","technology-collaboration","technology-interface","path","communication-network","technology-function","technology-process","technology-interaction","technology-event","technology-service","artifact","equipment","facility","distribution-network","material"],
                    ["resource","capability","value-stream","course-of-action"],
                    ["stakeholder","driver","assessment","goal","outcome","principle","requirement","constraint","meaning","value"],
                    ["work-package","deliverable","implementation-event"]];
    
    //array of colors corresponding to the elements
    couleurs=["#ffffb5","#b5ffff","#cae7b7","f5deaa","ccccff","ffdfdf"];
    
    //search for the type of the element then change the color
    for(pas0=0;pas0<listePreType.length;pas0++){
        for(pas1=0;pas1<listePreType[pas0].length;pas1++){
            if(selection[0].type==listePreType[pas0][pas1]){
                //end of program execution display
                console.log("Modification completed");
                selection.attr("fillColor", changeCouleur([couleurs[pas0],factor]));
            }
        }
    }
}