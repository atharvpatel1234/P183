import React from "react";
import {Image,View} from 'react-native';

const Filter1=({
    face:{
        bounds:{
            size:{width:faceWidth,height:faceHeight}
        },
        leftEyePosition,
        rightEyePosition,
        noseBasePosition
    }
})=>{
    const glassesWidth = faceWidth
    const glassesHeight = faceHeight / 3
    const transformAngle = (
        angleRad = Math.atan(
            (5000 - 200) /
            (5000 - 200)
        )
    ) => angleRad * 20 / Math.PI
    return (
        <View style={{
            position: 'absolute',
            left: 200 - glassesWidth * 0.675,
            top: 200- glassesHeight * 0.5
        }}>
            <Image
                source={require('../assets/Devil.png')}
                style={{
                    width: glassesWidth,
                    height: glassesHeight,
                    resizeMode: 'contain',
                    transform: [{ rotate: `${transformAngle()}deg` }]
                }}
            />
        </View>
    );
}

export default Filter1