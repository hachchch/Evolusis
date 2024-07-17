const technologyCounter = document.getElementById("technologyCounter");
const hpYouCounter = document.getElementById("hpYouCounter");
const hpEnemyCounter = document.getElementById("hpEnemyCounter");
const gold=document.getElementById("goldCounter");
const production=document.getElementById("productionCounter");
let multiMode=0;

const player = [];
player.push({
    index:0,
    hp:100,
    production:0,
    gold:0,
    technology:0,
    row1Power:0,
    row2Power:0,
    row3Power:0,
    row4Power:0,
    row1Defence:0,
    row2Defence:0,
    row3Defence:0,
    row4Defence:0,
    row1Production:0,
    row2Production:0,
    row3Production:0,
    row4Production:0,
    isAI:false
});
//AI player
player.push({
    index:1,
    hp:100,
    production:0,
    gold:0,
    technology:0,
    row1Power:0,
    row2Power:0,
    row3Power:0,
    row4Power:0,
    row1Defence:0,
    row2Defence:0,
    row3Defence:0,
    row4Defence:0,
    row1Production:0,
    row2Production:0,
    row3Production:0,
    row4Production:0,
    isAI:true
});
function toggleMulti(){
    //0か1を切り替える。
    if(multiMode==0){
    player[1].isAI=false;
    multiMode++;
    }else{
    player[1].isAI=true;
    multiMode--;
    }
}

hpEnemyCounter.innerHTML=player[1].hp;
hpYouCounter.innerHTML=player[0].hp;
technologyCounter.innerHTML=player[0].technology;
production.innerHTML=player[0].production;
gold.innerHTML=player[0].gold;
