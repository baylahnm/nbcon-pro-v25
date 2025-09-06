import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface SplitRecipient {
  id: string;
  name: string;
  email: string;
  percentage: number;
  amount: number;
  isFixed: boolean;
}

interface SplitPaymentsScreenProps {
  totalAmount: number;
  currency: string;
  onSave: (splits: SplitRecipient[]) => void;
  onCancel: () => void;
}

const SplitPaymentsScreen: React.FC<SplitPaymentsScreenProps> = ({
  totalAmount,
  currency,
  onSave,
  onCancel,
}) => {
  const [recipients, setRecipients] = useState<SplitRecipient[]>([
    {
      id: '1',
      name: '',
      email: '',
      percentage: 50,
      amount: totalAmount * 0.5,
      isFixed: false,
    },
    {
      id: '2',
      name: '',
      email: '',
      percentage: 50,
      amount: totalAmount * 0.5,
      isFixed: false,
    },
  ]);

  const [splitType, setSplitType] = useState<'percentage' | 'fixed'>('percentage');
  const [totalSplit, setTotalSplit] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    calculateSplit();
  }, [recipients, splitType]);

  const calculateSplit = () => {
    if (splitType === 'percentage') {
      const totalPercentage = recipients.reduce((sum, recipient) => sum + recipient.percentage, 0);
      setTotalSplit(totalPercentage);
      setIsValid(Math.abs(totalPercentage - 100) < 0.01);
    } else {
      const totalAmount = recipients.reduce((sum, recipient) => sum + recipient.amount, 0);
      setTotalSplit(totalAmount);
      setIsValid(Math.abs(totalAmount - totalAmount) < 0.01);
    }
  };

  const addRecipient = () => {
    const newRecipient: SplitRecipient = {
      id: Date.now().toString(),
      name: '',
      email: '',
      percentage: 0,
      amount: 0,
      isFixed: splitType === 'fixed',
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(recipient => recipient.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof SplitRecipient, value: string | number | boolean) => {
    setRecipients(recipients.map(recipient => {
      if (recipient.id === id) {
        const updated = { ...recipient, [field]: value };
        
        if (field === 'percentage' && splitType === 'percentage') {
          updated.amount = (totalAmount * (value as number)) / 100;
        } else if (field === 'amount' && splitType === 'fixed') {
          updated.percentage = ((value as number) / totalAmount) * 100;
        }
        
        return updated;
      }
      return recipient;
    }));
  };

  const handleSplitTypeChange = (type: 'percentage' | 'fixed') => {
    setSplitType(type);
    setRecipients(recipients.map(recipient => ({
      ...recipient,
      isFixed: type === 'fixed',
    })));
  };

  const autoSplit = () => {
    const equalPercentage = 100 / recipients.length;
    const equalAmount = totalAmount / recipients.length;
    
    setRecipients(recipients.map(recipient => ({
      ...recipient,
      percentage: equalPercentage,
      amount: equalAmount,
    })));
  };

  const handleSave = () => {
    if (!isValid) {
      Alert.alert('Error', 'Split amounts must equal 100% or total amount');
      return;
    }

    if (recipients.some(r => !r.name || !r.email)) {
      Alert.alert('Error', 'Please fill in all recipient details');
      return;
    }

    onSave(recipients);
    Alert.alert('Success', 'Split payment configuration saved');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const renderRecipient = ({ item, index }: { item: SplitRecipient; index: number }) => (
    <View style={styles.recipientCard}>
      <View style={styles.recipientHeader}>
        <Text style={styles.recipientNumber}>Recipient {index + 1}</Text>
        {recipients.length > 1 && (
          <TouchableOpacity onPress={() => removeRecipient(item.id)}>
            <Ionicons name="trash" size={20} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={item.name}
          onChangeText={(text) => updateRecipient(item.id, 'name', text)}
          placeholder="Recipient name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={item.email}
          onChangeText={(text) => updateRecipient(item.id, 'email', text)}
          placeholder="recipient@example.com"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.splitRow}>
        <View style={styles.splitInput}>
          <Text style={styles.label}>
            {splitType === 'percentage' ? 'Percentage (%)' : 'Amount'}
          </Text>
          <TextInput
            style={styles.input}
            value={splitType === 'percentage' ? item.percentage.toString() : item.amount.toString()}
            onChangeText={(text) => updateRecipient(
              item.id, 
              splitType === 'percentage' ? 'percentage' : 'amount', 
              parseFloat(text) || 0
            )}
            keyboardType="numeric"
            placeholder={splitType === 'percentage' ? '50' : '1000'}
          />
        </View>
        
        <View style={styles.splitInput}>
          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.input, styles.readOnlyInput]}>
            {formatCurrency(item.amount)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Split Payment</Text>
        <TouchableOpacity onPress={handleSave} style={[styles.saveButton, !isValid && styles.disabledButton]}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Amount */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        </View>

        {/* Split Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Split Type</Text>
          <View style={styles.splitTypeContainer}>
            <TouchableOpacity
              style={[styles.splitTypeButton, splitType === 'percentage' && styles.activeSplitType]}
              onPress={() => handleSplitTypeChange('percentage')}
            >
              <Ionicons 
                name="pie-chart" 
                size={20} 
                color={splitType === 'percentage' ? COLORS.white : COLORS.primary} 
              />
              <Text style={[styles.splitTypeText, splitType === 'percentage' && styles.activeSplitTypeText]}>
                Percentage
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.splitTypeButton, splitType === 'fixed' && styles.activeSplitType]}
              onPress={() => handleSplitTypeChange('fixed')}
            >
              <Ionicons 
                name="cash" 
                size={20} 
                color={splitType === 'fixed' ? COLORS.white : COLORS.primary} 
              />
              <Text style={[styles.splitTypeText, splitType === 'fixed' && styles.activeSplitTypeText]}>
                Fixed Amount
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipients Header */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recipients</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={autoSplit} style={styles.autoSplitButton}>
                <Ionicons name="refresh" size={16} color={COLORS.primary} />
                <Text style={styles.autoSplitText}>Auto Split</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addRecipient} style={styles.addButton}>
                <Ionicons name="add" size={16} color={COLORS.primary} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={recipients}
            renderItem={renderRecipient}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Split Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Split Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Total {splitType === 'percentage' ? 'Percentage' : 'Amount'}:
              </Text>
              <Text style={[styles.summaryValue, !isValid && styles.errorText]}>
                {splitType === 'percentage' ? `${totalSplit.toFixed(1)}%` : formatCurrency(totalSplit)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Target:</Text>
              <Text style={styles.summaryValue}>
                {splitType === 'percentage' ? '100%' : formatCurrency(totalAmount)}
              </Text>
            </View>
            
            <View style={[styles.summaryRow, styles.differenceRow]}>
              <Text style={styles.summaryLabel}>Difference:</Text>
              <Text style={[styles.summaryValue, !isValid && styles.errorText]}>
                {splitType === 'percentage' 
                  ? `${(totalSplit - 100).toFixed(1)}%` 
                  : formatCurrency(totalSplit - totalAmount)
                }
              </Text>
            </View>
          </View>

          {!isValid && (
            <View style={styles.errorCard}>
              <Ionicons name="warning" size={20} color={COLORS.error} />
              <Text style={styles.errorText}>
                Split amounts must equal {splitType === 'percentage' ? '100%' : formatCurrency(totalAmount)}
              </Text>
            </View>
          )}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          <Text style={styles.instructionText}>
            • Add recipients who will receive payments
          </Text>
          <Text style={styles.instructionText}>
            • Choose between percentage or fixed amount split
          </Text>
          <Text style={styles.instructionText}>
            • Use "Auto Split" to divide equally
          </Text>
          <Text style={styles.instructionText}>
            • All recipients must have valid email addresses
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cancelButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  totalCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  splitTypeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  splitTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 8,
    gap: 8,
  },
  activeSplitType: {
    backgroundColor: COLORS.primary,
  },
  splitTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  activeSplitTypeText: {
    color: COLORS.white,
  },
  autoSplitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 6,
    gap: 5,
  },
  autoSplitText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    gap: 5,
  },
  addButtonText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
  recipientCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recipientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  recipientNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  readOnlyInput: {
    backgroundColor: COLORS.surface,
    color: COLORS.textSecondary,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 10,
  },
  splitInput: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  differenceRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 5,
    paddingTop: 15,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.errorLight,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    gap: 10,
  },
  instructionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default SplitPaymentsScreen;
