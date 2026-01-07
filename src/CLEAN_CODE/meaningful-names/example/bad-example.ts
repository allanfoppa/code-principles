// ❌ BAD EXAMPLE: Poor naming conventions

class d {
  // What does 'd' mean?
  private t: number; // Time? Temperature? Total?
  private data1: string[]; // What kind of data?
  private data2: string[]; // How is this different from data1?

  constructor() {
    this.t = 0;
    this.data1 = [];
    this.data2 = [];
  }

  // What does this method do?
  m1(x: string): void {
    this.data1.push(x);
  }

  // Is this getting data1 or data2?
  getData(): string[] {
    return this.data1;
  }

  // What kind of calculation?
  calc(): number {
    let r = 0; // Result? Rate? Radius?
    for (let i = 0; i < this.data1.length; i++) {
      r += this.data1[i].length;
    }
    return r;
  }

  // What does flag mean? When should it be true?
  process(flag: boolean): void {
    if (flag) {
      this.data2 = this.data1.filter((item) => item.length > 3);
    } else {
      this.data2 = [...this.data1];
    }
  }
}

// Usage example - unclear what's happening
const mgr = new d();
mgr.m1("hello");
mgr.m1("world");
mgr.process(true);
const result = mgr.calc();
