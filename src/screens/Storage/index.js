import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import PhotoEditor from '@baronha/react-native-photo-editor';
import PhotoEditor from 'react-native-photo-editor';
import RNFS from 'react-native-fs';

const PhotoUploader = () => {
  const [camIamge, setCamImage] = useState(null);
  const [galleryImg, setGalleryImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [urlImg, setUrlImg] = useState(null);
  const [edited, setEdited] = useState(null);
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

  const uploadImg = async image => {
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = image.slice(image.lastIndexOf('/') + 1);
    let reference = storage().ref(fileName);
    const task = await reference.put(blob);
    let url = await reference.getDownloadURL();
    console.log('URL', url);
    setUrlImg(url);
    try {
      task;
    } catch (er) {
      Alert.alert(`Error occured ${err.message}`);
    }
    setUploading(false);
    Alert.alert('Image Uploaded Successfully');
    setCamImage(null);
    setGalleryImg(null);
    setEdited(null);
  };

  const noImgToUpload = () => {
    Alert.alert('Select Image for Uploading ..!');
  };

  const noImgToEdit = () => {
    Alert.alert('Select Image for Editing ..!');
  };

  // const EditPhoto = async () => {
  //   console.log('Edit');
  //   try {
  //     const result = await PhotoEditor.open({
  //       path: galleryImg || camIamge,
  //     });
  //     setEdited(result);
  //     console.log('result', result);
  //   } catch (er) {
  //     Alert.alert(er.message);
  //     console.log(er.message);
  //   }
  // };

  const EditPhoto = () => {
    try {
      const result = PhotoEditor.Edit({
        path: '../../assets/profile.png',
        // colors: undefined,
        onCancel: () => {
          console.log('Canceled');
        },
        onDone: () => {
          console.log('Done');
        },
      });
      // setEdited(result);
      console.log('result', result);
    } catch (er) {
      console.log(er.message);
    }
  };

  useEffect(() => {
    let photoPath = !camIamge ? RNFS.DocumentDirectoryPath : camIamge;
    console.log('photoPath', photoPath);
    if (camIamge) {
      let binaryFile = Image.resolveAssetSource({uri: camIamge});
      console.log('binaryFile', binaryFile);
    }
  }, [camIamge]);

  return (
    <>
      {uploading ? (
        <ActivityIndicator size="large" />
      ) : (
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
              edited
                ? () => uploadImg(edited)
                : galleryImg
                ? () => uploadImg(galleryImg)
                : camIamge
                ? () => uploadImg(camIamge)
                : noImgToUpload
            }>
            <Text style={styles().sendBtnText}>Uplaod</Text>
          </TouchableOpacity>
          <View style={styles().uploadWrapper}>
            <Text style={styles().uploadedText}>
              Image From Firebase Storage
            </Text>
            <Image
              source={{uri: urlImg}}
              resizeMode="cover"
              style={styles().imgStyles}
            />
          </View>

          <TouchableOpacity
            style={styles().sendBtnStyle}
            onPress={galleryImg || camIamge ? EditPhoto : noImgToEdit}>
            <Text style={styles().sendBtnText}>Edit</Text>
          </TouchableOpacity>
          <View style={styles().uploadWrapper}>
            <Text style={styles().uploadedText}>Edited image</Text>
            <Image
              source={{uri: edited}}
              resizeMode="cover"
              style={styles().imgStyles}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default PhotoUploader;
