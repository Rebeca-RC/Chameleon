import React from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity,Linking } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Button } from '@/components/ui/button';



const data = [
  {
    title: 'PRESALE',
    description: 'LAUNCHING SOON!',
    
  },
  
];
const Updates = () => {
  return (  
    <View className=' flex-1 bg-[#0C0E12]'>
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      {data.map((item, index) => (
        <View key={index} className="bg-[#0C0E12] mb-6 p-4 w-full " >
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

          {/* Card Content (Left side: Text, Right side: Image) */}
          <View className="absolute flex-row w-full h-full items-center justify-between px-6 gap-3">
            {/* Left side: Title and Description */}
            <View className="flex-1 pl-4 gap-2">
              <Text className="text-black text-4xl font-bold font-poppins">{item.title}</Text>
              <Text className="text-black text-xl font-poppins">{item.description}</Text>
             
              {/* <Button className="mt-4 w-32 h-8 bg-none bg-transparent border-2 border-white rounded-full data-[active=true]:bg-transparent"
              onPress={() => Linking.openURL('https://www.pinksale.finance/')}>
                <Text className='color-white font-bold '>Buy Now</Text></Button> */}
            </View>

            {/* Right side: Image */}
            <Image
             source={require('/assets/images/Logo_black.png')}// Using dynamic image source from the input array
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
