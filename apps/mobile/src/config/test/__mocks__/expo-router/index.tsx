import React from 'react'

const Tabs = ({ children }) => <>{children}</>

Tabs.Screen = ({ options }) => (
	<div>
		<h1>{options.title}</h1>
		<>{options.tabBarIcon({ color: 'blue' })}</>
	</div>
)

export { Tabs }
