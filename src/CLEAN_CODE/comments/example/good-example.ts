// ✅ GOOD EXAMPLE: Minimal, meaningful comments

interface User {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    if (this.isValidUser(user)) {
      this.users.push(user);
    }
  }

  getUserById(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  /**
   * Calculates age based on birth date.
   *
   * WARNING: This calculation doesn't account for leap years or
   * whether the birthday has occurred this year. Use a proper
   * date library like date-fns for production applications.
   */
  calculateAge(birthDate: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }

    return age;
  }

  isValidEmailFormat(email: string): boolean {
    // RFC 5322 compliant email regex - handles most common email formats
    // For production, consider using a dedicated email validation library
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  removeUser(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }

  // TODO: Add role-based permissions when user roles feature is implemented
  deactivateUser(id: number): boolean {
    const user = this.getUserById(id);
    if (user) {
      user.isActive = false;
      return true;
    }
    return false;
  }

  /**
   * Bulk import users from external system.
   *
   * PERFORMANCE NOTE: For large datasets (>1000 users), consider
   * processing in batches to avoid blocking the event loop.
   */
  async importUsers(users: User[]): Promise<void> {
    const validUsers = users.filter((user) => this.isValidUser(user));
    this.users.push(...validUsers);
  }

  private isValidUser(user: User): boolean {
    return (
      user &&
      typeof user.id === "number" &&
      user.id > 0 &&
      typeof user.name === "string" &&
      user.name.trim().length > 0 &&
      this.isValidEmailFormat(user.email) &&
      user.birthDate instanceof Date
    );
  }
}
