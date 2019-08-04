import * as React from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Constants } from 'expo';
import Note from './app/components/Note';

import firebase from 'firebase';

const FirebaseConfig = {

	  apiKey: "AIzaSyCyC38j04wHkyZ1AgGz0FKRvfQ6z1cu9T8",
	  authDomain: "todo-list-361be.firebaseapp.com",
	  databaseURL: "https://todo-list-361be.firebaseio.com",
	  projectId: "todo-list-361be",
	  storageBucket: "todo-list-361be.appspot.com",
	  messagingSenderId: "210901251879",
	  appId: "1:210901251879:web:64b88e1be6d1dc81"
};

firebase.initializeApp(FirebaseConfig);

export default class App extends React.Component {
  
	constructor(props) {
		super(props);
		this. state = {
	    	noteArray: [ ],
	    	noteText: '',
	  	};
	  	this.addNote = this.addNote.bind(this);

	}
	componentDidMount(){

	  firebase.database().ref().child("items").once("value", snapshot => {
	  		const data = snapshot.val();
	  		if (data) {
	  			const items = [];
	  			Object.keys(data).forEach(noteText => items.push(data[noteText]));
	  			this.setState({noteArray: items});
	  		}
	  });
	  firebase.database().ref().child("items").on("child_added", snapshot => {
	  		const data = snapshot.val();
	  		if (data) {
	  			this.setState(prevState => ({noteArray: [data, ...prevState.noteArray]}))
	  			console.log(this.state.noteArray);
	  		}
	  })

	}
  
	 addNote() {
	    if (!this.state.noteText) return;
	      var d = new Date();
	      const dataRef = firebase.database().ref().child("items").push();
	        dataRef.set({date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
	        note: this.state.noteText,
	      });
	      this.setState({ noteText: '' });
	    }
	  
	  deleteNote(key) {
	    this.state.noteArray.splice(key,1);
	    this.setState({noteArray: this.state.noteArray})
	  }

  render() {
    
    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
 		  val={val}
          deleteMethod={() => this.deleteNote(key)
          }
        />
      );
    });

    return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Checklist</Text>
        </View>
        
        <ScrollView style={styles.scrollview}>
        
        {notes}
        
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.addNote}
            style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            onChangeText={noteText => this.setState({ noteText })}
            value={this.state.noteText}
            placeholder=" Add tasks!"
            placeholderTextColor="#CD5C5C"
          />
        </View>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    //paddingTop: Constants.statusBarHeight,
    padding: 8,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#E91E63'
  },
  headerText: {
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollview: {
    flex: 1,
    backgroundColor:"#faebd7",
  },
  footer: {
    alignItems: 'center',
    left: 0,
    right: 0,
    backgroundColor:"#faebd7"
  },
  addButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    backgroundColor : "#E91E63",
    marginBottom: -45,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    padding: 30,
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'red',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopColor: '#ededed',
  },
});
