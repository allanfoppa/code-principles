// ✅ GOOD EXAMPLE: Meaningful and descriptive names

class UserMessageProcessor {
  private totalMessageCount: number;
  private incomingMessages: string[];
  private filteredMessages: string[];

  constructor() {
    this.totalMessageCount = 0;
    this.incomingMessages = [];
    this.filteredMessages = [];
  }

  addMessage(messageContent: string): void {
    this.incomingMessages.push(messageContent);
    this.totalMessageCount++;
  }

  getIncomingMessages(): string[] {
    return [...this.incomingMessages];
  }

  calculateTotalCharacterCount(): number {
    let totalCharacters = 0;
    for (const message of this.incomingMessages) {
      totalCharacters += message.length;
    }
    return totalCharacters;
  }

  filterMessagesByLength(shouldFilterShortMessages: boolean): void {
    const minimumMessageLength = 3;

    if (shouldFilterShortMessages) {
      this.filteredMessages = this.incomingMessages.filter(
        (message) => message.length > minimumMessageLength
      );
    } else {
      this.filteredMessages = [...this.incomingMessages];
    }
  }

  getFilteredMessages(): string[] {
    return [...this.filteredMessages];
  }

  getMessageCount(): number {
    return this.totalMessageCount;
  }
}

// Usage example - crystal clear what's happening
const messageProcessor = new UserMessageProcessor();
messageProcessor.addMessage("hello");
messageProcessor.addMessage("world");
messageProcessor.addMessage("hi");
messageProcessor.filterMessagesByLength(true); // Filter out short messages
const totalCharacters = messageProcessor.calculateTotalCharacterCount();
const longMessages = messageProcessor.getFilteredMessages();

console.log(`Total characters: ${totalCharacters}`);
console.log(`Long messages: ${longMessages.join(", ")}`);
