class cards{
  name;
  power;
  cost;
  field;
  uniqueEffect;
  message;
  setName(name) {
    this.name = name;
  }
  setPower(power) {
    this.power = power;
  }
  setCost(cost) {
    this.cost = cost;
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
  //何らかの処理
  cardFunction() {
    console.log(`${this.message}`);
  }
}
