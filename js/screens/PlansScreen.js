import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Component } from 'react';

export default class PlansScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Plans</Text>
        <Button
          onPress={() => this.props.navigation.navigate("PlanInfo")}
          title="Zu Übung"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});