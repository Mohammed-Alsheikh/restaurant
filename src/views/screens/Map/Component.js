/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {Appbar, Menu, Divider, Switch, Button} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import permision from './permision';
import Colors from '../../styles';
import isEqual from 'lodash/isEqual';
import useMenu from './useMenu';
import {checkDriver, updateLocation} from './actions';
import {SwitchActions} from 'react-navigation';
import Modal from './Modal';
import Chat from './Chat';

const API_KEY = 'AIzaSyAYHscykLHsALDzKuDDoYV-SjME_8YHHqI';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};
const ANCHOR = {x: 0.5, y: 0.5};
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 32.551445;
const LONGITUDE = 35.851479;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const timeout = s => {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
};

export default ({
  navigation,
  user,
  logout,
  request,
  Request,
  ClearRequest,
  setAcceptedStatus,
  chatz,
  setChatz,
  clearChat,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [source, setSource] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [chat, setChat] = useState(false);

  const [dist, setDist] = useState(null);

  useEffect(() => {
    (async () => {
      if (request) {
        setSource({
          latitude: request.data.source.latitude,
          longitude: request.data.source.longitude,
        });
        setDist({
          latitude: request.data.dist.latitude,
          longitude: request.data.dist.longitude,
        });
        setCoordinate({
          latitude: request.data.source.latitude,
          longitude: request.data.source.longitude,
        });

        await timeout(28);
        ClearRequest();
        clearChat();
      } else {
        setSource(null);
        setDist(null);
        setAccepted(false);
      }
    })();
  }, [request]);

  const {onDismiss, onPress, visible} = useMenu();
  const marker = useRef(null);
  const [isSwitchOn, setIsSwitchOn] = useState(null);

  const [animatedCoordinate, setAnimatedCoordinate] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
  );
  const [coordinate, setCoordinate] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const getMapRegion = () => ({
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    permision();
    const watchID = (async () =>
      Geolocation.watchPosition(
        position => {
          const myLastPosition = coordinate;
          const myPosition = position.coords;

          if (!isEqual(myPosition, myLastPosition)) {
            setCoordinate(myPosition);
            setAnimatedCoordinate(
              new AnimatedRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }),
            );
            updateLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        },
        err => {},
        GEOLOCATION_OPTIONS,
      ))();

    return Geolocation.clearWatch(watchID);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        anchor={ANCHOR}
        heading={coordinate.heading}
        coordinate={coordinate}
        showsMyLocationButton={true}
        style={styles.map}
        region={getMapRegion()}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <MapView.Marker
          title={'My Location'}
          key={'coordinate_123345'}
          pinColor={'red'}
          coordinate={coordinate}
        />
        {source && (
          <MapView.Marker
            title={'source'}
            key={'coordinate_123'}
            pinColor={'tomato'}
            coordinate={source}
          />
        )}
        {dist && (
          <MapView.Marker
            title={'destination'}
            key={'coordinate_321'}
            pinColor={'green'}
            coordinate={dist}
          />
        )}
        {source && dist && (
          <MapViewDirections
            origin={source}
            destination={dist}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor={Colors.primary}
          />
        )}
      </MapView>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <Appbar.Content title="Home (Driver) " />
        <Switch
          value={isSwitchOn}
          color={'pink'}
          onValueChange={() => {
            checkDriver(!isSwitchOn, coordinate, Request);
            setIsSwitchOn(!isSwitchOn);
          }}
        />
        <Menu
          visible={visible}
          onDismiss={onDismiss}
          anchor={<Appbar.Action icon="apps" onPress={onPress} color="#fff" />}>
          <Menu.Item onPress={onDismiss} title="Settings" />
          <Divider />
          <Menu.Item onPress={onDismiss} title="History" />
          <Divider />
          <Menu.Item onPress={onDismiss} title="FeedBack" />
          <Divider />
          <Menu.Item
            onPress={() =>
              logout() &&
              navigation.dispatch(SwitchActions.jumpTo({routeName: 'Auth'}))
            }
            title="Logout"
          />
          <Divider />
        </Menu>
      </Appbar.Header>
      {accepted && (
        <Button
          style={{
            zIndex: 22,
            position: 'absolute',
            bottom: 68,
            left: screen.width / 2 - 80,
            width: 160,
          }}
          mode="contained"
          onPress={() => setChat(true)}>
          {'Chat'}
        </Button>
      )}
      {request && (
        <Button
          style={{
            zIndex: 22,
            position: 'absolute',
            bottom: 20,
            left: screen.width / 2 - 125,
            width: 250,
          }}
          icon="send"
          mode="contained"
          onPress={() => setVisibleModal(true)}>
          {'See Details'}
        </Button>
      )}
      <Modal
        visible={visibleModal}
        setVisible={setVisibleModal}
        obj={request}
        ClearRequest={ClearRequest}
        clearChat={clearChat}
        setAccepted={setAccepted}
        accepted={accepted}
        setAcceptedStatus={setAcceptedStatus}
      />
      {request && (
        <Chat
          dilverayRequest={request}
          visible={chat}
          setVisible={setChat}
          chat={chatz}
          setChat={setChatz}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 200,
    backgroundColor: 'transparent',
  },
});
