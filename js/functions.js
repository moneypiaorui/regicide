// 出牌事件
play = () => {
    if (attack(handPile.cardList.filter(card => card.selected == 1))) {
        if (BossInfo.life > 0) {
            //boss没死，进入支付阶段
            playButton.classList.add("hide");
            skipButton.classList.add("hide");
            payButton.classList.remove("hide");
        } else {
            selectBoss();
        }
    } else {
        alert("不允许");
        handPile.cardList.forEach(card => {
            if (card.selected) card.select();
        });
    }
    refresh();
}

// 支付伤害事件
pay = () => {
    let selectPile = handPile.cardList.filter(card => card.selected == 1)
    let sum = (selectPile.reduce((accumulator, card) => accumulator + card.attack, 0))
    alert(sum);
    if (sum < BossInfo.attack) {
        alert("Not enough to defend the attack");
    } else {
        handPile.cardList = handPile.cardList.filter(card => card.selected == 0)
        wastePile.push(selectPile);
        playButton.classList.remove("hide");
        skipButton.classList.remove("hide");
        payButton.classList.add("hide");
    }
    refresh();
}

skip = () => {
    alert("GAMEOVER");
}

function refresh() {
    wastePile.updateShow();
    handPile.updateShow();
    drawPile.updateShow();
    Boss.updateShow();
    bossPile.updateShow();
    BossInfo.updateShow();
}

function selectBoss() {
    if (bossPile.cardList.length != 0) {
        Boss = new CardPile([], "boss-showArea", 1, 1)
        Boss.push([bossPile.cardList.pop()]);
        BossInfo = new Anermy(Boss.cardList[0].value, Boss.cardList[0].suit);
        Boss.cardList[0].attack = BossInfo.attack;
        BossInfo.updateShow();
    }else{
        alert("You win!")
    }
}


//效果结算阶段
function effect(type, value) {
    // alert(type + " " + BossInfo.type);
    if (type == 1 && BossInfo.type != 1) {
        reduceAttack(value);
    } else if (type == 2 && BossInfo.type != 2) {
        waste2draw(value);
    } else if (type == 3 && BossInfo.type != 3) {
        doubleAttack(value);
    } else if (type == 4 && BossInfo.type != 4) {
        drawCard(value);
    }
}

//伤害结算阶段,返回值1表示boss已死，0表示boss未死
function hurt(value) {
    BossInfo.life -= value;
    if (BossInfo.life <= 0) {
        if (BossInfo.life == 0) {
            drawPile.push(Boss.cardList);
        }
        Boss.cardList.pop();
        return 1;
    }

    return 0;
}
// 黑桃效果，增加防御
function reduceAttack(value) {
    BossInfo.attack -= value;
}

// 方片效果，摸牌
function drawCard(value) {
    drawNum = Math.min(value, cardsLimit - handPile.cardList.length, drawPile.cardList.length);
    handPile.push(drawPile.cardList.splice(drawPile.cardList.length-drawNum , drawNum));
    console.log(handPile.cardList);
}

function doubleAttack(value) {
    BossInfo.life -= value;
}

//红桃效果，从废牌堆回牌到摸牌堆
function waste2draw(value) {
    returnNum = Math.min(value, wastePile.cardList.length);
    wastePile.shuffle();
    drawPile.unshift(wastePile.cardList.splice(0, returnNum));
}

// 出牌攻击指令
function attack(attackPile) {
    if (attackPile.length == 1) {
        handPile.cardList = handPile.cardList.filter(card => card.selected == 0);//移出手牌
        effect(attackPile[0].suit, attackPile[0].attack);//效果结算
        hurt(attackPile[0].attack);//伤害结算
        wastePile.push(attackPile);//攻击牌堆移入弃牌堆
        return 1;
    } else if (0) {

        return 1;
    }
    return 0;
}