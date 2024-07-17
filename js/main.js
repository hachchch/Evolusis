const currentPlayerIndex=document.getElementById("currentPlayerIndex");
let currentPlayer=0;
currentPlayerIndex.innerHTML=currentPlayer+1;
let selectedRow="row1";
function nextTurn(){
    gold.innerHTML=parseInt(gold.innerHTML)+parseInt(production.innerHTML);
    attackPerform();
    player[currentPlayer].gold=gold.innerHTML;
    player[currentPlayer].production=production.innerHTML;
    player[currentPlayer].technology=technologyCounter.innerHTML;
    if(currentPlayer!=1){
    currentPlayer++;
    }else{
    currentPlayer--;
    }
    gold.innerHTML=player[currentPlayer].gold;
    production.innerHTML=player[currentPlayer].production;
    technologyCounter.innerHTML=player[currentPlayer].technology;
    hpEnemyCounter.innerHTML=player[player.findIndex((element)=>element.index!=currentPlayer)].hp;
    hpYouCounter.innerHTML=player[currentPlayer].hp;
    currentPlayerIndex.innerHTML=currentPlayer+1;
    /*AIの行動*/
    if(player[currentPlayer].isAI===true){
        if(cardOwn[1].ignoreRule===false && cardOwn[1].name=="都市"){
            selectedRow="row4";
            cardUse(cardOwn[cardOwn.findIndex((element)=>element.name=="都市" && element.owner==currentPlayer && element.ignoreRule===false)].seed);
        }
        const AIplans=Math.round(Math.random()*player[currentPlayer].gold);
        let AIplan=AIplans;
        while(AIplan>Math.round(AIplans/2)){
        drawCardTrigger(currentPlayer);
        AIplan--;
        }
        if(AIplan<=Math.round(AIplans/2)){
        while(AIplan>0){
        if(cardOwn.findIndex((element)=>element.owner==currentPlayer && element.ignoreRule===false)!=-1){
        if(cardOwn[cardOwn.findIndex((element)=>element.owner==currentPlayer && element.ignoreRule===false)].uniqueEffect=="canAttackFromRow2"){
        selectedRow="row2";
        }else if(Math.round()*100<10){
        selectedRow="row2";
        }else if(Math.round()*100<10){
        selectedRow="row3";
        }else if(Math.round()*100<10){
        selectedRow="row4";
        }else{
        selectedRow="row1";
        }
        if(parseInt(gold.innerHTML)>=cardOwn[cardOwn.findIndex((element)=>element.owner==currentPlayer && element.ignoreRule===false)].cost){
    gold.innerHTML=parseInt(gold.innerHTML)-cardOwn[cardOwn.findIndex((element)=>element.owner==currentPlayer && element.ignoreRule===false)].cost;
        cardUse(cardOwn[cardOwn.findIndex((element)=>element.owner==currentPlayer && element.ignoreRule===false)].seed);
        }
        }
        AIplan--;
        }
        }
    //AI行動終了
    attackPerform();
    gold.innerHTML=parseInt(gold.innerHTML)+parseInt(production.innerHTML);
    player[currentPlayer].gold=gold.innerHTML;
    player[currentPlayer].production=production.innerHTML;
    currentPlayer=0;
    gold.innerHTML=player[currentPlayer].gold;
    production.innerHTML=player[currentPlayer].production;
    technologyCounter.innerHTML=player[currentPlayer].technology;
    hpEnemyCounter.innerHTML=player[player.findIndex((element)=>element.index!=currentPlayer)].hp;
    hpYouCounter.innerHTML=player[currentPlayer].hp;
    currentPlayerIndex.innerHTML=currentPlayer+1;
    }//if player2=AI終わり
    if(player.findIndex((element)=>element.hp<=0)!=-1){
        let deletePlayerByIndex = player.findIndex((element)=>element.hp<=0);
        player.push("dammy");
        player.length=player.copyWithin(deletePlayerByIndex,cardOwn.length-1).length-1;
        player.length=player.copyWithin(deletePlayerByIndex,deletePlayerByIndex+1).length-1;
        currentPlayer=player.findIndex((element)=>element.hp>0);
    }
}
/*攻撃*/
function attackPerform(){
let totalDamage=Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/3);
    //総ダメージが０以下にならない限り続ける。
