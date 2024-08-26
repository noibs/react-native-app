import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
      >
        <ImageBackground
          source={{ uri: item.thumbnail }}
          className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black-40"
          resizeMode="cover"
        />

        {play && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPlay(false)}
            className="w-full h-60 absolute rounded-xl mt-3 justify-center items-center"
          >
            <View
              className="items-center justify-center bg-black-100 p-1"
              style={{ backgroundColor: "rgba(30, 30, 45, 0.8)" }}
            >
              <Text className="text-white">{item.prompt}</Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
    />
  );
};

export default Trending;
