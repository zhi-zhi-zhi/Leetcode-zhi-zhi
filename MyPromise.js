function A() {
  this.x = "hello"
}

A.prototype.x = "world"

const obj = new A()
obj.x = 'change'
console.log(obj.x)
delete obj.x
console.log(obj.x)
delete obj.x
console.log(obj.x)
delete obj.x

obj.x = undefined
console.log(obj.x)