while (totalDamage>0){
    //1列目への攻撃
if(player[player.findIndex((element)=>element.index!=currentPlayer)].row1Defence!=0){
let row1Enemy=cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row1");
    if(cardOwn[row1Enemy].name=="都市"){
        player[player.findIndex((element)=>element.index!=currentPlayer)].hp=player[player.findIndex((element)=>element.index!=currentPlayer)].hp-Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/6);
        }
if(cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row1")!=-1){
cardOwn[row1Enemy].power=cardOwn[row1Enemy].power-totalDamage;
    if(cardOwn[row1Enemy].power<=0){
        totalDamage=totalDamage-cardOwn[row1Enemy].power;
        kill(cardOwn[row1Enemy].seed);
    }else{
        totalDamage=0;
    }
    }
}else
//2列目への攻撃
if(player[player.findIndex((element)=>element.index!=currentPlayer)].row2Defence!=0){
let row2Enemy=cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row2");
    if(cardOwn[row2Enemy].name=="都市"){
        player[player.findIndex((element)=>element.index!=currentPlayer)].hp=player[player.findIndex((element)=>element.index!=currentPlayer)].hp-Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/6);
        }
if(cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row2")!=-1){
cardOwn[row2Enemy].power=cardOwn[row2Enemy].power-totalDamage;
    if(cardOwn[row2Enemy].power<=0){
        totalDamage=totalDamage-cardOwn[row2Enemy].power;
        kill(cardOwn[row2Enemy].seed);
    }else{
        totalDamage=0;
        }
    }
}else
//3列目への攻撃
if(player[player.findIndex((element)=>element.index!=currentPlayer)].row3Defence!=0){
let row3Enemy=cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row3");
    if(cardOwn[row3Enemy].name=="都市"){
        player[player.findIndex((element)=>element.index!=currentPlayer)].hp=player[player.findIndex((element)=>element.index!=currentPlayer)].hp-Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/6);
        }
if(cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row3")!=-1){
cardOwn[row3Enemy].power=cardOwn[row3Enemy].power-totalDamage;
    if(cardOwn[row3Enemy].power<=0){
        totalDamage=totalDamage-cardOwn[row3Enemy].power;
        kill(cardOwn[row3Enemy].seed);
    }else{
        totalDamage=0;
        }
    }
}else
//4列目への攻撃
if(player[player.findIndex((element)=>element.index!=currentPlayer)].row4Defence!=0){
let row4Enemy=cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row4");
    if(cardOwn[row4Enemy].name=="都市"){
        player[player.findIndex((element)=>element.index!=currentPlayer)].hp=player[player.findIndex((element)=>element.index!=currentPlayer)].hp-Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/6);
        }
if(cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.ignoreRule===true && element.assignedTo=="row4")!=-1){
cardOwn[row4Enemy].power=cardOwn[row4Enemy].power-totalDamage;
    if(cardOwn[row4Enemy].power<=0){
        totalDamage=totalDamage-cardOwn[row4Enemy].power;
        kill(cardOwn[row4Enemy].seed);
    }else{
        totalDamage=0;
        }
    }
}else{
    totalDamage=0;
    }
    }
