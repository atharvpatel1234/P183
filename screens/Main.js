import React from 'react';
import { StyleSheet,Button,Text,View,Platform,SafeAreaView,Image,ScrollView,TouchableOpacity } from 'react-native';

import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as FaceDetector from 'expo-face-detector';
import { StatusBar } from 'expo-status-bar';

import Filter1 from '../component/Filter1';
import Filter2 from '../component/Filter2';
import Filter3 from '../component/Filter3';
import Filter4 from '../component/Filter4';


var data=[
    {
        "id":"imageFilter1",
        "image":require("../assets/Devil.png")
    },

    {
        "id":"imageFilter2",
        "image":require("../assets/crown-pic1.png")
    },

    {
        "id":"imageFilter3",
        "image":require("../assets/crown-pic2.png")
    },

    {
        "id":"imageFilter4",
        "image":require("../assets/crown-pic3.png")
    },



]

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission:null,
            faces:[],
            current_filter:"imageFilter1",
        }
        
    }
    async componentDidMount(){
        const {status}=await Camera.requestCameraPermissionsAsync();
        this.setState({hasCameraPermission:status==="granted"})

    }

    onFacesDetected({faces}){
        this.setState({faces:faces})
    }

render(){
    const {hasCameraPermission}=this.state
        if(hasCameraPermission===null){
            return <View/>
        }
    
        if(hasCameraPermission===false){
            return(
                <View style={styles.container}>
                    <Text>No Access To Camera</Text>
                </View>
            )
        }
    
        
        return(
            <View style={styles.UpperContainer}>
                <SafeAreaView style={styles.droidSafeArea}/>
            <View>
                <Text>Look Me...</Text>
            </View>
           
                <View style={styles.middleContainer}>
                 <Camera
                    style={{
                        flex:1,
                    }}
                    type={Camera.Constants.Type.front}
                    faceDetectorSettings={{
                        mode:FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks:FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications:FaceDetector.FaceDetectorClassifications.all,
                    }}
                    onFacesDetected={this.onFacesDetected}
                    onFacesDetectionError={this.onFacesDetectionError}
                    />   
                        {
                         this.state.faces.map(face => {
                            if (this.state.current_filter === "imageFilter1") {
                                return <Filter1 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "imageFilter2") {
                                return <Filter2 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "imageFilter3") {
                                return <Filter3 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "imageFilter4") {
                                return <Filter4 key={face.faceID} face={face} />
                            }
                            })
                        } 
                </View>

                <View style={styles.lowerContainer}>
                  <ScrollView style={{ flexDirection: "row" }} horizontal showsHorizontalScrollIndicator={false}>
                        {
                            data.map(filter_data => {
                                return (
                                    <TouchableOpacity style={styles.filterContainer} onPress={() => this.setState({ current_filter: `filter_${filter_data.id}` })}>
                                        <Image source={filter_data.image} style={{ height: 32, width: 80 }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>

              </View>
        )
    }    


}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    middleContainer: {
        flex: 0.65
    },
    framesContainer: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#FFFFFF"
    },
    filterContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4e7f8",
        borderRadius: 30,
        marginRight: 20
    }
  });