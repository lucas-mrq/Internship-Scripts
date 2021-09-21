//displays and clears the console
console.show();
console.clear();

//creation of a collection in which I will arrange my elements, 
//the loop step and an array containing the future elements to be deleted
var conceptCache = { };
var deleteElements=[];
var pas0=0;
var pas1=0;

//definition of window parameters
var WEST = Packages.javax.swing.SpringLayout.WEST;
var NORTH = Packages.javax.swing.SpringLayout.NORTH;
var EAST = Packages.javax.swing.SpringLayout.EAST;
var SOUTH = Packages.javax.swing.SpringLayout.SOUTH;
var VCENTER = Packages.javax.swing.SpringLayout.VERTICAL_CENTER;

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
                    tableauDoc2.push(texte);
                    indicateur=1;
                    texte="";
                }
            }
            pas0++;
        }
        tableauDoc2.push(texte);

        //initializations of variables
        indicateur=0;
        pas0=0;

        //creates a documentation table without duplicates or empty documents
        var tableauDoc=[];
        for(pas0=0;pas0<tableauDoc2.length;pas0++){
            if (tableauDoc2[pas0]!="" || tableauDoc2[pas0][0]==" " || tableauDoc2[pas0][0]=="\\"){
                var indicateur=0;
                //if the documentation is already in the table, indicator changes
                for(pas1=0;pas1<tableauDoc.length;pas1++){
                    if (tableauDoc[pas1]==tableauDoc2[pas0]){
                        indicateur=1;
                    }
                }
                //add the document only if it is not already in the array.
                if(indicateur==0){
                    tableauDoc.push(tableauDoc2[pas0]);
                }
            }
        }

        //extraction of all properties of the element
        var propriete = duplicates[0].prop();

        //processing of properties and documentation of the element if any
        if(propriete.length>0 || tableauDoc.length>1){

            //allows to check if the ok button is pressedé
            var G_okPressed = false;		
            try {
                //window name 
                var frame = new Packages.javax.swing.JFrame("deleteAllDuplicatesv2");
                
                //search for the best window dimensions
                var mesure1=propriete.length;
                var mesure2=tableauDoc.length;
                if(mesure1>mesure2){
                    var maximum = mesure1;
                }
                else{
                    var maximum = mesure2;
                }

                //the size of the window depends on the number of documents and properties
                if(tableauDoc.length>1){
                    frame.setSize(1200, 150+20*maximum);
                }
                else{
                    frame.setSize(600, 150+20*maximum);

                }
                //window properties (size, dimension)
                frame.setResizable(false);
                frame.setLocationRelativeTo(null);
                
                var contentPane = frame.getContentPane();
                var layout = new Packages.javax.swing.SpringLayout();
                contentPane.setLayout(layout);
            
                var defaultNestedRelationships;
                var isModelSelected = false;			
            
                //duplicate display (name and type)
                var followRelationshipsLabel = new Packages.javax.swing.JLabel("\""+duplicates[0].name+"\""+" of type "+"\""+duplicates[0].type+"\"");
                contentPane.add(followRelationshipsLabel);
                layout.putConstraint(WEST, followRelationshipsLabel, 10, WEST, contentPane);
                layout.putConstraint(NORTH, followRelationshipsLabel, 15, NORTH, contentPane);
                followRelationshipsLabel.setEnabled(!isModelSelected);
            
                //if there are properties, then we display a first JLabel text with a choice proposal
                if (propriete.length>0){
                    var nestedRelationshipsLabel = new Packages.javax.swing.JLabel("Choice of Properties:");
                    contentPane.add(nestedRelationshipsLabel);
                    layout.putConstraint(WEST, nestedRelationshipsLabel, 10, WEST, contentPane);
                    layout.putConstraint(NORTH, nestedRelationshipsLabel, 15, SOUTH, followRelationshipsLabel);
                    
                    if ( (defaultNestedRelationships === undefined) || (defaultNestedRelationships === null) || (defaultNestedRelationships === ""))
                        defaultNestedRelationships = [];
                    else
                        defaultNestedRelationships = defaultNestedRelationships.split(",");
                    
                    //array containing all property checkboxes
                    labelsProp=[0];
                    //array containing all checkboxes and their corresponding property
                    tableauCheckBox=[];
                    
                    //display of the first checkbox
                    var accessCheckBox = new Packages.javax.swing.JCheckBox(propriete[0]);
                    contentPane.add(accessCheckBox);

                    layout.putConstraint(WEST, accessCheckBox, 10, EAST, nestedRelationshipsLabel);
                    layout.putConstraint(VCENTER, accessCheckBox, 0, VCENTER, nestedRelationshipsLabel);
                    tableauCheckBox.push([propriete[0],accessCheckBox]);                    labelsProp.push(accessCheckBox);
                    accessCheckBox.setSelected(true);
                    
                    //display of others
                    for(pas1=1;pas1<propriete.length;pas1++){
                        var accessCheckBox = new Packages.javax.swing.JCheckBox(propriete[pas1]); 
                        contentPane.add(accessCheckBox);
                        layout.putConstraint(WEST, accessCheckBox, 0, WEST, labelsProp[pas1]);
                        layout.putConstraint(NORTH, accessCheckBox, 0, SOUTH, labelsProp[pas1]);
                        tableauCheckBox.push( [propriete[pas1],accessCheckBox]);
                        labelsProp.push(accessCheckBox);
                        accessCheckBox.setSelected(true);
                    }
                }

                //if there is more than one documentation, then we display a first JLabel text with a choice proposal
                if (tableauDoc.length>1){
                    buttonGroup = new Packages.javax.swing.ButtonGroup();
                    var viewPathLabel = new Packages.javax.swing.JLabel("Choice of description: ");
                    contentPane.add(viewPathLabel);
                    layout.putConstraint(WEST, viewPathLabel, 300, WEST, contentPane);
                    layout.putConstraint(NORTH, viewPathLabel, 15, SOUTH, followRelationshipsLabel);

                    //table containing all the radiobuttons of the documentations
                    docs=[0];

                    //display in the console of the documentations, because sometimes they are too long for the windows
                    console.log("----------------");
                    console.log("-Documentations-");
                    console.log("----------------");
                    console.log(tableauDoc[0]);
                    console.log("----------------");

                    //display of the first button
                    var viewDoc = new Packages.javax.swing.JRadioButton(tableauDoc[0]);
                    contentPane.add(viewDoc);
                    layout.putConstraint(WEST, viewDoc, 10, EAST, viewPathLabel);
                    layout.putConstraint(NORTH, viewDoc, -20, SOUTH, viewPathLabel);
                    docs.push(viewDoc);
                    buttonGroup.add(viewDoc);
                    viewDoc.setSelected(true);

                    //display of others
                    for(pas0=1;pas0<tableauDoc.length;pas0++){
                        //display of documentation
                        console.log(tableauDoc[pas0]);
                        console.log("----------------");
                        
                        var viewDoc = new Packages.javax.swing.JRadioButton(tableauDoc[pas0]);
                        contentPane.add(viewDoc);
                        var pas = 20*(pas0-1);
                        layout.putConstraint(WEST, viewDoc, 10, EAST, viewPathLabel);
                        layout.putConstraint(NORTH, viewDoc, pas, SOUTH, viewPathLabel);
                        docs.push(viewDoc);
                        buttonGroup.add(viewDoc);
                    }
                }
            
                //ok button and it position
                var okButton = new Packages.javax.swing.JButton("Ok");
                okButton.setBounds(250,200,100,50);
                okButton.addActionListener(new Packages.java.awt.event.ActionListener(function(e) {
                    G_okPressed = true;
                    frame.setVisible(false)
                }));
                contentPane.add(okButton);
            
                //cancel button and it position
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
                //remove unselected properties
                for(pas0=0;pas0<tableauCheckBox.length;pas0++){
                    if (!tableauCheckBox[pas0][1].isSelected()){
                        duplicates[0].removeProp(propriete[pas0]);
                    }
                }
                //modification of the documentation to keep only the selected one
                if (tableauDoc.length>1){
                    for(pas0=1;pas0<tableauDoc.length;pas0++){
                        if ( docs[1].isSelected() )
                            duplicates[0].documentation=tableauDoc[0];
                        else if ( docs[pas0+1].isSelected() )
                            duplicates[0].documentation=tableauDoc[pas0];
                    }
                }
            } else {
                //if the user has refused the treatment, then we keep the values given by the merge
                console.log("All the properties are kept, the documentation is a mix of all the documentations");
            }
        }
        console.log("");
    }
  });
});

//requests for the deletion of unused duplicates
if (window.confirm("Do you want to delete unused duplicate elements ?")){
    for(pas0=0;pas0<deleteElements.length;pas0++){
        deleteElements[pas0].delete();
    }
}