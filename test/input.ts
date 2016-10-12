import 'reflect-metadata';
import test = require('tape');
import { input } from '../index';
import { Input } from '@angular/core';

test('Class metadata must be equivalent', ({deepEqual, end}) => {
  const { ConventionDecorated, Decorated } = createClasses();

  const firstKeys = Reflect.getMetadataKeys(ConventionDecorated);
  const secondKeys = Reflect.getMetadataKeys(Decorated);
  const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, ConventionDecorated));
  const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, Decorated));

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Instance metadata must be equivalent', ({deepEqual, end}) => {
  const { ConventionDecorated, Decorated } = createClasses();

  const decorated1 = new ConventionDecorated();
  const decorated2 = new Decorated();

  const firstKeys = Reflect.getMetadataKeys(decorated1, 'dateAndTime');
  const secondKeys = Reflect.getMetadataKeys(decorated2, 'dateAndTime');

  const firstMetadata = firstKeys.map(key => Reflect.getMetadata(key, decorated1, 'dateAndTime'));
  const secondMetadata = secondKeys.map(key => Reflect.getMetadata(key, decorated2, 'dateAndTime'));

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Class setter metadata must be equivalent', ({deepEqual, end}) => {

  const { Conventional, Standard } = createClassesWithSetters();

  const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Instance getter metadata must be equivalent', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithGetters();

  const decorated1 = new Conventional();
  const decorated2 = new Standard();

  const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Class setter metadata must be equivalent', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithSetters();

  const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Instance setter metadata must be equivalent', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithSetters();

  const decorated1 = new Conventional();
  const decorated2 = new Standard();

  const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Class getter and setter metadata must be equivalent', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithGettersAndSetters();

  const firstMetadata = Reflect.getMetadata('design:type', Conventional, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', Standard, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Class getter and setter metadata must be equivalent', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithGettersAndSetters();

  const decorated1 = new Conventional();
  const decorated2 = new Standard();

  const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

test('Class getter and setter metadata must be equivalent when decoration is on setter', ({deepEqual, end}) => {
  const {Conventional, Standard} = createClassesWithGettersAndSettersWithDecoratorOnSet();

  const decorated1 = new Conventional();
  const decorated2 = new Standard();

  const firstMetadata = Reflect.getMetadata('design:type', decorated1, 'dateAndTime');
  const secondMetadata = Reflect.getMetadata('design:type', decorated2, 'dateAndTime');

  deepEqual(firstMetadata, secondMetadata);
  end();
});

function createClasses() {
  class ConventionDecorated {
    @input dateAndTime: Date;
  };

  class Decorated {
    @Input() dateAndTime: Date;
  };
  return { ConventionDecorated, Decorated };
}


function createClassesWithSetters() {
  class Conventional {
    date: Date;
    @input set dateAndTime(value: Date) {
      this.date = value;
    }
  };

  class Standard {
    date: Date;
    @Input() set dateAndTime(value: Date) {
      this.date = value;
    }
  };
  return { Conventional, Standard };
}
function createClassesWithGetters() {
  const now = new Date();
  class Conventional {
    @input get dateAndTime(): Date {
      return now;
    }
  };

  class Standard {
    @Input() get dateAndTime(): Date {
      return now;
    }
  };

  return { Conventional, Standard };
}

function createClassesWithGettersAndSetters() {
  class Conventional {
    date: Date;
    @input get dateAndTime(): Date {
      return this.date;
    }
    set dateAndTime(value) {
      this.date = value;
    }
  };

  class Standard {
    date: Date;
    @Input() get dateAndTime(): Date {
      return this.date;
    }
    set dateAndTime(value) {
      this.date = value;
    }
  };

  return { Conventional, Standard };
}

function createClassesWithGettersAndSettersWithDecoratorOnSet() {
  class Conventional {
    date: Date;
    get dateAndTime(): Date {
      return this.date;
    }
    @input set dateAndTime(value) {
      this.date = value;
    }
  };

  class Standard {
    date: Date;
    get dateAndTime(): Date {
      return this.date;
    }
    @Input() set dateAndTime(value) {
      this.date = value;
    }
  };

  return { Conventional, Standard };
}