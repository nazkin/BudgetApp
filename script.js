

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
                inc: 0,
                exp: 0
            }
        };

        return {
        //Allowing other modules to add a value to our     
            addItem: function(type, desc, val){
                var newAddition, ID;
        //Creating an ID for a newly added item
                if(data.allEntries[type].length > 0) {
                    ID = data.allEntries[type][data.allEntries[type].length -1].id + 1;
                }
                else {
                    ID = 0;
                }
        //Depending on the type we create either an expense or income object
                if(type === "exp"){
                    newAddition = new Expenses(ID, desc, val);
                }
                else if(type === "inc") {
                    newAddition = new Income(ID, desc, val);
                }
        //Now we need to add the created object to a needed array based off of its type
               data.allEntries[type].push(newAddition);
        //Return the newly created object to the global scope       
               return newAddition;
            },

            test: function() {
                console.log(data);
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
    value: '.add__value',
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
         var completeInput, newItem;
        //1) Read Input Data from the fields
        completeInput = uiCtrl.getInput();
        
        //2) Add Input Item to budgetControl module 
        newItem = bgtCtrl.addItem(completeInput.inputType, completeInput.inputDescription, completeInput.inputValue);

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

