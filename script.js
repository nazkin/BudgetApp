//Next step: Use event bubbling to set up the delete events in each DOM list element  --> UI
//           Also we need to delete the items from our data structrure --> budget

//FIRST MODULE:CONTROLLER*******************************************************************************
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
        this.percent = -1;
        };

        Expenses.prototype.calcPercent = function(totalIncomeValue) {
            if(totalIncomeValue > 0) {
                this.percent = Math.round((this.value/totalIncomeValue) * 100);
            }
            else{
                this.percent = -1;
            }
        };

        Expenses.prototype.getPercent = function() {
            return this.percent;
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
            },
            budgetFinal: 0,
            percentExp: -1
        };

       var calcTotals = function(type) {
            var sum = 0;
            data.allEntries[type].forEach(function(cur) {
                sum += cur.value;
            });
            data.totals[type] = sum;
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
            removeNewItem: function(type, id) {
                var idArray, idIndex;
                 idArray = data.allEntries[type].map(function(cur) {
                    return cur.id;
               });
               idIndex = idArray.indexOf(id);

               if(idIndex !== -1) {
                   data.allEntries[type].splice(idIndex,1);
               }
            },

            calcBudget: function() {
                //calculate total Incomes and total Expenses
                calcTotals('inc');
                calcTotals('exp');

                //Deduce the budget from the totals 
                data.budgetFinal = data.totals.inc - data.totals.exp;
                //Calculate the percentage
                if(data.totals.inc > 0) {
                    data.percentExp = Math.round((data.totals.exp / data.totals.inc) * 100);
                }else {
                    data.percentExp = -1;
                }
            },
            calcListPercentages: function() {
                //Loop our expense data structure and add the percentages to each list item
                data.allEntries.exp.forEach(function(cur) {
                   return cur.calcPercent(data.totals.inc);
                });
            },
            retrievePercentages: function() {
                var allPercent = data.allEntries.exp.map(function(cur) {
                    return cur.getPercent();
                });
                return allPercent;
            },
            bgtGetter: function() {
                return {
                    budget: data.budgetFinal,
                    totalInc: data.totals.inc,
                    totalExp: data.totals.exp,
                    percent: data.percentExp
                };
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
    inputBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList:'.expenses__list',
    totalIncome: '.budget__income--value',
    totalExpenses:'.budget__expenses--value',
    totalBgt: '.budget__value',
    percentOfTotal:'.budget__expenses--percentage',
    listContainer: '.container'
};


//Public function used by central controller to read user input 
    return {
        getInput: function() {         //read all 3 inputs from the page

            return {
                inputType: document.querySelector(everythingDOM.type).value, // + for inc and - for exp
                inputDescription: document.querySelector(everythingDOM.description).value, // text descriptor
                inputValue: parseFloat(document.querySelector(everythingDOM.value).value) //numerical value
            };
        },
        addNewItem: function(obj, type) {
            var listHTML, newHTML, inputElement;
            //Create an HTML element with some random text first - income, second - expense
            if(type === 'inc') {
                inputElement = everythingDOM.incomeList;
                listHTML = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>';
            }
            else if(type === 'exp') {
                inputElement = everythingDOM.expenseList;
                listHTML = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace text with information from our data structure 
            newHTML = listHTML.replace('%id%',obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
            //Move this new element to the DOM 
            document.querySelector(inputElement).insertAdjacentHTML('beforeend', newHTML);

        },
        removeItem: function(selectorID) {
            var targetElement;
            targetElement = document.getElementById(selectorID);
            targetElement.parentNode.removeChild(targetElement);
        },
       
        clearInput: function() {
            //We Can do it through querySelectorAll() for both fields use Array.prototype.slice.call() to change list to array. Then loop through array and delete
            var fieldDesc, fieldVal;
            fieldDesc = document.querySelector(everythingDOM.description);
            fieldVal = document.querySelector(everythingDOM.value);
            fieldDesc.value = "";
            fieldVal.value = "";
            document.querySelector(everythingDOM.type).focus();
        },
        displayBgtData: function(object) {
            document.querySelector(everythingDOM.totalBgt).textContent = object.budget;
            document.querySelector(everythingDOM.totalIncome).textContent = object.totalInc;
            document.querySelector(everythingDOM.totalExpenses).textContent = object.totalExp;
            if(object.percent > 0 && object.percent <= 100) {
                document.querySelector(everythingDOM.percentOfTotal).textContent = object.percent + "%";
            } else {
                document.querySelector(everythingDOM.percentOfTotal).textContent = "_-_";
            }
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
        
        document.querySelector(infoFromDOM.listContainer).addEventListener('click', centralDeleteItem);
    };

    var calcTotalBudget = function() {
        bgtCtrl.calcBudget();
        //return out budget from out getter method 
       var userBgt =  bgtCtrl.bgtGetter();
       //update the DOM values
        uiCtrl.displayBgtData(userBgt);
    };  
    var updatePercentValues = function() {
        //Calculate percentage values
        bgtCtrl.calcListPercentages();
        //Read these values from our budget control 
        var percentVal = bgtCtrl.retrievePercentages();
        //Update the UI accordingly
        console.log(percentVal);
    };
        
     var centralDeleteItem = function(event) {
        var itemID, splitID, type, idNum;
        //traverse our node structure to isolate the div element containing our entire list content
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            //split up string 'inc-' and '#' returns array of 2 split items
            splitID = itemID.split('-'); // returns ['inc', '1']
            type = splitID[0];
            idNum = parseInt(splitID[1]);
            //1) Delete from data structure 
            bgtCtrl.removeNewItem(type,idNum);
            //2) Delete from DOM 
            uiCtrl.removeItem(itemID);
            //3) Update budget content
            calcTotalBudget();
            //4) Update percent
        }
     };

     var centralAddItem = function() {
         var completeInput, newItem;
        //1) Read Input Data from the fields
        completeInput = uiCtrl.getInput();
        
        if(completeInput.inputDescription !== "" && !isNaN(completeInput.inputValue) && completeInput.inputValue > 0) {
         //2) Add Input Item to budgetControl module 
        newItem = bgtCtrl.addItem(completeInput.inputType, completeInput.inputDescription, completeInput.inputValue);

        //3) Add Item to the UI control module 
        uiCtrl.addNewItem(newItem,completeInput.inputType);

        //4) Clear input fields after entry
        uiCtrl.clearInput();

        //5)Calculate the Resulting Budge
            calcTotalBudget();

        //6) Update percent 
        updatePercentValues();
        
        } else {

            uiCtrl.clearInput();
        }

  };
    
  return {
      init: function() {  //initialization funciton to help us start the program effectively
          allEventListeners();
          uiCtrl.displayBgtData({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percent: -1
          }); 

          
      }
  };
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})(uiControl,budgetControl);/////////////////////////////
////////////////////////////////////////////////////////////////////////////////
centralControl.init();