/*//都市への攻撃
player[player.findIndex((element)=>element.index!=currentPlayer)].hp=player[player.findIndex((element)=>element.index!=currentPlayer)].hp-(player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power);
//都市カードへ攻撃
if(cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.name=="都市" && element.ignoreRule===true)!=-1){
cardOwn[cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.name=="都市" && element.ignoreRule===true)].power=cardOwn[cardOwn.findIndex((element)=> element.owner!=currentPlayer && element.name=="都市" && element.ignoreRule===true)].power-Math.round((player[currentPlayer].row1Power+player[currentPlayer].row2Power+player[currentPlayer].row3Power+player[currentPlayer].row4Power)/10);
    }
    */
}
/*カード効果*/
function cardUse(cardSeed){
    const usingCardByIndex = cardOwn.findIndex((element)=>element.seed==cardSeed);
    const enemyByIndex=player.findIndex((element)=>element.index!=cardOwn[usingCardByIndex].owner);
    if(!cardOwn[usingCardByIndex].power){
        if(cardOwn[usingCardByIndex].uniqueEffect=="evolve"){
            player[currentPlayer].technology++;
            technologyCounter.innerHTML=player[currentPlayer].technology;
            cardList[1].cost=cardList[1].cost+player[currentPlayer].technology;
            cardOwn[cardOwn.findIndex((element)=>element.uniqueEffect=="evolve")].cost=cardOwn[cardOwn.findIndex((element)=>element.uniqueEffect=="evolve")].cost+player[currentPlayer].technology;
        }
        cardOwn.push("dammy");
        cardOwn.length=cardOwn.copyWithin(usingCardByIndex,cardOwn.length-1).length-1;
        cardOwn.length=cardOwn.copyWithin(usingCardByIndex,usingCardByIndex+1).length-1;
        }else{
    if(selectedRow=="row1"){
        cardOwn[usingCardByIndex].assignedTo="row1";
        player[currentPlayer].row1Defence=player[currentPlayer].row1Defence+cardOwn[usingCardByIndex].power;
    var toX = 200;
        if(cardOwn[usingCardByIndex].uniqueEffect!="cannotAttack"){
    player[currentPlayer].row1Power=player[currentPlayer].row1Power+cardOwn[usingCardByIndex].power;
            }
        //生産力を追加
    if(!cardOwn[usingCardByIndex].production){}else{
        player[currentPlayer].row1Production=player[currentPlayer].row1Production+cardOwn[usingCardByIndex].production;
        productionCounter.innerHTML=player[currentPlayer].row1Production+player[currentPlayer].row2Production+player[currentPlayer].row3Production+player[currentPlayer].row4Production;
        }
    }
    if(selectedRow=="row2"){
        cardOwn[usingCardByIndex].assignedTo="row2";
        player[currentPlayer].row2Defence=player[currentPlayer].row2Defence+cardOwn[usingCardByIndex].power;
    var toX = 400;
    if(cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow2" || cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow3" || cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow4"){
    player[currentPlayer].row2Power=player[currentPlayer].row2Power+cardOwn[usingCardByIndex].power;
    }
        if(!cardOwn[usingCardByIndex].production){}else{
        player[currentPlayer].row2Production=player[currentPlayer].row2Production+cardOwn[usingCardByIndex].production;
            productionCounter.innerHTML=player[currentPlayer].row1Production+player[currentPlayer].row2Production+player[currentPlayer].row3Production+player[currentPlayer].row4Production;
        }
    }
    if(selectedRow=="row3"){
        cardOwn[usingCardByIndex].assignedTo="row3";
        player[currentPlayer].row3Defence=player[currentPlayer].row3Defence+cardOwn[usingCardByIndex].power;
    var toX = 600;
        if(cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow3" || cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow4"){
    player[currentPlayer].row3Power=player[currentPlayer].row3Power+cardOwn[usingCardByIndex].power;
            }
        if(!cardOwn[usingCardByIndex].production){}else{
        player[currentPlayer].row3Production=player[currentPlayer].row3Production+cardOwn[usingCardByIndex].production;
            productionCounter.innerHTML=player[currentPlayer].row1Production+player[currentPlayer].row2Production+player[currentPlayer].row3Production+player[currentPlayer].row4Production;
        }
    }
    if(selectedRow=="row4"){
        cardOwn[usingCardByIndex].assignedTo="row4";
        player[currentPlayer].row4Defence=player[currentPlayer].row4Defence+cardOwn[usingCardByIndex].power;
    var toX = 800;
        if(cardOwn[usingCardByIndex].uniqueEffect=="canAttackFromRow4"){
    player[currentPlayer].row4Power=player[currentPlayer].row4Power+cardOwn[usingCardByIndex].power;
            }
        if(!cardOwn[usingCardByIndex].production){}else{
        player[currentPlayer].row4Production=player[currentPlayer].row4Production+cardOwn[usingCardByIndex].production;
            productionCounter.innerHTML=player[currentPlayer].row1Production+player[currentPlayer].row2Production+player[currentPlayer].row3Production+player[currentPlayer].row4Production;
        }
    }
    cardOwn[usingCardByIndex].ignoreRule=true;
    while(Math.abs(cardOwn[usingCardByIndex].x-toX)>7 && Math.abs(cardOwn[usingCardByIndex].y-100)>7){
    cardOwn[usingCardByIndex].x=cardOwn[usingCardByIndex].x+Math.sin(Math.atan2(toX-cardOwn[usingCardByIndex].x,100-cardOwn[usingCardByIndex].y))*Math.random()*7;
    cardOwn[usingCardByIndex].y=cardOwn[usingCardByIndex].y+Math.cos(Math.atan2(toX-cardOwn[usingCardByIndex].x,100-cardOwn[usingCardByIndex].y))*Math.random()*7;
    }
    }
}
/*キャンバス*/
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
//マウスの位置を取得
const mouse = {
                x: null,
                y: null
            }
            window.addEventListener('mousemove', (event) => {
                //alignCenterの影響か？mouse.xが+88されてる。それを調整。
                mouse.x = event.x-88;
                mouse.y = event.y;
            });
