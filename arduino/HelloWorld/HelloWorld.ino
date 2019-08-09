
// include the library code:
#include <LiquidCrystal.h>
#include <ros.h>
#include <std_msgs/String.h>

ros::NodeHandle  nh;
std_msgs::String str_msg;

LiquidCrystal lcd(8,9,4,5,6,7); 


void display_text( const std_msgs::String& display_msg){
  lcd.clear();
  lcd.print(display_msg.data);
}

ros::Subscriber<std_msgs::String> sub("display_text", &display_text );

void setup() {
  Serial.begin(9600);
  nh.getHardware()->setBaud(9600);
  nh.initNode();
  nh.subscribe(sub);
  delay(1000);
  lcd.begin(16, 2);
  lcd.print("hello, world!");
}

void loop() {
  nh.spinOnce();
  delay(1);
}
