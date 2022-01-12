import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useTheme} from '@react-navigation/native';
import './Teammember.css';

const data = [
{ id: "1", name: "Trần Tiến Đạt", role: "Software Engineer" },
{ id: "2", name: "Nguyễn Văn Dương", role: "Technical Architect" },
{ id: "3", name: "Trương Mỹ Phương", role: "Frontend Developer" },
{ id: "4", name: "Phạm Kiên Định", role: "UI/UX Designer" },
{ id: "5", name: "Ngô Nguyễn Bảo Lâm", role: "Cybersecurity specialists" },
]

function App() {
return (
	<div className="App">
    
	<table>
		<tr>
		<th>ID</th>
		<th>Tên</th>
		<th>Vai trò</th>
		</tr>
		{data.map((val, key) => {
		return (
			<tr key={key}>
			<td>{val.id}</td>
			<td>{val.name}</td>
			<td>{val.role}</td>
			</tr>
		)
		})}

	</table>
	</div>
);
}

export default App;