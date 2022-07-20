import { Text, View, Image, StyleSheet } from 'react-native';
import Budget from './Budget';


const BudgetContainer = ({ budgetsData = [] }) => (
	<View style={styles.container}>
        {budgetsData.map((budget,i)=>(
            <View style={styles.budget}>
            <Budget label={budget.text} i={i+1} complete={budget.complete} icon={budget.icon} color={budget.color} currentValue={budget.currentValue} goalValue={budget.goalValue} key={budget.budgetText}/>
            </View>
        ))}
	</View>
);

const styles = StyleSheet.create({
	budget: {
        marginBottom:16,
    },
});

export default BudgetContainer;
