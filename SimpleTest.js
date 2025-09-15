import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const SimpleTest = () => {
  const [clicked, setClicked] = useState(false);

  const handleTest = () => {
    console.log('Button clicked!');
    setClicked(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Simple Test</Text>
      <Button title="Test Button" onPress={handleTest} />
      {clicked && <Text style={{ marginTop: 20, color: 'green' }}>Button was clicked!</Text>}
    </View>
  );
};

export default SimpleTest;
