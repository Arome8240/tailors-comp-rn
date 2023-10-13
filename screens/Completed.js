import { View, Text, SafeAreaView, TextInput, Modal, RefreshControl, TouchableOpacity, BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Colors from '../constants/Colors'
import axios from 'axios'
import moment from 'moment'
import Dialog from 'react-native-dialog'

//Realm Database
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {

  const [task, setTask] = useState()
  const [liz, setLiz] = useState([])
  const [openModel, setModal] = useState(false)

  const [searchFocus, setSearchFocus] = useState(false)
  const [search, setSearch] = useState('')

  const [isPend, setPend] = useState(true)
  const [toks, setToks] = useState()

  const getToks = async () => {
    const token = await AsyncStorage.getItem('token')
    setToks(token)
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(res => {
      setRefreshing(false)
    })
  }, []);

  let url = Colors.url

  //Get Measurements
  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'token': token.slice(1, -1)
      }
    }
    await axios.get(url + 'post/', headers).then(resp => {
      //console.log(resp.data.posts)
      let filt = resp.data.posts
      setLiz(filt.filter(t => {
        return t.completed === true
      }))
    }).catch(err => {

    })
  }

  useFocusEffect(
    React.useCallback(() => {
      getToks()
      getData()
      
  
      /*const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      )*/
    }, [])
  )

  const [dia, setDia] = useState(false)
  const [id, setId] = useState('')

  const cancelDia = () => {
    setDia(false)
  }

  const openDia = async (_id) => {
    await setId(_id)
    //console.log(id)
    setDia(true)
  }

  const confirmDia = async () => {
    const token = await AsyncStorage.getItem('token')
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'token': token.slice(1, -1)
      }
    }
    await axios.delete(url + `post/${id}`, headers).then(resp => {
      setLiz(liz.filter(t => {
        return t._id !== id
      }))
      setDia(false)
      setId('')
    })
  }

  let setComp = async (_id) => {
    console.log(_id)
    const token = await AsyncStorage.getItem('token')
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'token': token.slice(1, -1)
      }
    }
    let data = {
      id: _id,
      completed: false
    }
    await axios.put(url + `post/completed/${_id}`, data, headers).then(resp => {
      setLiz(liz.filter(t => {
        return t._id !== _id
      }))
    })
  }

  return (
    <View>

      <SafeAreaView
        style={{
          backgroundColor: 'white',
          height: '100%'
        }}
      >

        {/*Search Field*/}
        <View
          style={{
            flexDirection: 'row',
            padding: 10
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              padding: 5,
              flex: 1
            }}
          ><TextInput
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              placeholder='Search'
              style={[
                {
                  backgroundColor: 'transparent',
                  padding: 15,
                  paddingLeft: 30,
                  color: 'black',
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  borderRadius: 10,
                  left: 5
                },
                searchFocus && { borderWidth: 1, borderColor: Colors.primary, color: 'grey' }
              ]}
              onChangeText={text => setSearch(text)}
              value={search}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 25, top: 25 }}
            >
              <Icon
                name="search"
                style={{
                  color: Colors.primary
                }}
                size={15}
                onPress={() => searchBtn()}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*Dialog*/}
        <View>
          <Dialog.Container visible={dia}>
            <Dialog.Title>Delete measurement</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete measurement?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={() => cancelDia()} />
            <Dialog.Button label="Delete" onPress={() => confirmDia()} />
          </Dialog.Container>
        </View>

        {/* List View */}
        <View style={{}}>
          <ScrollView
            style={{
              backgroundColor: '#F3F3F3',
              padding: 10,
              height: '100%'
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text
              style={{
                padding: 5,
                fontFamily: 'Poppins-Regular'
              }}
            >
              Completed
            </Text>
            {liz.filter((item) => {
              return search.toLowerCase === ''
                ? item
                : item.name.toLowerCase().includes(search.toLocaleLowerCase())
            }).map(({ name, deliveryDate, _id }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('view', {
                    name: name,
                    id: _id,
                  })
                }}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 10,
                  borderRadius: 10,
                  shadowColor: Colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.3,
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 20,
                      padding: 15,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setComp(_id)}
                    >
                      <Icon name='check-circle' size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        fontFamily: 'Poppins-Regular',
                        color: Colors.primary,
                        marginBottom: 8
                      }}
                    >
                      {name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 8
                        }}
                      >
                        <View
                          style={{
                            marginRight: 2,
                            color: Colors.primary
                          }}
                        >
                          <Icon name='clock' size={12} color={Colors.primary} />
                        </View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: Colors.primary,
                            fontFamily: 'Poppins-Regular',
                            marginLeft: 5
                          }}
                        >{moment(deliveryDate).endOf('day').fromNow()}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginLeft: 'auto',
                      padding: 10
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 10
                      }}
                      onPress={() => openDia(_id)}
                    >
                      <Icon name='trash' size={15} color='#FF5739' />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </SafeAreaView>

      {/* Add Button */}
      <KeyboardAvoidingView
        behavior='platform.OS === "ios" ? "padding" : "height"'
        style={{
          position: 'relative',
          bottom: 200,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: '100%',
              height: 70,
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >

            <TouchableOpacity
              style={{
                width: '33%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#3A88E2',
                width: 60,
                height: 60,
                borderRadius: 30,
                color: 'white',
                position: 'absolute',
                left: 150,
                bottom: 30,
              }}
              onPress={() => navigation.navigate('New')}
            >
              <Icon
                name='plus'
                size={15}
                style={{
                  color: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}