import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BudgetTrackingScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');

  const projects = [
    { id: 'all', name: 'All Projects' },
    { id: '1', name: 'Oil Refinery Inspection' },
    { id: '2', name: 'Smart City Infrastructure' },
    { id: '3', name: 'Resort Development' },
  ];

  const budgetData = {
    totalBudget: 500000,
    spent: 350000,
    remaining: 150000,
    percentage: 70,
  };

  const categoryBreakdown = [
    { category: 'Engineering Services', budget: 200000, spent: 140000, color: '#007bff' },
    { category: 'Equipment & Tools', budget: 100000, spent: 80000, color: '#28a745' },
    { category: 'Materials', budget: 120000, spent: 90000, color: '#ffc107' },
    { category: 'Transportation', budget: 50000, spent: 25000, color: '#dc3545' },
    { category: 'Miscellaneous', budget: 30000, spent: 15000, color: '#6c757d' },
  ];

  const recentExpenses = [
    { description: 'Site Survey Equipment', amount: 15000, date: '2024-01-20', category: 'Equipment' },
    { description: 'Engineering Software License', amount: 8000, date: '2024-01-18', category: 'Software' },
    { description: 'Transportation Costs', amount: 5000, date: '2024-01-15', category: 'Transportation' },
    { description: 'Safety Equipment', amount: 12000, date: '2024-01-12', category: 'Equipment' },
  ];

  const ProjectSelector = () => (
    <View style={styles.projectSelector}>
      {projects.map((project) => (
        <TouchableOpacity
          key={project.id}
          style={[
            styles.projectButton,
            selectedProject === project.id && styles.projectButtonActive
          ]}
          onPress={() => setSelectedProject(project.id)}
        >
          <Text style={[
            styles.projectButtonText,
            selectedProject === project.id && styles.projectButtonTextActive
          ]}>
            {project.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const DonutChart = () => (
    <View style={styles.donutChartContainer}>
      <View style={styles.donutChart}>
        <View style={styles.donutInner}>
          <Text style={styles.donutPercentage}>{budgetData.percentage}%</Text>
          <Text style={styles.donutLabel}>Spent</Text>
        </View>
      </View>
      <View style={styles.donutLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#007bff' }]} />
          <Text style={styles.legendText}>Spent: {budgetData.spent.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#3a3a3a' }]} />
          <Text style={styles.legendText}>Remaining: {budgetData.remaining.toLocaleString()} SAR</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Budget Tracking</Text>
      
      <ProjectSelector />

      <View style={styles.budgetOverviewCard}>
        <Text style={styles.cardTitle}>Budget Overview</Text>
        <View style={styles.budgetStats}>
          <View style={styles.budgetStat}>
            <Text style={styles.budgetLabel}>Total Budget</Text>
            <Text style={styles.budgetValue}>{budgetData.totalBudget.toLocaleString()} SAR</Text>
          </View>
          <View style={styles.budgetStat}>
            <Text style={styles.budgetLabel}>Spent</Text>
            <Text style={[styles.budgetValue, { color: '#dc3545' }]}>
              {budgetData.spent.toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.budgetStat}>
            <Text style={styles.budgetLabel}>Remaining</Text>
            <Text style={[styles.budgetValue, { color: '#28a745' }]}>
              {budgetData.remaining.toLocaleString()} SAR
            </Text>
          </View>
        </View>
        <DonutChart />
      </View>

      <View style={styles.categoryBreakdownCard}>
        <Text style={styles.cardTitle}>Category Breakdown</Text>
        {categoryBreakdown.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={styles.categoryName}>{category.category}</Text>
              </View>
              <Text style={styles.categoryAmount}>
                {category.spent.toLocaleString()} / {category.budget.toLocaleString()} SAR
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(category.spent / category.budget) * 100}%`,
                    backgroundColor: category.color 
                  }
                ]} 
              />
            </View>
            <Text style={styles.categoryPercentage}>
              {Math.round((category.spent / category.budget) * 100)}% used
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.recentExpensesCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Expenses</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#007bff" />
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        {recentExpenses.map((expense, index) => (
          <View key={index} style={styles.expenseItem}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseDescription}>{expense.description}</Text>
              <Text style={styles.expenseDate}>{expense.date} • {expense.category}</Text>
            </View>
            <Text style={styles.expenseAmount}>-{expense.amount.toLocaleString()} SAR</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Expenses</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.alertsCard}>
        <Text style={styles.cardTitle}>Budget Alerts</Text>
        <View style={styles.alertItem}>
          <Ionicons name="warning" size={20} color="#ffc107" />
          <Text style={styles.alertText}>
            Equipment & Tools category is 80% used
          </Text>
        </View>
        <View style={styles.alertItem}>
          <Ionicons name="information-circle" size={20} color="#007bff" />
          <Text style={styles.alertText}>
            Transportation budget has 50% remaining
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  projectSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  projectButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  projectButtonActive: {
    backgroundColor: '#007bff',
  },
  projectButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  projectButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  budgetOverviewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  budgetStat: {
    alignItems: 'center',
    flex: 1,
  },
  budgetLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  budgetValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  donutChartContainer: {
    alignItems: 'center',
  },
  donutChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 20,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  donutInner: {
    alignItems: 'center',
  },
  donutPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  donutLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  donutLegend: {
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#cccccc',
    fontSize: 14,
  },
  categoryBreakdownCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryItem: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#cccccc',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#3a3a3a',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#cccccc',
  },
  recentExpensesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  expenseDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
  },
  viewAllButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  alertText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
});

export default BudgetTrackingScreen;
