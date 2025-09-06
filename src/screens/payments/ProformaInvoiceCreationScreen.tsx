import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ProformaInvoiceCreationScreenProps {
  onSave: (invoice: any) => void;
  onCancel: () => void;
}

const ProformaInvoiceCreationScreen: React.FC<ProformaInvoiceCreationScreenProps> = ({
  onSave,
  onCancel,
}) => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectTitle: '',
    projectDescription: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'SAR',
    taxRate: 15, // Saudi VAT rate
    notes: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [items]);

  const calculateTotals = () => {
    const newSubtotal = items.reduce((sum, item) => sum + item.total, 0);
    const newTaxAmount = newSubtotal * (invoiceData.taxRate / 100);
    const newTotal = newSubtotal + newTaxAmount;

    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleSave = () => {
    if (!invoiceData.clientName || !invoiceData.clientEmail) {
      Alert.alert('Error', 'Please fill in client name and email');
      return;
    }

    if (items.some(item => !item.description || item.unitPrice <= 0)) {
      Alert.alert('Error', 'Please fill in all item details');
      return;
    }

    const invoice = {
      ...invoiceData,
      items,
      subtotal,
      taxAmount,
      total,
      status: 'draft',
      createdAt: new Date(),
    };

    onSave(invoice);
    Alert.alert('Success', 'Proforma invoice created successfully');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: invoiceData.currency,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Proforma Invoice</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Client Name *</Text>
            <TextInput
              style={styles.input}
              value={invoiceData.clientName}
              onChangeText={(text) => setInvoiceData({...invoiceData, clientName: text})}
              placeholder="Enter client name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={invoiceData.clientEmail}
              onChangeText={(text) => setInvoiceData({...invoiceData, clientEmail: text})}
              placeholder="client@example.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={invoiceData.clientPhone}
              onChangeText={(text) => setInvoiceData({...invoiceData, clientPhone: text})}
              placeholder="+966 50 123 4567"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Project Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Project Title</Text>
            <TextInput
              style={styles.input}
              value={invoiceData.projectTitle}
              onChangeText={(text) => setInvoiceData({...invoiceData, projectTitle: text})}
              placeholder="Enter project title"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={invoiceData.projectDescription}
              onChangeText={(text) => setInvoiceData({...invoiceData, projectDescription: text})}
              placeholder="Project description"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Details</Text>
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Issue Date</Text>
              <TextInput
                style={styles.input}
                value={invoiceData.issueDate}
                onChangeText={(text) => setInvoiceData({...invoiceData, issueDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>
            
            <View style={styles.halfInput}>
              <Text style={styles.label}>Due Date</Text>
              <TextInput
                style={styles.input}
                value={invoiceData.dueDate}
                onChangeText={(text) => setInvoiceData({...invoiceData, dueDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Currency</Text>
              <TextInput
                style={styles.input}
                value={invoiceData.currency}
                onChangeText={(text) => setInvoiceData({...invoiceData, currency: text})}
                placeholder="SAR"
              />
            </View>
            
            <View style={styles.halfInput}>
              <Text style={styles.label}>Tax Rate (%)</Text>
              <TextInput
                style={styles.input}
                value={invoiceData.taxRate.toString()}
                onChangeText={(text) => setInvoiceData({...invoiceData, taxRate: parseFloat(text) || 0})}
                placeholder="15"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Invoice Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Invoice Items</Text>
            <TouchableOpacity onPress={addItem} style={styles.addButton}>
              <Ionicons name="add" size={20} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          {items.map((item, index) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemNumber}>Item {index + 1}</Text>
                {items.length > 1 && (
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input}
                  value={item.description}
                  onChangeText={(text) => updateItem(item.id, 'description', text)}
                  placeholder="Item description"
                />
              </View>

              <View style={styles.row}>
                <View style={styles.thirdInput}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={styles.input}
                    value={item.quantity.toString()}
                    onChangeText={(text) => updateItem(item.id, 'quantity', parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.thirdInput}>
                  <Text style={styles.label}>Unit Price</Text>
                  <TextInput
                    style={styles.input}
                    value={item.unitPrice.toString()}
                    onChangeText={(text) => updateItem(item.id, 'unitPrice', parseFloat(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.thirdInput}>
                  <Text style={styles.label}>Total</Text>
                  <Text style={[styles.input, styles.readOnlyInput]}>
                    {formatCurrency(item.total)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Invoice Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax ({invoiceData.taxRate}%):</Text>
              <Text style={styles.summaryValue}>{formatCurrency(taxAmount)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={invoiceData.notes}
            onChangeText={(text) => setInvoiceData({...invoiceData, notes: text})}
            placeholder="Additional notes or terms"
            multiline
            numberOfLines={4}
          />
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
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
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
    backgroundColor: COLORS.surface,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  readOnlyInput: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  halfInput: {
    flex: 1,
  },
  thirdInput: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 6,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 5,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
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
  summaryLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 5,
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default ProformaInvoiceCreationScreen;
