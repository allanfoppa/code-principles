// Composition: "Has-a" relationship - Objects contain other objects
// Simple rule: Build complex things from simple parts

// Inheritance = 'IS-A' (Dog is an Animal)
// Composition = 'HAS-A' (Car has an Engine)
// Prefer composition when building complex objects!

// SIMPLE PARTS (components)
class Battery {
  constructor(private capacity: number) {}

  public charge(): void {
    console.log(`🔋 Battery charging (${this.capacity}mAh)`);
  }

  public getCapacity(): number {
    return this.capacity;
  }
}

class Screen {
  constructor(private size: number) {}

  public display(content: string): void {
    console.log(`📱 Displaying on ${this.size}" screen: ${content}`);
  }
}

class Camera {
  constructor(private megapixels: number) {}

  public takePicture(): void {
    console.log(`📸 Taking ${this.megapixels}MP photo`);
  }
}

// COMPLEX OBJECT BUILT FROM SIMPLE PARTS
class Phone {
  // Phone HAS-A battery, screen, and camera
  private battery: Battery;
  private screen: Screen;
  private camera: Camera;

  constructor(
    private brand: string,
    battery: Battery,
    screen: Screen,
    camera: Camera
  ) {
    this.battery = battery;
    this.screen = screen;
    this.camera = camera;
  }

  public turnOn(): void {
    console.log(`\n📱 ${this.brand} Phone turning on...`);
    this.battery.charge();
    this.screen.display("Welcome!");
  }

  public takePhoto(): void {
    this.camera.takePicture();
  }

  public showInfo(): void {
    console.log(`Battery: ${this.battery.getCapacity()}mAh`);
  }
}

// Usage - Building a phone from parts
console.log("--- Building Phone from Parts ---");

const battery = new Battery(5000);
const screen = new Screen(6.5);
const camera = new Camera(48);

const iPhone = new Phone("iPhone", battery, screen, camera);
iPhone.turnOn();
iPhone.takePhoto();
iPhone.showInfo();

// Easy to swap parts!
console.log("\n--- Using Different Parts ---");

const bigBattery = new Battery(8000);
const bigScreen = new Screen(7.2);
const proCam = new Camera(108);

const samsung = new Phone("Samsung", bigBattery, bigScreen, proCam);
samsung.turnOn();
samsung.takePhoto();
samsung.showInfo();

// Real-world example: Computer
console.log("\n--- Another Example: Computer ---");

class Processor {
  constructor(private cores: number) {}

  public process(): void {
    console.log(`💻 Processing with ${this.cores} cores`);
  }
}

class Memory {
  constructor(private sizeGB: number) {}

  public load(): void {
    console.log(`🧠 Loading into ${this.sizeGB}GB RAM`);
  }
}

class Storage {
  constructor(private sizeGB: number) {}

  public save(file: string): void {
    console.log(`💾 Saving ${file} to ${this.sizeGB}GB storage`);
  }
}

// Computer HAS-A processor, memory, and storage
class Computer {
  constructor(
    private processor: Processor,
    private memory: Memory,
    private storage: Storage
  ) {}

  public run(program: string): void {
    console.log(`\n💻 Running ${program}...`);
    this.processor.process();
    this.memory.load();
    this.storage.save(program);
  }
}

const myComputer = new Computer(
  new Processor(8),
  new Memory(16),
  new Storage(512)
);
myComputer.run("Photoshop");

const gamingPC = new Computer(
  new Processor(16),
  new Memory(32),
  new Storage(2000)
);
gamingPC.run("Cyberpunk 2077");
