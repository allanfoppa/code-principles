// BAD EXAMPLE: Excessive abbreviations make code hard to understand

interface Usr {
  id: string;
  nm: string;
  eml: string;
  addr: string;
}

interface Ord {
  id: string;
  usrId: string;
  itms: Itm[];
  dt: Date;
}

interface Itm {
  id: string;
  nm: string;
  prc: number;
  qty: number;
}

export class BadOrdMgr {
  private ords: Ord[] = [];
  private usrs: Usr[] = [];

  constructor() {
    console.log("BAD: Using abbreviations everywhere...\n");
  }

  addUsr(usr: Usr): void {
    this.usrs.push(usr);
    console.log(`  Added user: ${usr.nm} (${usr.eml})`);
  }

  crtOrd(usrId: string, itms: Itm[]): Ord {
    const ord: Ord = {
      id: `ORD-${this.ords.length + 1}`,
      usrId: usrId,
      itms: itms,
      dt: new Date(),
    };
    this.ords.push(ord);
    console.log(`  Created order: ${ord.id}`);
    return ord;
  }

  calcOrdTtl(ordId: string): number {
    const ord = this.ords.find((o) => o.id === ordId);
    if (!ord) return 0;

    const ttl = ord.itms.reduce((sum, itm) => sum + itm.prc * itm.qty, 0);
    console.log(`  Order ${ordId} total: $${ttl}`);
    return ttl;
  }

  getUsrOrds(usrId: string): Ord[] {
    const usrOrds = this.ords.filter((o) => o.usrId === usrId);
    console.log(`  Found ${usrOrds.length} orders for user ${usrId}`);
    return usrOrds;
  }

  prcOrd(ordId: string): void {
    const ord = this.ords.find((o) => o.id === ordId);
    if (!ord) {
      console.log(`  ✗ Order ${ordId} not found`);
      return;
    }

    const ttl = this.calcOrdTtl(ordId);
    console.log(`  ✓ Processing order ${ordId}: $${ttl}`);
  }
}

// Demo
const mgr = new BadOrdMgr();
mgr.addUsr({ id: "USR-1", nm: "John Doe", eml: "john@example.com", addr: "123 Main St" });
mgr.crtOrd("USR-1", [
  { id: "ITM-1", nm: "Laptop", prc: 1000, qty: 1 },
  { id: "ITM-2", nm: "Mouse", prc: 25, qty: 2 },
]);
mgr.prcOrd("ORD-1");
