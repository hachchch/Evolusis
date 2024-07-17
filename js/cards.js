const cardList = [];
const cardOwn = [];
class cards{
  name;
  power;
  cost;
  production;
  field;
  uniqueEffect;
  message;
  message2;
  message3;
  requires;
  obsolete;
  chance;
  setName(name) {
    this.name = name;
  }
  setPower(power) {
    this.power = power;
  }
  setCost(cost) {
    this.cost = cost;
  }
  setProduction(production) {
    this.production = production;
  }
  setField(field) {
    this.field = field;
  }
  setUniqueEffect(uniqueEffect) {
    this.uniqueEffect = uniqueEffect;
  }
  setMessage(message) {
    this.message = message;
  }
  setMessage2(message2) {
    this.message2 = message2;
  }
  setMessage3(message3) {
    this.message3 = message3;
  }
  setRequires(requires) {
    this.requires = requires;
  }
  setObsolete(obsolete){
    this.obsolete = obsolete;
  }
  setChance(chance){
    this.chance = chance;
  }
  cardAdd() {
      if(!this.uniqueEffect){
          this.uniqueEffect="null";
          }
    cardList.push({
        name:this.name,
        power:this.power,
        field:this.field,
        cost:this.cost,
        production:this.production,
        uniqueEffect:this.uniqueEffect,
        message:this.message,
        message2:this.message2,
        message3:this.message3,
        requires:this.requires,
        obsolete:this.obsolete,
        chance:this.chance
    });
  }
}
/*カードを引く*/
function drawCardTrigger(playerNum){
    if(parseInt(gold.innerHTML)>=1){
    gold.innerHTML--;
    drawCard(playerNum);
    }
}
function drawCard(playerNum){
    //条件の間引き直し続ける。
    let i = (cardList.length-1)-Math.round(Math.random()*(cardList.length-1));
    while(cardList[i].requires>player[playerNum].technology || cardList[i].obsolete<player[playerNum].technology){
    i = (cardList.length-1)-Math.round(Math.random()*(cardList.length-1));
    }
    if(playerNum==0){
    var yPosition=500;
    }else if(playerNum==1){
    var yPosition=500;
    }
    if(Math.random()*100>100-cardList[i].chance){
    cardOwn.push({
        seed:Math.round(Math.random()*999999999),
        owner:playerNum,
        name:cardList[i].name,
        power:cardList[i].power,
        field:cardList[i].field,
        cost:cardList[i].cost,
        production:cardList[i].production,
        uniqueEffect:cardList[i].uniqueEffect,
        message:cardList[i].message,
        message2:cardList[i].message2,
        message3:cardList[i].message3,
        requires:cardList[i].requires,
        obsolete:cardList[i].obsolete,
        x:80,
        y:yPosition
    });
    }else{
    drawCard(playerNum);
    }
    // 確認用
    return cardList[i].name;
}
/*デッキ*/
/*テンプレート
const temperate = new cards();
temperate.setName("テキスト");
temperate.setPower(0);
temperate.setCost(0);
temperate.setProduction(0);
temperate.setMessage("");
temperate.setMessage2("");
temperate.setMessage3("");
temperate.setUniqueEffect("");
temperate.setRequires(0);
temperate.setObsolete(20);
temperate.setChance(100);
temperate.cardAdd();
*/
const palace = new cards();
palace.setName("都市");
palace.setPower(200);
palace.setCost(0);
palace.setProduction(3);
palace.setMessage("これがなくなる");
palace.setMessage2("と敗北。攻撃には");
palace.setMessage3("加算されない");
palace.setUniqueEffect("cannotAttack");
palace.setRequires(0);
palace.setObsolete(20);
palace.setChance(-1);
palace.cardAdd();
const evolve = new cards();
evolve.setName("文明");
evolve.setCost(10);
evolve.setMessage("技術革新を起こす");
evolve.setMessage2("使用するたびに");
evolve.setMessage3("コストが増加");
evolve.setUniqueEffect("evolve");
evolve.setRequires(0);
evolve.setObsolete(19);
evolve.setChance(15);
evolve.cardAdd();
const warrior = new cards();
warrior.setName("戦士");
warrior.setPower(2);
warrior.setCost(1);
warrior.setMessage("解説！");
warrior.setMessage2("");
warrior.setMessage3("");
warrior.setRequires(0);
warrior.setObsolete(2);
warrior.setChance(100);
warrior.cardAdd();
const bowman = new cards();
bowman.setName("弓兵");
bowman.setPower(1);
bowman.setCost(1);
bowman.setUniqueEffect("canAttackFromRow2");
bowman.setMessage("解説！");
bowman.setMessage2("");
bowman.setMessage3("");
bowman.setRequires(1);
bowman.setObsolete(4);
bowman.setChance(80);
bowman.cardAdd();
const farm = new cards();
farm.setName("農場");
farm.setPower(3);
farm.setCost(4);
farm.setProduction(1);
farm.setMessage("攻撃には");
farm.setMessage2("加算され");
farm.setMessage3("ない");
farm.setUniqueEffect("cannotAttack");
farm.setRequires(1);
farm.setObsolete(10);
farm.setChance(100);
farm.cardAdd();
const fence = new cards();
fence.setName("防柵");
fence.setPower(5);
fence.setCost(2);
fence.setMessage("攻撃には");
fence.setMessage2("加算され");
fence.setMessage3("ない");
fence.setUniqueEffect("cannotAttack");
fence.setRequires(1);
fence.setObsolete(4);
fence.setChance(50);
fence.cardAdd();
const spearman = new cards();
spearman.setName("槍兵");
spearman.setPower(3);
spearman.setCost(2);
spearman.setMessage("");
spearman.setMessage2("");
spearman.setMessage3("");
spearman.setUniqueEffect("");
spearman.setRequires(2);
spearman.setObsolete(5);
spearman.setChance(100);
spearman.cardAdd();
/*最初から所持*/
cardOwn.push({
        seed:Math.round(Math.random()*999999999),
        owner:0,
        name:cardList[0].name,
        production:cardList[0].production,
        power:cardList[0].power,
        field:cardList[0].field,
        cost:cardList[0].cost,
        uniqueEffect:cardList[0].uniqueEffect,
        message:cardList[0].message,
        message2:cardList[0].message2,
        message3:cardList[0].message3,
        requires:cardList[0].requires,
        obsolete:cardList[0].obsolete,
        x:80,
        y:500
    });
cardOwn.push({
        seed:Math.round(Math.random()*999999999),
        owner:1,
        name:cardList[0].name,
        production:cardList[0].production,
        power:cardList[0].power,
        field:cardList[0].field,
        cost:cardList[0].cost,
        uniqueEffect:cardList[0].uniqueEffect,
        message:cardList[0].message,
        message2:cardList[0].message2,
        message3:cardList[0].message3,
        requires:cardList[0].requires,
        obsolete:cardList[0].obsolete,
        x:80,
        y:500
    });
