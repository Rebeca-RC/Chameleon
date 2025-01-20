import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { Button } from '@/components/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store data persistently

const data = [
  {
    title: 'PRESALE',
    description: 'LAUNCHING SOON!',
  },
];

const Updates = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Will store remaining time in seconds
  const [isTimerOver, setIsTimerOver] = useState(false);

  // Set the target date (e.g., 5 days from now or a specific date)
  const targetDate = new Date('2025-01-20T17:40:00').getTime(); // January 22, 2025, 9:30 PM

  // Effect hook to set the time when the user first opens the app
  useEffect(() => {
    const setStartTime = async () => {
      const startDate = await AsyncStorage.getItem('startDate');
      if (!startDate) {
        // Store the current date/time when the user first uses the app
        await AsyncStorage.setItem('startDate', new Date().toString());
      }
    };
    
    setStartTime();

    const updateTimeLeft = () => {
      const currentTime = new Date().getTime(); // Current time in milliseconds
      const timeRemaining = targetDate - currentTime; // Time difference in milliseconds

      if (timeRemaining <= 0) {
        setIsTimerOver(true); // Mark timer as over when it reaches 0
      } else {
        setTimeLeft(timeRemaining / 1000); // Set the time remaining in seconds
      }
    };

    const timer = setInterval(updateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [targetDate]);

  // Convert seconds to DD:HH:MM:SS format
  const formatTime = () => {
    const days = Math.floor(timeLeft / (3600 * 24)); // Calculate days
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600); // Calculate hours
    const minutes = Math.floor((timeLeft % 3600) / 60); // Calculate minutes
    const seconds = timeLeft % 60; // Calculate seconds

    return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-[#0C0E12]">
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        {data.map((item, index) => (
          <View key={index} className="bg-[#0C0E12] mb-6 p-4 w-full">
            {/* SVG Background with Gradient */}
            <Svg height="150" width="100%">
              <Defs>
                <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#13e1bc" stopOpacity="1" />
                  <Stop offset="0.25" stopColor="#23de2b" stopOpacity="1" />
                  <Stop offset="0.5" stopColor="#1ddf61" stopOpacity="1" />
                  <Stop offset="0.75" stopColor="#23de2b" stopOpacity="1" />
                </SvgLinearGradient>
              </Defs>
              <Rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#grad)"
                rx="15" // Border radius for the background
                ry="15"
              />
            </Svg>

            {/* Card Content (Left side: Text, Description, Timer, or Button) */}
            <View className="absolute flex-row w-full h-full items-center justify-between px-6 gap-3 ">
              {!isTimerOver ? (
                // Show the timer while countdown is active
                <View className="flex-1 pl-4 gap-2 ">
                  <Text className="text-black text-4xl font-bold font-poppins">{item.title}</Text>
                  <Text className="text-black text-xl font-poppins">{item.description}</Text>
                  <Text className="text-black text-lg font-bold mt-2">Countdown: {formatTime()}</Text>
                </View>
              ) : (
                // Show the "Buy Now" button and update description when the timer is over
                <View className="flex-1 pl-4 gap-2">
                  <Text className="text-black text-4xl font-bold font-poppins">{item.title}</Text>
                  <Text className="text-black text-xl font-poppins">PRESALE IS LIVE!</Text>
                  <Button
                    className="mt-4 w-32 h-8 bg-none bg-transparent border-2 border-black rounded-full data-[active=true]:bg-transparent"
                    onPress={() => Linking.openURL('https://tinyurl.com/chmlPresale')}
                  >
                    <Text className="color-black font-bold">Buy Now</Text>
                  </Button>
                </View>
              )}

              {/* Right side: Image */}
              <Image
                source={require('/assets/images/Logo_black.png')} // Using dynamic image source from the input array
                className="w-32 h-32 rounded-full"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Updates;
