// ❌ BAD EXAMPLE: Poor commenting practices

export class UserManager {
  // This variable stores the users
  private users: any[] = [];

  // Default constructor
  constructor() {
    // Initialize users array
    this.users = [];
  }

  // This method adds a user to the system
  addUser(user: any): void {
    // Check if user is valid
    if (user) {
      // Add user to array
      this.users.push(user);
    }
  }

  // Get user by id method
  getUser(id: number): any {
    // Loop through users array
    for (let i = 0; i < this.users.length; i++) {
      // Check if user id matches
      if (this.users[i].id === id) {
        // Return the user
        return this.users[i];
      }
    }
    // Return null if not found
    return null;
  }

  // Calculate user's age
  calculateAge(birthDate: Date): number {
    // Get current date
    const now = new Date();
    // Get birth year
    const birthYear = birthDate.getFullYear();
    // Get current year
    const currentYear = now.getFullYear();
    // Calculate age by subtracting birth year from current year
    // This might not be accurate for all cases
    const age = currentYear - birthYear;
    // Return age
    return age;
  }

  // Method to validate email
  validateEmail(email: string): boolean {
    // Check if email contains @
    if (email.indexOf("@") > -1) {
      // Check if email contains .
      if (email.indexOf(".") > -1) {
        // Email is valid
        return true;
      }
    }
    // Email is invalid
    return false;
  }

  // Remove user
  removeUser(id: number): boolean {
    // Create new array
    const newUsers = [];
    // Flag to track if user was found
    let found = false;

    // Loop through users
    for (let i = 0; i < this.users.length; i++) {
      // If id doesn't match, add to new array
      if (this.users[i].id !== id) {
        newUsers.push(this.users[i]);
      } else {
        // User found
        found = true;
      }
    }

    // Update users array
    this.users = newUsers;
    // Return whether user was found and removed
    return found;
  }
}
