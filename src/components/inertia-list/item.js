export default class Item {

  constructor(options){
    this.weight = 40      // 重量
    this.location = options.location    // 位置
    this.size = options.size
    this.speed = 0       // 速度
    this.acceleration = 0// 加速度
    this.force = 0       // 受力
    this.leftSpring = null
    this.rightSpring = null
    this.isActive = false
    this.isStatic = options.isStatic || false
    this.moveSpeed = 0
    this.container = null
    this.index = 0
  }

  calcLocation(duration,index){
    const selfSpeed = this.speed

    if(!this.isActive){
      if(this.container.activeItem && this.index < this.container.activeItem.index && this.leftSpring && this.leftSpring.reachLimit()){
          this.leftSpring.leftItem.speed = 0
          this.leftSpring.leftItem.location = this.location - this.size - this.leftSpring.getLimitLength()
      }
      if( this.container.activeItem && this.index > this.container.activeItem.index && this.rightSpring && this.rightSpring.reachLimit()){
        this.rightSpring.rightItem.speed = 0
        this.rightSpring.rightItem.location = this.location + this.size + this.rightSpring.getLimitLength()
      }
        this.force = (this.leftSpring?this.leftSpring.getForce():0) - (this.rightSpring?this.rightSpring.getForce():0)
        this.acceleration = this.force/this.weight // f=ma
        this.speed += this.acceleration * duration // v=v0+at
        this.location += this.speed * duration      // s=vt

        if(Math.abs(this.force)<1 && Math.abs(this.speed) <1){
          this.acceleration = 0
          this.speed = 0
        }
    }else {
      if(this.leftSpring && this.leftSpring.reachLimit()){
        this.leftSpring.leftItem.speed = 0
        this.leftSpring.leftItem.location = this.location - this.size - this.leftSpring.getLimitLength()
      }
      if(this.rightSpring && this.rightSpring.reachLimit()){
          this.rightSpring.rightItem.speed = 0
          this.rightSpring.rightItem.location = this.location + this.size + this.rightSpring.getLimitLength()
      }
    }
  }

  setLeftSpring(spring){
    this.leftSpring = spring
    this.leftSpring.rightItem = this
  }

  setRightSpring(spring){
    this.rightSpring = spring
    this.rightSpring.leftItem = this
  }

  moveTo(location){
    this.location = location
  }

  moveBy(offset){
    this.location += offset
    this.moveSpeed = offset
  }

}
