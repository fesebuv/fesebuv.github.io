'use strict';

console.log(null === null);
console.log('=======');

var expect = function(expected, actual){
  console.log('expected: %s | actual: %s | assertions is: %s',expected, actual, expected === actual);
};

var nicePrint = function(o1, o2, isEqual) {
  console.log('------------');
  console.dir(o1);
  console.dir(o2);
  console.log('deepEquals? %s', isEqual);
};


var deepEquals = function (o1, o2) {
  
  

  if(o1 === o2){
    return true;
  }

  if(!o2) {
    return false;
  }

  // console.log(Object.keys(o1));

  var keys = Object.keys(o1);
  var len = keys.length;

  for(var i=0; i<len; i++) {

    var key = keys[i];
    var value1 = o1[key];
    var value2 = o2[key];

    if(!o2.hasOwnProperty(key)) {
      return false;
    }
    
    // console.log('value: %s, type:%s', value1, typeof value1);
    // console.log('value: %s, type:%s', value2, typeof value2);
     
    if(typeof value1 === 'object') {
      // console.log('iterate again:%s %s', value1, value2);
      deepEquals(value1, value1);
    } else {
      // console.log('value1: %s, value2: %s, equal? %s', value1, value2, value1===value2 );
      if(value1 !== value2){
        return false;
      }
    } 
  }
  
  return true;
  
};

var obj1 = {
  name: 'felipe',
  age: '31',
  height: '170'
};

var obj2 = {
  name: 'felipe',
  age: obj1.age,
  height: [
    '5',
    '7'
  ]
};

var obj3 = [
  'felipe',
  '31',
  '170'
];

var obj4 = {
  name: 'felipe',
  age: 31,
  height: 170
};

var obj5 = {
  name: obj1.name,
  age: obj1.age,
  height: obj1.height
};

var obj10 = {
  user : {
    obj1
  },
  something: true,
  somethingElse: false
}

var obj20 = {
  user : {
    obj5
  },
  something: true,
  somethingElse: false
}

var obj21 = {
  user : {
    obj5
  },
  something: true,
  somethingElse: 'false'
}


var obj22 = {
  user : {
    obj5
  },
  something: true,
  somethingElse: null
}

var obj30 = {
  a: obj1,
  b: obj2,
  c: obj3,
  d: obj4
};

var obj31 = {
  a: {
   name: 'felipe',
   age: '31',
   height: '170'
  },
  b: {
   name: 'felipe',
   age: obj1.age,
   height: [
     '5',
     '7'
   ]
  },
  c: [
   'felipe',
   '31',
   '170'
  ],
  d: {
   name: 'felipe',
   age: 31,
   height: 170
  }
}



// nicePrint(obj1, obj2,deepEquals(obj1, obj2));
// nicePrint(obj1, obj3,deepEquals(obj1, obj3));
// nicePrint(obj1, obj4,deepEquals(obj1, obj4));
// nicePrint(obj1, obj5,deepEquals(obj1, obj5));
// nicePrint(obj10, obj20,deepEquals(obj10, obj20));
// nicePrint(obj10, obj21,deepEquals(obj10, obj21));
// nicePrint(obj10, obj22,deepEquals(obj10, obj22));
// nicePrint(obj30, obj31,deepEquals(obj30, obj31));


expect(false, deepEquals(obj1, obj2));
expect(false, deepEquals(obj1, obj3));
expect(false, deepEquals(obj1, obj4));
expect(true, deepEquals(obj1, obj5));
expect(true,deepEquals(obj10, obj20));
expect(false,deepEquals(obj10, obj21));
expect(false,deepEquals(obj10, obj22));
expect(true,deepEquals(obj30, obj31));
expect(false,deepEquals(obj30, null));
expect(true,deepEquals(null, null));