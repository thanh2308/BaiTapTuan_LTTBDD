abstract class Appliance {
    abstract turnOn(): void;
}
class Fan extends Appliance {
    override turnOn(): void {
        console.log("Quạt đang quay");
    }
}
class AirConditioner extends Appliance {
    override turnOn(): void {
        console.log("Máy lạnh đang hoạt động");
    }
}
const fan = new Fan();
const airConditioner = new AirConditioner();
fan.turnOn();
airConditioner.turnOn();
