import React from 'react';
import { FlatList, ActivityIndicator, Text, View, ScrollView, RefreshControl, StyleSheet  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount(){
    return fetch('API_DE_TESTE_AQUI')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <ScrollView
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl 
          refreshing={this.props.refreshing}
          onRefresh={this._onRefresh.bind(this)} />
        }
      >
        <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  scrollview:{
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
