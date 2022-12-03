#define BLYNK_TEMPLATE_ID "TMPLbjnlYTqJ"
#define BLYNK_DEVICE_NAME "Hydroponic Farming"
#define BLYNK_AUTH_TOKEN "uZTfMu0KntRSbNw6ZAxRz3yV1ycbzroo"

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#include "DHT.h"
#define BLYNK_PRINT Serial


char auth[] = BLYNK_AUTH_TOKEN;

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "1819";
char pass[] = "Acheivers@1819";



#define DHT11PIN 2
#define DHTTYPE DHT11
#define DS18B20PIN 16

//#define LED2 21
//#define LED3 19
//#define LED4 8
//#define LED5 9
#define LED1 26

DHT dht(DHT11PIN, DHTTYPE);
OneWire oneWire(DS18B20PIN);

DallasTemperature sensor(&oneWire);



#define TRIG_PIN 23 // ESP32 pin GIOP23 connected to Ultrasonic Sensor's TRIG pin
#define ECHO_PIN 22 // ESP32 pin GIOP22 connected to Ultrasonic Sensor's ECHO pin

float duration_us, distance_cm;

int airQ = 33;
const int potPin=35;
float ph;
float Value=0;
int fan = 14;
int pump = 12;
int inlet_pump= 21;

BlynkTimer timer;

void setup()
{ 

  Serial.begin(115200);
  Blynk.begin(auth, ssid, pass);
  dht.begin();
  timer.setInterval(1000L, DHT11Sensor);
  timer.setInterval(1000L, airQsensor);
   timer.setInterval(1000L, ds18b);
    timer.setInterval(1000L, ultrasonic);
     timer.setInterval(1000L, ph_sensor); 
  sensor.begin();

    // configure the trigger pin to output mode
  pinMode(TRIG_PIN, OUTPUT);
  // configure the echo pin to input mode
  pinMode(ECHO_PIN, INPUT);
  pinMode(airQ, INPUT);
  pinMode(potPin,INPUT);
  pinMode(LED1, OUTPUT);
  //pinMode(LED1, HIGH);
  pinMode(fan,OUTPUT);
  pinMode(pump,OUTPUT);
// pinMode(LED2, OUTPUT);
//  pinMode(LED3, OUTPUT);
//  pinMode(LED4, OUTPUT);
//  pinMode(LED5, OUTPUT);

  pinMode(inlet_pump, OUTPUT);
  //digitalWrite(inlet_pump, HIGH);
}

void DHT11Sensor()
{
  float h = dht.readHumidity();
  float t = dht.readTemperature(); // or dht.readTemperature(true) for Fahrenheit

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  Blynk.virtualWrite(V0, t);
  Blynk.virtualWrite(V1, h);
  if (h>80){
    Blynk.logEvent("humidity_alert","Humidity Level Increased");
       digitalWrite(fan,LOW);
  delay(5000);
    digitalWrite(fan,HIGH);  
  }
  else
  {
        digitalWrite(fan,HIGH);
  }
  }
  
  
  // MQ135 sensor
void airQsensor()
{
   int airQuality = analogRead(airQ);
   Serial.print(airQuality);
   Blynk.virtualWrite(V2, airQuality);
     if (airQuality>3500){
   Serial.println("Fire! Fire!");
   Blynk.logEvent("fire_alert","Fire! Fire!");
   
   digitalWrite(fan,LOW);
    delay(5000);
    digitalWrite(fan,HIGH);  
  }
  else
  {
        digitalWrite(fan,HIGH);
  }
  }

void ds18b()
{
  sensor.requestTemperatures(); 
  float tempinC = sensor.getTempCByIndex(0);
  Serial.print(tempinC);
  Blynk.virtualWrite(V3, tempinC);
  if (tempinC >35 || tempinC < 2){
    Blynk.logEvent("water_temp_alert","Water Temperature Bounds exceeded");
  }
}


// Water Level
void ultrasonic() {
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  // measure duration of pulse from ECHO pin
  duration_us = pulseIn(ECHO_PIN, HIGH);
  // calculate the distance
  distance_cm = 0.017 * duration_us;

  // print the value to Serial Monitor
  Serial.print("distance: ");
  Serial.print(distance_cm);
  Serial.println(" cm");
  Blynk.virtualWrite(V4, distance_cm);
  delay(100);
  if (distance_cm > 20){
    Blynk.logEvent("water_level_alert","Water level Low");
    digitalWrite(pump,LOW);
  delay(5000);
    digitalWrite(pump,HIGH);  
  }
  else
  {
        digitalWrite(pump,HIGH);
  }

}


// Ph Sensor
void ph_sensor(){
   

    int PH= analogRead(potPin);
    Serial.print(PH);
    Serial.print(" | ");
    float voltage=PH*(3.3/4095.0);
    ph=(3.3*voltage);
    Serial.println(ph);
    Blynk.virtualWrite(V5, ph);
    delay(500);
    if( ph>7.5 || ph<5.5){
      Blynk.logEvent("ph_alert","pH value out of bounds");
    }
  
}

// LED's 
BLYNK_WRITE(V7) {
  bool Relay = param.asInt();
  if (Relay == 1) {
    digitalWrite(LED1, LOW);
  } else {
    digitalWrite(LED1, HIGH);
  }
}

//intlet pump
BLYNK_WRITE(V6) {
  bool Relay2 = param.asInt();
  if (Relay2 == 1) {
    digitalWrite(inlet_pump, LOW);
  } else {
    digitalWrite(inlet_pump, HIGH);
  }
}


void loop()
{
  
    Blynk.run();//Run the Blynk library
    timer.run();//Run the Blynk timer
    DHT11Sensor();
    airQsensor();
    ds18b();
    ultrasonic();
    ph_sensor(); 

}
