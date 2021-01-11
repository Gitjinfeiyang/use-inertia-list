import Item from './item'
import Spring from './spring'

export default class Container {

  constructor(options){
    this.options = options

    this.activeItem = null

    this.init()

    this.refresh()


  }

  init(){
    let listItem = null
    const list = this.options.list
    const listItems = []

    for(let i = 0; i<list.length; i++){
      listItem = new Item(list[i])
      listItem.container = this
      listItem.index = i
      if(i !== 0){
        listItem.setLeftSpring(listItems[i - 1].rightSpring)
        listItem.leftSpring.initBaseLength()
      }

      if(i !== list.length - 1){
        listItem.setRightSpring(new Spring())
      }

      listItems.push(listItem)
    }

    this.listItems = listItems

  }

  refresh(){

    // this.listItems[0].moveTo(30)
    // return
    this.lastTime = Date.now()
    this.calcLocation(17)

  }

  calcLocation(duration){

    // this.start.calcLocation(1)
    this.listItems.forEach((item,index) => {
        item.calcLocation(duration/17,index)
    })
    // this.end.calcLocation(1)
    window.requestAnimationFrame(() => {
      this.calcLocation(Date.now() - this.lastTime)
      this.lastTime = Date.now()
    })
  }

  moveItem(item,offset){
    this.activeItem && (this.activeItem.isActive = false)
    this.activeItem && (this.activeItem.moveSpeed = 0)
    this.activeItem = item
    item.isActive = true
    item.moveBy(offset)
  }


}
