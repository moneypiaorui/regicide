class PokerCard {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.imPath = "images/" + ((this.suit - 1) * 13 + this.value) + ".jpg";
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.style.backgroundImage = "url('" + this.imPath + "')";
    this.selected = false;
    this.life=0;
    this.attack=this.value;
  }
  addClick() {
    this.element.addEventListener("click", this.select);
  }
  removeClick() {
    this.element.removeEventListener("click", this.select);
  }
  fold() {
    this.element.classList.add("folded");
  }
  removeFold() {
    this.element.classList.remove("folded");
  }
  select = () => {
    this.selected = !this.selected;
    this.element.classList.toggle("select");
  }
  show() {
    this.element.style.backgroundImage = "url('" + this.imPath + "')";
  }

  hide() {
    this.element.style.backgroundImage = "url('images/53.jpg')";
  }

}



class CardPile {
  constructor(cardList, elementId, showState, foldState) {
    this.cardList = cardList;
    this.element = document.getElementById(elementId);
    this.showState = showState;
    this.foldState = foldState;
    this.clickAllow = 0;
  }
  fold() {
    this.cardList.forEach(card => {
      card.fold();
    })
  }
  addClick(){
    this.cardList.forEach(card=>{
        card.addClick();
    })
  }
  removeClick(){
    this.cardList.forEach(card=>{
        card.removeClick();
    })
  }
  shuffle() {
    // Knuth洗牌算法
    for (let i = this.cardList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardList[i], this.cardList[j]] = [this.cardList[j], this.cardList[i]];
    }
  }
  push(array) {
    array.forEach(card => {
      card.element.classList="card";
      if (this.foldState) {
        card.fold();
      } else {
        card.removeFold();
      }
      if(this.clickAllow){
        console.log("add");
          card.addClick();
      }else{
        card.removeClick();
      }
      if(this.showState){
        card.show();
      }else{
        card.hide();
      }
      this.cardList.push(card);
    })
  }
  unshift(array) {
    array.forEach(card => {
      // card.element.classList="card";
      if (this.foldState) {
        card.fold();
      } else {
        card.removeFold();
      }
      if(this.clickAllow){
        console.log("add");
          card.addClick();
      }else{
        card.removeClick();
      }
      if(this.showState){
        card.show();
      }else{
        card.hide();
      }
      this.cardList.unshift(card);
    })
  }
  updateShow() {
    this.element.innerHTML = "";
    this.cardList.forEach(card => {
      this.element.appendChild(card.element);
    })
  }
  hideAll() {
    this.carlist.forEach(card => {
      card.hide();
    });
  }
  showAll() {
    this.carlist.forEach(card => {
      card.show();
    });
  }
}



class Anermy {
  constructor(value,type) {
    this.type = type;
    if(value==11){
      this.attack=10;
    this.life=20;
    }else if(value==12){
      this.attack=15;
      this.life=30;
    }else{
      this.attack=20;
      this.life=40;
    }
    this.lifeEle=document.getElementById("life");
    this.attackEle=document.getElementById("attack");
  }
  updateShow(){
    this.lifeEle.innerText="LIFE:"+this.life;
    this.attackEle.innerText="ATK:"+this.attack;
  }
}                                                                                       