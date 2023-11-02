const person = {
    name: "sanyika",
    age: "8",
}

class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    greetings() {
        console.log(`I am ${this.name}, ${this.age} years old`)
    }
  }

module.exports = Person;
