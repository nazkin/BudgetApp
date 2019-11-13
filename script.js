

//FIRST MODULE:CONTROLLER**********************************************************
var budgetControl = (function() {/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Goal: Create a function constructor that will be used to instantiate all the input objects
//Each input object will have 3 values--> 1) type 2) description 3) value 

    var Income = function(id,description,value) { //Constructor for income inputs
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expenses = function(id,description,value) { //Constructor for expense inputs
        this.id = id;
        this.description = description;
        this.value = value;
        };

//Our DATA STRUCTURE will include an object containing two identifiers 1)totals - (for total inc and exp) and  2)allEntries -(storing all inc and exp entries)   
        var data = {
            allEntries: {
                inc: [],
                exp: []
            },

            totals:{
                inc: [],
                exp: []
            }
        };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
})();/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//SECOND MODULE: UICONTROL************************************************************
////////////////////////////////////////////////////////////////////////////
var uiControl = (function() {//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var everythingDOM = {
    type: '.add__type',
    description: '.add__description',
    value: '.add__description',
    inputBtn: '.add__btn'
};


//Public function used by central controller to read user input 
    return {
        getInput: function() {         //read all 3 inputs from the page

            return {
                inputType: document.querySelector(everythingDOM.type).value, // + for inc and - for exp
                inputDescription: document.querySelector(everythingDOM.description).value, // text descriptor
                inputValue: document.querySelector(everythingDOM.value).value //numerical value
            };
        },
        getDOMvalues: function() {         //return all DOM values to the global scope such that they can be used everywhere needed

            return everythingDOM;
        }
    
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})();////////////////////////////////////////////////////////////////////////////
//THIRD MODULE: CENTRAL CONTROL ********************************************************
var centralControl = (function (uiCtrl,bgtCtrl){//////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    var allEventListeners = function() {

        var infoFromDOM = uiCtrl.getDOMvalues();//read dom selectors from UI controller

        document.querySelector(infoFromDOM.inputBtn).addEventListener('click',centralAddItem ); //Add items on click
        document.addEventListener('keypress', function(event){//Add items on 'enter'

            if(event.keyCode === 13){
                centralAddItem();
            }

        });
    
    };

    

     var centralAddItem = function() {
        //1) Read Input Data from the fields
        var completeInput = uiCtrl.getInput();
        
        //2) Add Input Item to budgetControl module 


        //3) Add Item to the UI control module 


        //4)Calculate the Resulting Budget 


        //5)Display this budget on the UI
        

  };
    
  return {
      init: function() {  //initialization funciton to help us start the program effectively

          console.log("Init function works");
          allEventListeners();
      }
  };
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})(uiControl,budgetControl);/////////////////////////////
////////////////////////////////////////////////////////////////////////////////
centralControl.init();