//基本的なスタイル
canvas.style.border="2px solid";
ctx.font = "10px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
function translate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "30px serif";
    if(selectedRow=="row1"){
        ctx.fillStyle="red";
    }else if(Math.abs(mouse.x-200)<50 && Math.abs(mouse.y-30)<30){
        ctx.fillStyle="yellow";
    }else{
        ctx.fillStyle="black";
    }
    ctx.fillText("前線"+player[currentPlayer].row1Power+"-"+player[currentPlayer].row1Defence,200,30);
    if(selectedRow=="row2"){
        ctx.fillStyle="red";
    }else if(Math.abs(mouse.x-400)<50 && Math.abs(mouse.y-30)<30){
        ctx.fillStyle="yellow";
    }else{
        ctx.fillStyle="black";
    }
    ctx.fillText("前方"+player[currentPlayer].row2Power+"-"+player[currentPlayer].row2Defence,400,30);
    if(selectedRow=="row3"){
        ctx.fillStyle="red";
    }else if(Math.abs(mouse.x-600)<50 && Math.abs(mouse.y-30)<30){
        ctx.fillStyle="yellow";
    }else{
        ctx.fillStyle="black";
    }
    ctx.fillText("中央"+player[currentPlayer].row3Power+"-"+player[currentPlayer].row3Defence,600,30);
    if(selectedRow=="row4"){
        ctx.fillStyle="red";
    }else if(Math.abs(mouse.x-800)<50 && Math.abs(mouse.y-30)<30){
        ctx.fillStyle="yellow";
    }else{
        ctx.fillStyle="black";
    }
    ctx.fillText("後方"+player[currentPlayer].row4Power+"-"+player[currentPlayer].row4Defence,800,30);
    if(player.length<2){
        ctx.fillText("プレイヤー"+(player[currentPlayer].index+1)+"の勝ち！",canvas.width/2,canvas.height/2);
    }
    for(const c of cardOwn){
    if(!c.ignoreRule){c.ignoreRule=false;}
    if(cardOwn.findIndex((element)=>Math.abs(element.x-c.x)<50 && Math.abs(element.y-c.y)<50 && element.seed!=c.seed && element.ignoreRule===false && element.owner==c.owner)!=-1 && c.ignoreRule===false){
    c.x=c.x+85;
    if(c.x>canvas.width){
    c.y=c.y-130;
    c.x=c.x-1275;
    }
    }
    cardContext();
    }
    requestAnimationFrame(translate);
}
translate();
function cardContext(){
    for(const c of cardOwn){
    if(currentPlayer==c.owner){
    if(mouse.x<c.x+40 && mouse.x>c.x-40 && mouse.y<c.y+55 && mouse.y>c.y-55){
        ctx.fillStyle="lightblue";
    }else{
        ctx.fillStyle="black";
    }
    ctx.fillRect(c.x-40,c.y-55,80,110);
    ctx.fillStyle="white";
    ctx.fillRect(c.x-37,c.y-52,74,104);
    if(mouse.x<c.x+40 && mouse.x>c.x-40 && mouse.y<c.y+55 && mouse.y>c.y-55){
        ctx.fillStyle="red";
    }else{
        ctx.fillStyle="black";
    }
    ctx.font = "20px serif";
    ctx.fillText(c.name,c.x,c.y-20);
    ctx.font = "10px serif";
    ctx.fillText(c.message,c.x,c.y+10);
    ctx.fillText(c.message2,c.x,c.y+20);
    ctx.fillText(c.message3,c.x,c.y+30);
    ctx.font = "18px serif";
    ctx.fillText(c.cost,c.x-26,c.y-42);
    if(!c.production){}else{
    ctx.fillText(c.production,c.x,c.y-42);
    }
    if(!c.power){}else{
    ctx.fillText(c.power,c.x+26,c.y-42);
    }
    ctx.font = "10px serif";
    ctx.fillText(c.requires+"-"+c.obsolete,c.x,c.y+42);
    ctx.stroke();
    }
    }
}
window.addEventListener("click",(event)=>{
    //クリック判定
    const clickableCardByIndex=cardOwn.findIndex((element)=>mouse.x<element.x+40 && mouse.x>element.x-40 && mouse.y<element.y+55 && mouse.y>element.y-55 && element.ignoreRule===false && element.owner==currentPlayer);
    if(clickableCardByIndex!=-1){
        if(parseInt(gold.innerHTML)>=cardOwn[clickableCardByIndex].cost){
    gold.innerHTML=parseInt(gold.innerHTML)-cardOwn[clickableCardByIndex].cost;
        cardUse(cardOwn[clickableCardByIndex].seed);
        }
    }
    if(Math.abs(mouse.x-200)<50 && Math.abs(mouse.y-30)<30){
        selectedRow="row1";
    }
    if(Math.abs(mouse.x-400)<50 && Math.abs(mouse.y-30)<30){
        selectedRow="row2";
    }
    if(Math.abs(mouse.x-600)<50 && Math.abs(mouse.y-30)<30){
        selectedRow="row3";
    }
    if(Math.abs(mouse.x-800)<50 && Math.abs(mouse.y-30)<30){
        selectedRow="row4";
    }
});
console.log(cardList);
function kill(cardSeed){
    let cardByIndex=cardOwn.findIndex((element)=>cardSeed==element.seed);
    if(cardOwn[cardByIndex].assignedTo=="row1"){
        player[cardOwn[cardByIndex].owner].row1Defence=player[cardOwn[cardByIndex].owner].row1Defence-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        if(cardOwn[cardByIndex].uniqueEffect!="cannotAttack"){
        player[cardOwn[cardByIndex].owner].row1Power=player[cardOwn[cardByIndex].owner].row1Power-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        }
    }
    if(cardOwn[cardByIndex].assignedTo=="row2"){
        player[cardOwn[cardByIndex].owner].row2Defence=player[cardOwn[cardByIndex].owner].row2Defence-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        if(cardOwn[cardByIndex].uniqueEffect!="cannotAttack"){
        player[cardOwn[cardByIndex].owner].row2Power=player[cardOwn[cardByIndex].owner].row2Power-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        }
    }
    if(cardOwn[cardByIndex].assignedTo=="row3"){
        player[cardOwn[cardByIndex].owner].row3Defence=player[cardOwn[cardByIndex].owner].row3Defence-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        if(cardOwn[cardByIndex].uniqueEffect!="cannotAttack"){
        player[cardOwn[cardByIndex].owner].row3Power=player[cardOwn[cardByIndex].owner].row3Power-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        }
    }
    if(cardOwn[cardByIndex].assignedTo=="row4"){
        player[cardOwn[cardByIndex].owner].row4Defence=player[cardOwn[cardByIndex].owner].row4Defence-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        if(cardOwn[cardByIndex].uniqueEffect!="cannotAttack"){
        player[cardOwn[cardByIndex].owner].row4Power=player[cardOwn[cardByIndex].owner].row4Power-cardList[cardList.findIndex((element)=>element.name==cardOwn[cardByIndex].name)].power;
        }
    }
    cardOwn.push("dammy");
        cardOwn.length=cardOwn.copyWithin(cardByIndex,cardOwn.length-1).length-1;
        cardOwn.length=cardOwn.copyWithin(cardByIndex,cardByIndex+1).length-1;
}
