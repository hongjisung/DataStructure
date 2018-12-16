/*
javascript constructure 1개

class:
  Node
  List


Node:
  data
  prev
  next

List:
  size()
  empty()

  begin()
  end()

  front()
  back()

  clear()
  insert()
  erase()
  push_back()
  push_front()
  pop_back()
  pop_front()

  merge()
  splice()
  reverse()

*/
import Iterator from './iterator.js';

class Node {
  constructor(data='', prev='', next='') {
    this._data = data;
    this._prev = prev;
    this._next = next;
  }

  get getData(){
    return this._data;
  }
  set setData(data){
    this._data = data;
  }
  
  get getPrev(){
    return this._prev;
  }
  set setPrev(prev){
    this._prev = prev;
  }

  get getNext(){
    return this._next;
  }
  set setNext(next){
    this._next = next;
  }
}

class List extends Iterator {
  constructor(){
    super();
    this._size = 0;
    this._front = '';
    this._back = '';
  }

  // Capacity
  get size(){
    return this.size;
  }
  empty(){
    if(this._size===0){
      return true;
    }
    return false;
  }

  // c++ iterators
  begin(){}
  end(){}

  // Element Access
  get front(){
    return this._front;
  }
  get back(){
    return this._back;
  }

  // Modifiers
  clear(){
    this._size = 0;
    this._front = '';
    this._back = '';
  }
  insert(){}
  erase(){}
  push_back(data){
    let node = new Node(data, this._back, '');
    
    if(this._size===0){
      this._front = node;
      this._back = node;
    }
    else{
      this._back.setNext(node);
      this._back = node;
    }

    this._size += 1;
  }
  push_front(data){
    let node = new Node(data, '', this._front);

    if(this._size===0){
      this._front = node;
      this._back = node;
    }
    else{
      this._front.setPrev(node);
      this._front = node;
    }
  }
  pop_back(){}
  pop_front(){}


  // javascript iterator
  [Symbol.iterator](){
    const iterator = {
      next() {
      
      }
    };
    return iterator;
  }
}

export default List;
