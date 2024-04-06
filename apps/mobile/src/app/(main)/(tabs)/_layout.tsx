import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
            <Tabs.Screen
                name="training"
                options={{
                    title: 'Entrenamiento',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
                }}
            />
        </Tabs>
    );
}
