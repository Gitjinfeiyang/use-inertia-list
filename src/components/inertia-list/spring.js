export default class Spring {
  constructor(options){
    this.baseLength = 1  // 初始长度
    this.currentLength = 1 // 当前长度
    this.maxLength = 1
    this.minLength = 1
    this.forceBase = 1    // 弹力系数
    this.leftItem = null
    this.rightItem = null
    this.damping = 40   // 阻尼
  }

  initBaseLength(){
    this.baseLength= this.currentLength = this.getLength()
    this.minLength = this.baseLength * 0.9
    this.maxLength = this.baseLength * 1.1
  }

  getLength(){
    return this.rightItem.location - this.leftItem.location - this.leftItem.size
  }

  getForce(){
    this.currentLength = this.getLength()
    const offsetLength = this.baseLength - this.currentLength
    const damping = multi(this.leftItem.speed - this.rightItem.speed,1)*this.damping
    return multi(offsetLength,1)  * this.forceBase + damping
  }

  reachLimit(){
    const length = this.getLength()
    return length > this.maxLength || length<this.minLength
  }

  getLimitLength(){
    const length = this.getLength()
    if(length>= this.maxLength){
      return this.maxLength
    }else{
      return this.minLength
    }
  }
}

function multi(val,count=1){
  let value = 1
  for(let i =0; i<count; i++){
    value = value*val
  }
  return value
}
