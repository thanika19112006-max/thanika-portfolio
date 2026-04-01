import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      message1.name.compare(message2.name);
    };
  };

  var messages : [ContactMessage] = [];

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = { name; email; message };
    messages := messages.concat([newMessage]);
  };

  public query func getAllContactMessages() : async [ContactMessage] {
    messages.sort();
  };
};
