//display and clear of the console
console.show();
console.clear();

//initialization of the loop steps
var pas0=0;
var pas1=0;
var pas2=0;

//recovery of all model's elements
var relations = $("relation");

//initialization of selected relations array, unused elements of the view, used elements and not in the array of elements that are children
var relationsselected=[];
var tableauSupp=[];
var tableauTotalElem=[];
var pasDelete=[];

//search for children and grandchildren in the tree of elements to retrieve their exact coordinates
//the objective is to make an array with the parents of the style (by removing the steps):
//[[parent1, [enfant1, [enfant2, [petit-enfant1, petit-enfant2]]], parent2]
for(pas0=0;pas0<selection.length;pas0++){
    //copy of the selection
    var selection2=selection.clone();
    //then we try to isolate a single element to check if it has children
    for(pas1=0;pas1<pas0;pas1++){
        delete selection2[0];
    }
    for(pas1=1;pas1<selection.length-pas0;pas1++){
        delete selection2[1];
    }
    //child recovery
    selection3=selection2.children();
    //if it has children, we get the information of the children and repeat the operation to check if the child has children
    //I didn't have the time to make a recursive program, this is a very rough method
    if (selection3.length!=0){
        for(pas1=0;pas1<selection3.length;pas1++){
            tableauSupp.push(selection3[pas1]);
        }
        for(pas1=0;pas1<selection3.length;pas1++){
            var selection4=selection3.clone();
            for(pas2=0;pas2<pas0;pas2++){
                delete selection4[0];
            }
            for(pas2=1;pas2<selection3.length-pas1;pas2++){
                delete selection4[1];
            }
            selection5=selection4.children();
            if (selection4.length!=0){
                for(pas2=0;pas2<selection4.length;pas2++){
                    tableauSupp.push(selection4[pas2]);
                }
                selection3[pas1]=[selection3[pas1],3,selection5];
            }
        }
        tableauTotalElem.push([1,selection[pas0],2,selection3]);
    }
    else{
        tableauTotalElem.push([1,selection[pas0]]);
    }
}

//initialization of pas0
pas0=0;

//adding in an array the steps of the elements being children
while(pas0<tableauSupp.length){
    pas1=0;
    while(pas1<tableauTotalElem.length){
        if (tableauTotalElem[pas1][1].id==tableauSupp[pas0].id){
            pasDelete.push(pas1);
            pas1=tableauTotalElem.length;
        }
        pas1++;
    }
    pas0++;
}

//removal of children in the table
for(pas0=0;pas0<pasDelete.length;pas0++){
    delete tableauTotalElem[pasDelete[pas0]];
}

//addition in a array of the relations between two selected elements
for(pas0=0;pas0<relations.length;pas0++){
    pas1=0;
    while(pas1<selection.length){
        if (selection[pas1].concept.id==relations[pas0].source.id){
            pas1=selection.length;
            pas2=0;
            while(pas2<selection.length){
                if (selection[pas2].concept.id==relations[pas0].target.id){
                    pas2=selection.length;
                    relationsselected.push(relations[pas0]);
                }
                pas2++;
            }
        }
        pas1++;
    }
}

//definition of window parameters
var WEST = Packages.javax.swing.SpringLayout.WEST;
var NORTH = Packages.javax.swing.SpringLayout.NORTH;
var EAST = Packages.javax.swing.SpringLayout.EAST;
var SOUTH = Packages.javax.swing.SpringLayout.SOUTH;
var VCENTER = Packages.javax.swing.SpringLayout.VERTICAL_CENTER;

