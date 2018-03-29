int input4 = 8;
int enableB = 5;
int input3 = 2;
int input2 = 11;
int enableA = 6;
int input1 = 12;
int dir = 0;

int IRsensor = 3;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial1.begin(9600);

  pinMode(input1, OUTPUT);
  pinMode(input2, OUTPUT);
  pinMode(input3, OUTPUT);
  pinMode(input4, OUTPUT);
  pinMode(enableA, OUTPUT);
  pinMode(enableB, OUTPUT);
  
  digitalWrite(enableA, 1);
  digitalWrite(enableB, 1);

  attachInterrupt(IRsensor, getHit, RISING);
}

int i = 0;

void loop() {
  // put your main code here, to run repeatedly:
  goBack();
  delay(1000);
  goStraight();
  delay(1000);
  goLeft();
  delay(1000);
  goRight();
  delay(1000);
  /*
  if (Serial1.available()) {
    int inByte = Serial1.read();
    //Serial1.write(inByte);
    Serial.write(inByte);
    switch(inByte){
      case '0':
      goStraight();
      Serial.write("straight");
      break;
      case '1':
      goBack();
      Serial.write("back");
      break;
      case '2':
      goLeft();
      Serial.write("left");
      break;
      case '3':
      goRight();
      Serial.write("right");
      break;
      case '4':
      stopMoving();
      Serial.write("stop");
      break;
    }
  }

  // read from port 0, send to port 1:
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial1.write(inByte);
  }
  */
}

void goStraight(){
  digitalWrite(input1, HIGH);
  digitalWrite(input2, LOW);

  digitalWrite(input3, LOW);
  digitalWrite(input4, HIGH);
}

void goBack(){
  digitalWrite(input1,LOW);
  digitalWrite(input2,HIGH);

  digitalWrite(input3, HIGH);
  digitalWrite(input4, LOW);
}

void goRight(){
  digitalWrite(input1, LOW);
  digitalWrite(input2, HIGH);

  digitalWrite(input3, LOW);
  digitalWrite(input4, HIGH);
}

void goLeft(){
  digitalWrite(input1, HIGH);
  digitalWrite(input2, LOW);

  digitalWrite(input3, HIGH);
  digitalWrite(input4, LOW);
}

void stopMoving(){
  digitalWrite(input1, LOW);
  digitalWrite(input2, LOW);
  digitalWrite(input3, LOW);
  digitalWrite(input4, LOW);
}

void getHit(){
  Serial.write("bla");
}

