// ***** TypeScript course notes ********************

// type enum: each element will have an id (1, 2, 3)
enum Role { ADMIN, USER, GUEST };

// declaring an object and its types
const person: {
  name: string;
  age: number;
  hobbies: string[]; // array of strings type syntax
  tuple: [number, string]; // type tuple: array with certain structure and length
  role: number;
} = {
  name: 'Gabriel',
  age: 25,
  hobbies: ['Play piano', 'Ride bicicle'],
  tuple: [2, 'maybe something related to the first value of this array?'],
  role: Role.ADMIN,
}

// type function syntax
type addFunction = (a: number, b: number) => number;
let add: addFunction;

// arrow function syntax with default parameter
const someFunction = (param: string = 'defaultParam') : string => param;

function throwError(
  message: string,
  code: number
): never { // type never = something than will never occur
  throw {
    message,
    errorCode: code,
  };
};

// type unknown: we don't know what type this variable will have
let userInput: unknown;

// defining an alias for a type
type NumberOrString = number | string;

function combine(
  input1: NumberOrString,
  input2: number | string, // type union: the parameter must be one of these types
  resultType: 'as-number' | 'as-string', // type literal: same as above but with literal/custom types
) {
  let result: NumberOrString;

  if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  };

  return result;
};

function printSomething(something: any): void { // type void = when a function returns nothing in particular
  console.log(something);
};

function sumAndCallback(
  n1: number,
  n2: number,
  callback: (result: number) => void
) {
  callback(n1 + n2);
};

// a class
class Department {
  // private name: string;
  private employees: string[] = []; // default value is []

  constructor(
    private readonly id: number, // readonly only exists in TypeScript
    private name: string, // short way of declaring a property of a class,
    // n: string
  ) {
    // this.name = n;
  };

  printName(this: Department) { // TypeScript understands that this = type Department
    console.log('Department: ' + this.name);
  };

  get departmentEmployees() {
    return this.employees;
  };

  set departmentEmployees(value: string[]) {
    this.employees = [...value];
  };
};

// an interface (interfaces only exist in TypeScript)
interface Named {
  readonly name: string;
  outputName?: string; // ? = optional property, specified type | undefined
};

// another interface extending the above one
interface Greetable extends Named {  
  greet(phrase: string): void;
};

// a class implementing the Greetable interface
class Person implements Greetable {
  name: string;

  constructor(n: string) {
    this.name = n;
  };

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  };
};

const me = new Person('Gabriel');

// interface as type Function
interface AddFunction {
  (a: number, b: number): number;
};

type Admin = {
  name: string,
  privileges: string[],
};

type Employee = {
  name: string,
  startDate: Date,
}

// type intersection = combine the two above types
type ElevatedEmployee = Admin & Employee;
type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(employee: UnknownEmployee) {
  console.log('Name: ' + employee.name);

  if ('privileges' in employee) { // type guard = extra type check (avoid runtime errors by checking types before you try to do something with the values)
    console.log('Privileges: ' + employee.privileges);
  }
}

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;
const vehicle1 = new Car();
const vehicle2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) { // type guard = extra type check (avoid runtime errors by checking types before you try to do something with the values)
    vehicle.loadCargo(1);
  }
}

// discriminated unions (below we use a property we know that exists in each interface)
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
}

 // ! = we are sure the element exists
 // const button = document.querySelector('button')!;

// type casting (usefull to inform TypeScript that a certain value os of a specific type)
const input1 = <HTMLInputElement>document.getElementById('user-input');
const input2 = document.getElementById('user-input') as HTMLInputElement;
input1.value = 'hello';
input2.value = 'hello';

interface ErrorContainer {
  [key: string]: string; // index types (extra flexibility about property names and how many we need)
}

const errorBag: ErrorContainer = {
  email: 'invalid',
  username: 'invalid',
}

// function overloads
function sum(a: number, b: number): number; // if we receive two numbers, return a number
function sum(a: string, b: string): string; // if we receive two strings, return a string
function sum(a: string, b: number): number; // if we receive a number and a string, return a number
function sum(a: number | string, b: number | string) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}

const fetchedUserData = {
  id: 1,
  name: 'Gabriel',
  // job: {
  //   role: 'Web UI Developer',
  //   company: 'Globant',
  // },
}

// ? = optional chaining operator
// console.log(fetchedUserData?.job?.role);

// ?? = if nullConstant is null or undefined
const nullConstant = '';
const storedData = nullConstant ?? 'DEFAULT';

// generic type
const names: Array<string> = []; // same as string[]

// another generic type, this promise will return a string
const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('Done!');
  }, 2000);
});

// we tell TypeScript that objA of generic type T ca be different that objB of generic type U
function merge<T extends object, U extends object>(objA: T, objB: U) { // extends = T must be an object
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Gabriel' }, { age: 25 });

interface Lengthy {
  length: number;
}

// we only care that generic type T has a length property (can be string, array, etc)
function countAndDescribe<T extends Lengthy>(element: T) { // extends is a constraint
  let descriptionText = 'No value';

  if (element.length > 0) {
    descriptionText = `Got ${element.length}`
  }

  return [element, descriptionText];
}

// we tell TypeScript that key of generic type U is a key of an object of generic type T
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { // keyof is another constraint
  return obj[key];
}

// generic types give flexibility and type safety
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

interface CourseGoal {
  title: string;
  description: string;
}

function createCourseGoal(title: string, description: string): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // Partial is an utility type
  courseGoal.title = title;
  courseGoal.description = description;

  return courseGoal as CourseGoal;
}

// this is a readonly array (can't push/pop/etc) (Readonly is an utility type)
const someNames: Readonly<string[]> = ['Gabriel', 'Ignacio'];

// my first decorator factory
function Logger(logString: string) {
  return function(target: Function) {
    console.log(logString);
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('WithTemplate decorator here!');
  
  return function<T extends {new(...args: any[]): {name: string}}>(target: T) {
    
    // a decorator can return a class and this will replace the target class
    return class extends target {
      constructor(..._: any[]) {
        super();
        const hookElement = document.getElementById(hookId);

        if (hookElement) {
          hookElement.innerHTML = template;
          hookElement.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
} 

// @Logger('Logger decorator here!') // using my first decorator factory
// @WithTemplate('<h1>My person object</h1>', 'app')
class SomePerson {
  name = 'Gabriel';

  constructor() {
    console.log('Creating a person object...');
  }
}

// console.log(new SomePerson());

// decorator function
function Log(target: any, propertyName: string) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

// another decorator function
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// another decorator function
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  // @Log // property decorator
  title: string;
  private _price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // @Log2 // accessor decorator
  set price(value: number) {
    this._price = value;
  }

  // @Log3 // method decorator
  getPriceWithTax(/*@Log4*/ tax: number) { // parameter decorator
    return this._price * (1 + tax);
  }
}

// another decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) { // _ = not interested in these values
  const originalMethod = descriptor.value;
  
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    }
  }

  // we are returning a new configuration
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

// button.addEventListener('click', printer.showMessage);

interface ValidatorConfig {
  [property: string]: { // title, price
    [validatableProperty: string]: string[] // ['required', 'positive']
  }
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registerValidators[target.constructor.name] = {
    [propertyName]: ['required']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  console.log(registerValidators);
  

  if (!objValidatorConfig) {
    return true;
  }

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          return !!obj[prop];
      }
    }
  }

  return true;
}

class Course {
  @Required
  title: string;

  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;
  
  const createdCourse = new Course(title, price);
  
  if (!validate(createdCourse)) {
    console.log('Invalid form');
  } else {
    console.log(createdCourse);
  }
})