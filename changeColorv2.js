//displays and clears the console
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
 
////definitions of the parameters of the window
var WEST = Packages.javax.swing.SpringLayout.WEST;
var NORTH = Packages.javax.swing.SpringLayout.NORTH;
var EAST = Packages.javax.swing.SpringLayout.EAST;
var SOUTH = Packages.javax.swing.SpringLayout.SOUTH;
var VCENTER = Packages.javax.swing.SpringLayout.VERTICAL_CENTER;

//allows to check if the ok button is pressed
var G_okPressed = false;
try {
    //name of the percentage request window
    var frame = new Packages.javax.swing.JFrame("changeColorv2");

    //window properties (size, dimension)
    frame.setSize(600, 100);
    frame.setResizable(false);
    frame.setLocation(300, 200);
        

    var contentPane = frame.getContentPane();
    var layout = new Packages.javax.swing.SpringLayout();
    contentPane.setLayout(layout);
   
    var defaultDepth;
    var isModelSelected = false;	
    
    //text question and its positioning
    var followRelationshipsLabel = new Packages.javax.swing.JLabel("How much do you want to reduce the element ? (in percent) ");
    contentPane.add(followRelationshipsLabel);
    layout.putConstraint(WEST, followRelationshipsLabel, 10, WEST, contentPane);
    layout.putConstraint(NORTH, followRelationshipsLabel, 15, NORTH, contentPane);
    followRelationshipsLabel.setEnabled(!isModelSelected);
    
    //percentage display axes and it placement 
    if ( (defaultDepth === undefined) || (defaultDepth === null) || (defaultDepth === "") )
        defaultDepth = 0;
    else
        defaultDepth = parseInt(defaultDepth)|0;

    //use of JSpinner
    var followRelationshipsSpinner = new Packages.javax.swing.JSpinner(new Packages.javax.swing.SpinnerNumberModel(50, 0, 100, 5));
    contentPane.add(followRelationshipsSpinner);
    layout.putConstraint(WEST, followRelationshipsSpinner, 15, EAST, followRelationshipsLabel);
    layout.putConstraint(EAST, followRelationshipsSpinner, 60, EAST, followRelationshipsLabel);
    layout.putConstraint(VCENTER, followRelationshipsSpinner, 0, VCENTER, followRelationshipsLabel);
    followRelationshipsSpinner.setEnabled(!isModelSelected);
    
    //display of the text "%" after the number
    var levelsLabel = new Packages.javax.swing.JLabel("%");
    contentPane.add(levelsLabel);
    layout.putConstraint(WEST, levelsLabel, 10, EAST, followRelationshipsSpinner);
    layout.putConstraint(VCENTER, levelsLabel, 0, VCENTER, followRelationshipsSpinner);
    levelsLabel.setEnabled(!isModelSelected);
    
    //ok button and it positioning
    var okButton = new Packages.javax.swing.JButton("Ok");
    okButton.setBounds(250,200,100,50);
    okButton.addActionListener(new Packages.java.awt.event.ActionListener(function(e) {
        G_okPressed = true;
        frame.setVisible(false)
    }));
    contentPane.add(okButton);
    
    //cancel button and it positioning
    var cancelButton = new Packages.javax.swing.JButton("Cancel");
    cancelButton.setBounds(250,100,100,50);
    cancelButton.addActionListener(new Packages.java.awt.event.ActionListener(function(e) {
        G_okPressed = false;
        frame.setVisible(false)
    }));
    contentPane.add(cancelButton);

    layout.putConstraint(EAST, cancelButton, -5, EAST, contentPane);
    layout.putConstraint(SOUTH, cancelButton, -5, SOUTH, contentPane);
       
    layout.putConstraint(EAST, okButton, -5, WEST, cancelButton);
    layout.putConstraint(SOUTH, okButton, -5, SOUTH, contentPane);
   
    frame.setVisible(true);
      
    var Thread = Java.type("java.lang.Thread");
    Thread.sleep(100);
        
    while ( frame.isVisible() )
        Thread.sleep(100);
} 
catch(e) {
    console.error(e);
    if ( e.stack !== undefined )
        console.error(e.stack);
    }
    
//test if the user presses ok
if ( G_okPressed ) {
    //gets the selected value
    var pourcentage = followRelationshipsSpinner.getValue();
    
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
                selection.attr("fillColor", changeCouleur([couleurs[pas0],pourcentage]));
            }
        }
    }
    //end of program execution display
    console.log("Modification completed");
} 
//if the user presses CANCEL, then this is displayed
else {
    console.log("Nothing happened");
}