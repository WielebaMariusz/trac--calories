//Storage controller


//---------------------------------
//     Item Controller
//---------------------------------
const ItemCtrl = (function(){
  //Item constructor
  const Item = function (id, name, proteins, fat, carbs){
    this.id = id;
    this.name = name;
    this.proteins = proteins;
    this.fat = fat;
    this.carbs = carbs;
  }

//     Data Structure / State
  const data = {
    items: [
      // {id: 0, name: 'Stek Dinner', proteins: 12, fat: 44, carbs: 4},
      // {id: 1, name: 'Eggs', proteins: 16, fat: 66, carbs: 54},
      // {id: 2, name: 'Bacon', proteins: 3, fat: 45, carbs: 5},
    ],
    currentItem: null,
    totalProteins: 0,
    totalFat: 0,
    totalCarbs: 0
  }

  // Public methods
  return {
    getItems: function(){
      return data.items;
    },
    // getTotalNutrionalValues: () => {
    //   return data;
    // }
    addItem: function(name, weight, proteins, fat, carbs){
      // ID generator
      let ID;
      if(data.items.length > 0 ){
        ID= data.items[data.items.length -1].id +1;
        console.log('nwe id',ID);        
      } else {
        ID = 0;
        console.log('id to',ID);        
      }

      // pharse string to number 
      weight = parseInt(weight); 
      proteins = parseInt(proteins);
      fat = parseInt(fat);
      carbs = parseInt(carbs);

      //create new item
      newItem = new Item(ID, name, weight, proteins, fat, carbs, checkbox);
      // add to items array
      data.items.push(newItem);
      return newItem;
    },
    logData: function(){
      return data;
    },
    getTotalAmountOfEachNutrional: function(){

      data.totalProteins = data.items.reduce((sum, element) => {
        return sum + element.proteins;
      },0);

      data.totalFat = data.items.reduce((sum, element) => {
        return sum + element.fat;
      },0);

      data.totalCarbs = data.items.reduce((sum, element) => {
        return sum + element.carbs;
      },0);
      console.log(data.totalProteins);
      console.log(data.totalFat);
      console.log(data.totalCarbs);
      return [data.totalProteins, data.totalFat, data.totalCarbs]  
    },
    setPercentProgressBar: () => {
      //harcode setting percent
      const proteinsLimit = 21;
      const fatLimit = 55;
      const carbslimit = 13;

      const percentValueOfProteins = (data.totalProteins/proteinsLimit)*100;
      const percentValueOfFat = (data.totalFat/fatLimit)*100;
      const percentValueOfCarbs = (data.totalCarbs/carbslimit)*100;
      console.log('procnet',percentValueOfProteins,percentValueOfFat,  percentValueOfCarbs);
      return [percentValueOfProteins, percentValueOfFat, percentValueOfCarbs]
      console.log(percentValue);      
    }
  }
})();

//---------------------------------
//      UI Controller
//---------------------------------
const UICtrl = (function(){
  UISelectors = {
    itemList:'#table-brekfast',
    addBtn: '.add-btn',
    itemNameInput:'#item-name',
    itemWeightInput:'#item-weight',
    itemProteinsInput:'#item-proteins',
    itemFatInput:'#item-fat',
    itemCarbsInput:'#item-carbs',
    itemCheckbox: '#dick',
    itemProteinsDailyOuput: '#item-proteins-daily',
    itemFatDailyOuput: '#item-fat-daily',
    itemCarbsDailyOuput: '#item-carbs-daily'
  }
  
  //Public methids
  return{
    populateItemsList: function(items){
      let html = '';
      items.forEach(element => {
        html += `<tr class= "${element.id}">
                  <td class="center-align"><strong>${element.name}</strong></td>
                  <td class="center-align">${element.proteins}</td>
                  <td class="center-align">${element.fat}</td>
                  <td class="center-align">${element.carbs}</td>
                  <td class="center-align"><a href="#" class="secondary-content"><i class="fa fa-pencil"></i></a></td>
                </tr>`     
      console.log('fat elemet', element.fat);
      console.log('fat name', element.name);
      console.log('fat proteins', element.proteins);
      console.log('fat carns', element.carbs);
        
      });
      
      //Insert table to html
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        weight: document.querySelector(UISelectors.itemWeightInput).value,
        proteins: document.querySelector(UISelectors.itemProteinsInput).value,
        fat: document.querySelector(UISelectors.itemFatInput).value,
        carbs: document.querySelector(UISelectors.itemCarbsInput).value,
        checkbox: document.querySelector(UISelectors.itemCheckbox).value
      };
    },
    getItemOuput: () => {

    },
    clearInput: () => {
        document.querySelector(UISelectors.itemNameInput).value ='';
        document.querySelector(UISelectors.itemWeightInput).value ='';
        document.querySelector(UISelectors.itemProteinsInput).value ='';
        document.querySelector(UISelectors.itemFatInput).value ='';
        document.querySelector(UISelectors.itemCarbsInput).value ='';    
    },
    getSelectors: () => {
      return UISelectors;
    },
    showTotalNutional: (total) => {
      console.log('total ',total);      
      document.querySelector(UISelectors.itemProteinsDailyOuput).textContent = `Proteins: ${total[0]}`;
      document.querySelector(UISelectors.itemFatDailyOuput).textContent = `Fat: ${total[1]}`;
      document.querySelector(UISelectors.itemCarbsDailyOuput).textContent = `Carb: ${total[2]}`;
    },
    showDaylyNutrionalInPrecents: (arr) => {
      document.querySelector('#daily-precent-value-proteins').style.width = `${arr[0]}%`;
      document.querySelector('#daily-precent-value-fat').style.width = `${arr[1]}%`;
      document.querySelector('#daily-precent-value-carbs').style.width = `${arr[2]}%`;
    }
  }
})();

//-----------------------------
//     App Controller 
//-----------------------------
const AppCtrl = (function(ItemCtrl, UICtrl){
  //LOAD EVENT LISTENERS
  const loadEventListeners = () => {
    //get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
  }

  //Add item submit
  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();
    console.log(input);
    e.preventDefault();
    //validate input field
    if (input.name !== '' && input.weight !== '' && input.proteins !== '' && input.fat !== '' && input.carbs !== '') {
      /// Add item
      const newItem = ItemCtrl.addItem(input.name, input.weight, input.proteins, input.fat, input.carbs, input.checkbox);
      
      

      // clear input
      UICtrl.clearInput();
      //populate table
      AppCtrl.init();
    }
 
  }
  //Public methods
  return { 
    init: () => {
      //Fetch items from data items
      const items = ItemCtrl.getItems();
      //Get total nutrional value
      const totalProteinAmoun = ItemCtrl.getTotalAmountOfEachNutrional(items);
      UICtrl.showTotalNutional(totalProteinAmoun)
      const dailyPercentValue = ItemCtrl.setPercentProgressBar();
      UICtrl.showDaylyNutrionalInPrecents(dailyPercentValue);

      //Populate list with items
      UICtrl.populateItemsList(items);

      //Load event listener
      loadEventListeners(); 
      
    }
  }
  
})(ItemCtrl, UICtrl);

AppCtrl.init();

// test

function checkbox() {
let button = document.querySelector('#dick');
if(button.value==='false') {
  button.setAttribute('value', true)
  console.log(button.value);
  
}else {
  button.setAttribute('value', false)
  console.log(button.value);
}
}
const box = document.querySelector('#dick').addEventListener('click',checkbox )
