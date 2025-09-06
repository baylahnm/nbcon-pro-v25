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

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  supplier: string;
  notes: string;
}

interface MaterialCostEstimatorScreenProps {
  onSaveEstimate: (estimate: any) => void;
  onClose: () => void;
}

const MaterialCostEstimatorScreen: React.FC<MaterialCostEstimatorScreenProps> = ({
  onSaveEstimate,
  onClose,
}) => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: '',
    quantity: 1,
    unit: 'pcs',
    unitPrice: 0,
    supplier: '',
    notes: '',
  });

  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(15); // Saudi VAT
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState('SAR');

  const categories = [
    'Concrete & Cement',
    'Steel & Reinforcement',
    'Bricks & Blocks',
    'Electrical',
    'Plumbing',
    'HVAC',
    'Finishing',
    'Other',
  ];

  const units = ['pcs', 'kg', 'm', 'm²', 'm³', 'ton', 'box', 'roll'];

  useEffect(() => {
    calculateTotals();
  }, [materials, taxRate]);

  const calculateTotals = () => {
    const newSubtotal = materials.reduce((sum, material) => sum + material.totalPrice, 0);
    const newTaxAmount = newSubtotal * (taxRate / 100);
    const newTotal = newSubtotal + newTaxAmount;

    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);
  };

  const addMaterial = () => {
    if (!newMaterial.name.trim()) {
      Alert.alert('Error', 'Please enter material name');
      return;
    }

    if (newMaterial.unitPrice <= 0) {
      Alert.alert('Error', 'Please enter valid unit price');
      return;
    }

    const material: MaterialItem = {
      id: Date.now().toString(),
      ...newMaterial,
      totalPrice: newMaterial.quantity * newMaterial.unitPrice,
    };

    setMaterials([...materials, material]);
    setNewMaterial({
      name: '',
      category: '',
      quantity: 1,
      unit: 'pcs',
      unitPrice: 0,
      supplier: '',
      notes: '',
    });
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const updateMaterial = (id: string, field: keyof MaterialItem, value: string | number) => {
    setMaterials(materials.map(material => {
      if (material.id === id) {
        const updated = { ...material, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return material;
    }));
  };

  const handleSaveEstimate = () => {
    if (materials.length === 0) {
      Alert.alert('Error', 'Please add at least one material');
      return;
    }

    const estimate = {
      materials,
      subtotal,
      taxRate,
      taxAmount,
      total,
      currency,
      createdAt: new Date(),
    };

    onSaveEstimate(estimate);
    Alert.alert('Success', 'Material cost estimate saved');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const renderMaterial = ({ item }: { item: MaterialItem }) => (
    <View style={styles.materialCard}>
      <View style={styles.materialHeader}>
        <Text style={styles.materialName}>{item.name}</Text>
        <TouchableOpacity onPress={() => removeMaterial(item.id)}>
          <Ionicons name="trash" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.materialDetails}>
        <View style={styles.materialRow}>
          <Text style={styles.materialLabel}>Category:</Text>
          <Text style={styles.materialValue}>{item.category}</Text>
        </View>
        
        <View style={styles.materialRow}>
          <Text style={styles.materialLabel}>Quantity:</Text>
          <Text style={styles.materialValue}>{item.quantity} {item.unit}</Text>
        </View>
        
        <View style={styles.materialRow}>
          <Text style={styles.materialLabel}>Unit Price:</Text>
          <Text style={styles.materialValue}>{formatCurrency(item.unitPrice)}</Text>
        </View>
        
        <View style={styles.materialRow}>
          <Text style={styles.materialLabel}>Total:</Text>
          <Text style={[styles.materialValue, styles.totalPrice]}>
            {formatCurrency(item.totalPrice)}
          </Text>
        </View>
        
        {item.supplier && (
          <View style={styles.materialRow}>
            <Text style={styles.materialLabel}>Supplier:</Text>
            <Text style={styles.materialValue}>{item.supplier}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Material Cost Estimator</Text>
        <TouchableOpacity onPress={handleSaveEstimate} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Material */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Material</Text>
          
          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Material Name *</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.name}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, name: text }))}
                placeholder="Enter material name"
              />
            </View>
            
            <View style={styles.halfInput}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.category}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, category: text }))}
                placeholder="Select category"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.thirdInput}>
              <Text style={styles.label}>Quantity *</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.quantity.toString()}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, quantity: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            
            <View style={styles.thirdInput}>
              <Text style={styles.label}>Unit</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.unit}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, unit: text }))}
                placeholder="pcs"
              />
            </View>
            
            <View style={styles.thirdInput}>
              <Text style={styles.label}>Unit Price *</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.unitPrice.toString()}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, unitPrice: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Supplier</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.supplier}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, supplier: text }))}
                placeholder="Supplier name"
              />
            </View>
            
            <View style={styles.halfInput}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.input}
                value={newMaterial.notes}
                onChangeText={(text) => setNewMaterial(prev => ({ ...prev, notes: text }))}
                placeholder="Additional notes"
              />
            </View>
          </View>

          <TouchableOpacity onPress={addMaterial} style={styles.addButton}>
            <Ionicons name="add" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Material</Text>
          </TouchableOpacity>
        </View>

        {/* Materials List */}
        {materials.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Materials ({materials.length})</Text>
            <FlatList
              data={materials}
              renderItem={renderMaterial}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Cost Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cost Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax Rate:</Text>
              <Text style={styles.summaryValue}>{taxRate}%</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax Amount:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(taxAmount)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Quick Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryChip}
                onPress={() => setNewMaterial(prev => ({ ...prev, category }))}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  closeButton: {
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
  inputRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
  },
  thirdInput: {
    flex: 1,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    gap: 10,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  materialCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  materialDetails: {
    gap: 5,
  },
  materialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  materialValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  totalPrice: {
    color: COLORS.primary,
    fontWeight: 'bold',
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
  totalRow: {
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default MaterialCostEstimatorScreen;
