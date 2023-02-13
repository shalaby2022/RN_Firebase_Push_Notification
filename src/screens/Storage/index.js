import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const PhotoUploader = () => {
  const [camIamge, setCamImage] = useState(null);
  const [galleryImg, setGalleryImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [urlImg, setUrlImg] = useState(null);
  let options = {
    saveToPhotos: true,
    cameraType: 'photo',
  };

  const openCamera = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const result = await launchCamera(options);
          if (result.didCancel) {
            console.log('User cancelled image picker');
          } else if (result.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (result.customButton) {
            console.log('User tapped custom button: ', result.customButton);
            Alert.alert(result.customButton);
          } else {
            setCamImage(result.assets[0].uri);
          }
        } else {
          console.warn('Not Granted', granted);
        }
      } catch (err) {
        console.log('Error', err.message);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const result = await launchCamera(options);
        if (result.errorCode) {
          console.warn('camera_unavailable');
        } else {
          setCamImage(result.assets[0].uri);
        }
      } catch (err) {
        console.log('Error', err.message);
      }
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
      } else if (result.customButton) {
        console.log('User tapped custom button: ', result.customButton);
        Alert.alert(result.customButton);
      } else {
        setGalleryImg(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  const UplaodGallery = async () => {
    setUploading(true);
    const response = await fetch(galleryImg);
    const blob = await response.blob();
    const fileName = galleryImg.slice(galleryImg.lastIndexOf('/') + 1);
    let reference = storage().ref(fileName);
    const task = await reference.put(blob);
    let url = await reference.getDownloadURL();
    setUrlImg(url);
    try {
      task;
    } catch (er) {
      console.log(`Error occured ${err.message}`);
    }
    setUploading(false);
    Alert.alert('Image Uploaded Successfully');
    setCamImage(null);
    setGalleryImg(null);
  };

  const UplaodCamera = async () => {
    setUploading(true);
    const response = await fetch(galleryImg);
    const blob = await response.blob();
    const fileName = camIamge.slice(camIamge.lastIndexOf('/') + 1);
    let reference = storage().ref(fileName);
    const task = await reference.put(blob);
    let url = await reference.getDownloadURL();
    setUrlImg(url);
    try {
      task;
    } catch (er) {
      console.log(`Error occured ${err.message}`);
    }
    setUploading(false);
    Alert.alert('Image Uploaded Successfully');
    setCamImage(null);
    setGalleryImg(null);
  };

  const noImgSelected = () => {
    Alert.alert('Select Image to Upload');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles().btnsWrapper}>
        <TouchableOpacity style={styles().btnStyle} onPress={openCamera}>
          <Text style={styles().btnText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles().btnStyle} onPress={openGallery}>
          <Text style={styles().btnText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles().btnsWrapper}>
        <Image
          source={{uri: camIamge}}
          resizeMode="cover"
          style={styles().imgStyles}
        />
        <Image
          source={{uri: galleryImg}}
          resizeMode="cover"
          style={styles().imgStyles}
        />
      </View>
      <TouchableOpacity
        style={styles().sendBtnStyle}
        onPress={
          camIamge ? UplaodCamera : galleryImg ? UplaodGallery : noImgSelected
        }>
        <Text style={styles().sendBtnText}>Uplaod</Text>
      </TouchableOpacity>
      <View style={styles().uploadWrapper}>
        <Text style={styles().uploadedText}>Image From Firebase Storage</Text>
        <Image
          source={{uri: urlImg}}
          resizeMode="cover"
          style={styles().imgStyles}
        />
      </View>
    </View>
  );
};

export default PhotoUploader;
