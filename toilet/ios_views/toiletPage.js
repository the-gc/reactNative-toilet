import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import TWebView from './TWebView';

class ToiletPage extends Component{
	render() {
		return(
			<View style={styles.container}>
				<TWebView url='file:///Users/xuhongfei/Developer/the-gc/toilet/toilet/html/nearby.html'/>
			</View>
			);
	}

}

var styles = StyleSheet.create({
	container:{
		flex: 1
	}
});

module.exports = ToiletPage;