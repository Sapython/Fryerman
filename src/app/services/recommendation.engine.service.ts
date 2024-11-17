export class recommendor {
  constructor(){}
Vegs=[
    ['Corn n Cheese ball','150','250','productId','/assets/7.jpg','true',"2",true],
  ['Veg Nuggets','150','250','productId','/assets/13.jpg','true',"2",true],
  ['Paneer Bites','150','250','productId','/assets/8.jpg','true',"2",true],
  ['Cheese Buster','150','250','productId','/assets/14.jpg','true',"2",true],
  ['Poha Fingers','150','250','productId','/assets/9.jpg','true',"2",true],
  ['French Fries','150','250','productId','/assets/15.jpg','true',"2",true],
];

nonVegs=[
    ['Chicken Lollipop','150','250','productId','/assets/1.jpg','true',"2",true],
  ['Chicken Balls','150','250','productId','/assets/4.jpg','true',"2",true],
  ['Chicken Wings','150','250','productId','/assets/2.jpg','true',"2",true],
  ['Herby Chicken Nuggets','150','250','productId','/assets/5.jpg','true',"2",true],
  ['Spicy Chicken Nuggets','150','250','productId','/assets/3.jpg','true',"2",true],
];

beverages=[
    ['Lemon Ice Tea','150','250','productId','/assets/10.jpg','true',"2",false],
  ['Masala Cold Drink','150','250','productId','/assets/11.jpg','true',"2",false],
  ['Virgin Mojito','150','250','productId','/assets/12.jpg','true',"2",false],
  ['Cold Coffee','150','250','productId','/assets/16.jpg','true',"2",false],
  ['Pina Colada','150','250','productId','/assets/17.jpg','true',"2",false],
];

getScore(data: any) {
  var score: number = 0;
  for (let i in data) {
    if (this.beverages.includes([i])) {
      score += 1;
    } else if (this.nonVegs.includes([i])) {
      score += 10;
    } else if (this.Vegs.includes([i])) {
      score += 20;
    }
  }
  return score;
}

getRecommendations(length: any, data: any) {
  var result: any[][] = [];
  var score: number = this.getScore(data);
  var productType: string[] = [];
  if (score < 15) {
    productType = ['veg', 'non-veg'];
  } else if (score >= 15 && score < 50) {
    productType = ['veg', 'non-veg', 'beverage'];
  } else {
    productType = ['veg', 'beverage'];
  }
  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * productType.length) + 1;
    var indexType = productType[index];
    if (indexType == 'veg') {
      var indexData = this.Vegs[
        Math.floor(Math.random() * this.Vegs.length) + 1
      ];
      if (indexData !== undefined && !result.includes(indexData) && !data.includes(indexData[0])) {
        result.push(indexData);
      } else {
        i = i - 1;
        continue;
      }
    } else if (indexType == 'non-veg') {
      var indexData = this.nonVegs[
        Math.floor(Math.random() * this.nonVegs.length) + 1
      ];
      if (indexData !== undefined && !result.includes(indexData) && !data.includes(indexData[0])) {
        result.push(indexData);
      } else {
        i = i - 1;
        continue;
      }
    } else {
      var indexData = this.beverages[
        Math.floor(Math.random() * this.beverages.length) + 1
      ];
      if (indexData !== undefined && !result.includes(indexData) && !data.includes(indexData[0])) {
        result.push(indexData);
      } else {
        i = i - 1;
        continue;
      }
    }
  }
  return result;
}
}