//allows to check if the ok button is pressed
var G_okPressed = false;	
try {
    //name of the view window
    var frame = new Packages.javax.swing.JFrame("newView");

	//window properties (size, dimension)
    frame.setSize(500, 100);
	frame.setResizable(false);
	frame.setLocation(300, 200);
        
    var contentPane = frame.getContentPane();
    var layout = new Packages.javax.swing.SpringLayout();
    contentPane.setLayout(layout);
    
    //descriptive text and it placement
    var viewNameLabel = new Packages.javax.swing.JLabel("Name of the new View");
	contentPane.add(viewNameLabel);
	layout.putConstraint(WEST, viewNameLabel, 10, WEST, contentPane);
	layout.putConstraint(NORTH, viewNameLabel, 15, NORTH, contentPane);
    
    //creation of the name entry space and it placement 
    var redBorderLine = Packages.javax.swing.BorderFactory.createLineBorder(Packages.java.awt.Color.red);
	var viewNameTextField = new Packages.javax.swing.JTextField();
	contentPane.add(viewNameTextField);
	layout.putConstraint(WEST, viewNameTextField, 15, EAST, viewNameLabel);
    layout.putConstraint(EAST, viewNameTextField, 300, EAST, viewNameLabel);
    layout.putConstraint(VCENTER, viewNameTextField, 0, VCENTER, viewNameLabel);
	viewNameTextField.addCaretListener(new Packages.javax.swing.event.CaretListener(function(e) {
		if ( viewNameTextField.getText() === "" || viewNameTextField.getText() === "/" ) {
			viewNameTextField.setBorder(redBorderLine);
			okButton.setEnabled(false);
		} else {
			viewNameTextField.setBorder(null);
			okButton.setEnabled(true);
		}
	}));
	viewNameTextField.addActionListener(new Packages.java.awt.event.ActionListener(function(e) {
		if (okButton.isEnabled()) {
			G_okPressed = true;
			frame.setVisible(false);
		}
	}));

    //ok button and it placement
    var okButton = new Packages.javax.swing.JButton("Ok");
    okButton.setBounds(250,200,100,50);
    okButton.addActionListener(new Packages.java.awt.event.ActionListener(function(e) {
        G_okPressed = true;
        frame.setVisible(false)
    }));
    contentPane.add(okButton);
    
    //cancel button and it placement.
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
    //get the entered text
    var view = model.createArchimateView(viewNameTextField.getText());

    //initialization of the variables for the new elements
    var newElement;
    var tabNewElement=[];

    //test if it is necessary to place an element
    for(pas0=0;pas0<tableauTotalElem.length;pas0++){
        var indicateur =0;
        for(pas2=0;pas2<pasDelete.length;pas2++){
            if (pasDelete[pas2]==pas0){
                indicateur=1;
            }
        }
        //if it has to be placed, then we add it with the parameters corresponding to those of the element in the source view
        if (indicateur==0){
            newElement=view.add(tableauTotalElem[pas0][1].concept, tableauTotalElem[pas0][1].bounds.x, tableauTotalElem[pas0][1].bounds.y, tableauTotalElem[pas0][1].bounds.width, tableauTotalElem[pas0][1].bounds.height);
            tabNewElement.push(newElement);
            //verification of the presence of a child
            if (tableauTotalElem[pas0].length>2){
                for(pas1=0;pas1<tableauTotalElem[pas0][3].length;pas1++){
                    if (tableauTotalElem[pas0][3][pas1].length){
                        newElement=view.add(tableauTotalElem[pas0][3][pas1][0].concept, tableauTotalElem[pas0][3][pas1][0].bounds.x+tableauTotalElem[pas0][1].bounds.x, tableauTotalElem[pas0][3][pas1][0].bounds.y+tableauTotalElem[pas0][1].bounds.y, tableauTotalElem[pas0][3][pas1][0].bounds.width, tableauTotalElem[pas0][3][pas1][0].bounds.height);
                        tabNewElement.push(newElement);
                        //verification of the presence of a grandchild
                        for(pas2=0;pas2<tableauTotalElem[pas0][3][pas1][2].length;pas2++){
                            console.log(tableauTotalElem[pas0][3][pas1][2][pas2]);
                            newElement=view.add(tableauTotalElem[pas0][3][pas1][2][pas2].concept, tableauTotalElem[pas0][3][pas1][2][pas2].bounds.x+tableauTotalElem[pas0][3][pas1][0].bounds.x+tableauTotalElem[pas0][1].bounds.x, tableauTotalElem[pas0][3][pas1][2][pas2].bounds.y+tableauTotalElem[pas0][3][pas1][0].bounds.y+tableauTotalElem[pas0][1].bounds.y, tableauTotalElem[pas0][3][pas1][2][pas2].bounds.width, tableauTotalElem[pas0][3][pas1][2][pas2].bounds.height);
                            tabNewElement.push(newElement);
                        }
                    }
                    else{
                        newElement=view.add(tableauTotalElem[pas0][3][pas1].concept, tableauTotalElem[pas0][3][pas1].bounds.x+tableauTotalElem[pas0][1].bounds.x, tableauTotalElem[pas0][3][pas1].bounds.y+tableauTotalElem[pas0][1].bounds.y, tableauTotalElem[pas0][3][pas1].bounds.width, tableauTotalElem[pas0][3][pas1].bounds.height);
                        tabNewElement.push(newElement);
                    }
                }
            }
        }
    }
    //addition of the relations which are present
    for(pas0=0;pas0<relationsselected.length;pas0++){
        var indicateur=0;
        //search for the source
        for(pas1=0;pas1<selection.length;pas1++){
            if (tabNewElement[pas1].concept.id==relationsselected[pas0].source.id){
                var source=tabNewElement[pas1];
            }
        }
        //search for the target
        for(pas1=0;pas1<selection.length;pas1++){
            if (tabNewElement[pas1].concept.id==relationsselected[pas0].target.id){
                var target=tabNewElement[pas1];

            }
        }
        //added the relationship
        view.add(relationsselected[pas0], source, target);
    }
}
//if the user cancels, then this sentence is displayed
else {
    console.log("Nothing happened");
}
