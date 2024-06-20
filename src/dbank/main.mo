import Time "mo:base/Time";
import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor DBank {
  stable var currentValue : Float = 300;
  currentValue := 0;
  Debug.print(debug_show (currentValue)); // Initial balance
  let id = 234567; // Constant ID
  stable var startTime = Time.now(); // Start time for interest calculation
  startTime := Time.now();
  Debug.print(debug_show (startTime));
  public func topup(amount : Float) {
    currentValue += amount;
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = (currentValue - amount);
    if (tempValue >= 0) {
      currentValue -= amount;
    };
  };

  public query func checkbalance() : async Float {
    return currentValue;
  };

  public func compoundInterest() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };
};
