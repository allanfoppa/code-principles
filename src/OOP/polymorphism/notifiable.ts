// Contract defining the Notifiable behavior
interface Notifiable {
  send(message: string): void;
}

class EmailNotification implements Notifiable {
  constructor(private email: string) {}

  public send(message: string): void {
    console.log(`Sending email to ${this.email}: ${message}`);
    // Email sending logic...
  }
}

class SMSNotification implements Notifiable {
  constructor(private phoneNumber: string) {}

  public send(message: string): void {
    console.log(`Sending SMS to ${this.phoneNumber}: ${message}`);
    // SMS sending logic...
  }
}

class PushNotification implements Notifiable {
  constructor(private deviceId: string) {}

  public send(message: string): void {
    console.log(`Sending push to device ${this.deviceId}: ${message}`);
    // Push notification logic...
  }
}

class SlackNotification implements Notifiable {
  constructor(private channel: string) {}

  public send(message: string): void {
    console.log(`Posting to Slack #${this.channel}: ${message}`);
    // Slack API call...
  }
}

class NotificationService {
  private notifiers: Notifiable[] = [];

  public addNotifier(notifier: Notifiable): void {
    this.notifiers.push(notifier);
  }

  public notifyAll(message: string): void {
    this.notifiers.forEach((notifier) => {
      notifier.send(message); // Polymorphic call
    });
  }
}

const service = new NotificationService();
service.addNotifier(new EmailNotification("user@example.com"));
service.addNotifier(new SMSNotification("+1234567890"));
service.addNotifier(new PushNotification("device123"));
service.addNotifier(new SlackNotification("alerts"));

service.notifyAll("System maintenance in 10 minutes");
