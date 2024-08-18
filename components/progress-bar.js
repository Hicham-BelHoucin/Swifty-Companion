import { Text, View } from "react-native";

const ProgressBar = ({ level, coalition }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#e6e6e6",
          height: 20,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: coalition.color,
            height: "100%",
            width: `${(level % 1) * 100}%`,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            {level}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
