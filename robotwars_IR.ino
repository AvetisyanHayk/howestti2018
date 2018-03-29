#define trigPin 10
#define echoPin 9
#define IRlight 13 //already defined

void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  pinMode(IRlight, OUTPUT);
}

void loop() {
  long duration, distance;
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); 
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  if (distance < 2) {  // change 4 to max range of IR light
    digitalWrite(IRlight,HIGH);
    delay(10000);
    digitalWrite(IRlight, LOW);
  }
}
