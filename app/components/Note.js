import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';


export default class Note extends React.Component {
  render() {
    return (
      <View style={styles.note}>
      
        <Text style={styles.noteText}>{this.props.valDate}</Text>
        <Text style={styles.noteText}>{this.props.valNote}</Text>


        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>

        <Text style={styles.noteDeleteText}>
        -
        </Text>

        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  note:{
    position:"relative",
    padding:20,
    paddingRight:100,
    borderBottomWidth:2,
    borderBottomColor:"#effded",
  },
  noteText:{
    paddingLeft:20,
    borderLeftWidth:10,
    borderLeftColor:"#E98B63",
  },
  noteDelete:{
    position:"absolute",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#9983b9",
    padding:10,
    bottom:10,
    right:10,

  },
  noteDeleteText:{
    color:"white",
  }
});
