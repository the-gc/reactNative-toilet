import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ReadPage extends Component{
	render() {
		return(
			<View>
				<Text style={styles.text}>
					reading
				</Text>
			</View>
			);
	}

}

var styles = StyleSheet.create({
	text:{
		fontSize: 60
	}
});

module.exports = ReadPage;