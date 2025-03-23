import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { format, formatDistance } from 'date-fns';

const ActivityCard = ({ notification }) => {
  const { width } = useWindowDimensions();

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${format(date, 'h:mm a')}`;
    }

    const daysAgo = formatDistance(date, today, { addSuffix: false });
    return `${daysAgo}, ${format(date, 'h:mm a')}`;
  };

  return (
    <View className="mb-6 mt-1 flex flex-row gap-4">
      <Image className="w-14 h-14" source={{ uri: notification.image_url }} />

      <View className="flex flex-col pr-4">
        <RenderHtml
          contentWidth={width}
          source={{ html: notification.content }}
          tagsStyles={{
            strong: { color: 'white', fontWeight: 'bold' },
            p: { color: 'white', margin: 0 },
            br: { height: 10 },
            a: { color: '#5bc5a7', textDecorationLine: 'underline' }
          }}
          baseStyle={{ color: 'white' }}
          ignoredDomTags={['font']}
        />

        <Text className="text-gray-400 text-sm mt-1">
          {formatTimestamp(notification.created_at)}
        </Text>
      </View>
    </View>
  )
};

export default ActivityCard;
