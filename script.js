
//We will structure everything in modules
//So encapsulate data accordingly for privacy reasons
//We will have 3 modules initially 
//1) UI MODULE
        // Get Input Values
        // Add new items to the UI 
        // Update the UI
//2) INTERNAL DATA HANDLING 
        //Add the new Items into our data structure
        // Calculate the budget 
//3) CONTROLLER MODULE (link)
        // Add Event Handler

//FIRST MODULE:CONTROLLER**********************************************************
var budgetControl = (function() {/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////
})();/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//SECOND MODULE: UICONTROL************************************************************
////////////////////////////////////////////////////////////////////////////
var uiControl = (function() {//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var everythingDOM = {
    type: '.add__type',
    description: '.add__description',
    value: '.add__description',
    inputBtn: '.add__btn'
};


//Public function used by central controller to read user input 
    return {
        getInput: function() {
            return {
                inputType: document.querySelector(everythingDOM.type).value, // + for inc and - for exp
                inputDescription: document.querySelector(everythingDOM.description).value, // text descriptor
                inputValue: document.querySelector(everythingDOM.value).value //numerical value
            };
        },
        getDOMvalues: function() {
            return everythingDOM;
        }
    
};

/////////////////////////////////////////////////////////////////////////////
})();////////////////////////////////////////////////////////////////////////////
//THIRD MODULE: CENTRAL CONTROL ********************************************************
var centralControl = (function (uiCtrl,bgtCtrl){//////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    var infoFromDOM = uiCtrl.getDOMvalues();

     var centralAddItem = function() {
        //1) Read Input Data from the fields
        var completeInput = uiCtrl.getInput();
        console.log(completeInput);
        //2) Add Input Item to budgetControl module 


        //3) Add Item to the UI control module 


        //4)Calculate the Resulting Budget 


        //5)Display this budget on the UI
        

  }
    
    //Selecting the input button and the enter key for entering user data and calculating it
 
    document.querySelector(infoFromDOM.inputBtn).addEventListener('click',centralAddItem ); //Add items on click
    document.addEventListener('keypress', function(event){//Add items on 'enter'
        if(event.keyCode === 13){
            centralAddItem();
        }
    });

 ///////////////////////////////////////////////////////////////////////////////////////
})(uiControl,budgetControl);/////////////////////////////
////////////////////////////////////////////////////////////////////////////////