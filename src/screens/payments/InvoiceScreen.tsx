import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    vatNumber?: string;
  };
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    vatNumber: string;
    crNumber: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  currency: string;
  paymentMethod: string;
  notes?: string;
}

const InvoiceScreen = ({ route, navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const { invoiceId } = route.params || { invoiceId: 'INV-2024-001' };
  
  const [invoiceData] = useState<InvoiceData>({
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-15',
    dueDate: '2024-02-14',
    status: 'paid',
    customerInfo: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@company.com',
      phone: '+966 50 123 4567',
      address: 'King Fahd Road, Riyadh 12345, Saudi Arabia',
      vatNumber: '300123456789003',
    },
    companyInfo: {
      name: 'NBCON Pro',
      address: 'Prince Sultan Road, Jeddah 21432, Saudi Arabia',
      phone: '+966 12 456 7890',
      email: 'billing@nbconpro.com',
      vatNumber: '300987654321003',
      crNumber: '1010123456',
    },
    items: [
      {
        id: '1',
        description: 'Professional Plan Subscription - Monthly',
        quantity: 1,
        unitPrice: 299,
        amount: 299,
      },
      {
        id: '2',
        description: 'Additional Storage (50GB)',
        quantity: 2,
        unitPrice: 49,
        amount: 98,
      },
      {
        id: '3',
        description: 'Priority Support Package',
        quantity: 1,
        unitPrice: 199,
        amount: 199,
      },
    ],
    subtotal: 596,
    vatRate: 15,
    vatAmount: 89.4,
    total: 685.4,
    currency: 'SAR',
    paymentMethod: 'mada Card ending in 1234',
    notes: 'Thank you for your business. All prices include applicable taxes as per Saudi Arabian VAT regulations.',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return getText('paid', 'Paid');
      case 'pending': return getText('pending', 'Pending');
      case 'overdue': return getText('overdue', 'Overdue');
      case 'cancelled': return getText('cancelled', 'Cancelled');
      default: return status;
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Invoice ${invoiceData.invoiceNumber} - ${invoiceData.total} ${invoiceData.currency}\nView your invoice: https://nbconpro.com/invoice/${invoiceId}`,
        title: `Invoice ${invoiceData.invoiceNumber}`,
      });
    } catch (error) {
      console.error('Error sharing invoice:', error);
    }
  };

  const handleDownload = () => {
    Alert.alert(
      getText('downloadInvoice', 'Download Invoice'),
      getText('downloadConfirmation', 'Your invoice will be downloaded as a PDF file.'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        { text: getText('download', 'Download'), onPress: () => {
          Alert.alert(getText('downloadStarted', 'Download Started'), getText('invoiceDownloading', 'Your invoice is being downloaded...'));
        }}
      ]
    );
  };

  const handlePayNow = () => {
    navigation.navigate('PaymentProcessing', { invoiceId: invoiceId });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    invoiceNumber: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    invoiceCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      margin: 20,
      marginBottom: 10,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    invoiceHeader: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    statusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    totalAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    dateRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    dateLabel: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    dateValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    companySection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    companyInfo: {
      marginBottom: 16,
    },
    companyName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    companyDetail: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 2,
      lineHeight: 20,
    },
    customerInfo: {
      marginTop: 8,
    },
    itemsSection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    itemsHeader: {
      flexDirection: 'row',
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      marginBottom: 12,
    },
    headerCell: {
      fontSize: 12,
      fontWeight: 'bold',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textTransform: 'uppercase',
    },
    descriptionHeader: {
      flex: 2,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    qtyHeader: {
      flex: 0.5,
      textAlign: 'center',
    },
    priceHeader: {
      flex: 1,
      textAlign: 'right',
    },
    amountHeader: {
      flex: 1,
      textAlign: 'right',
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6',
    },
    itemDescription: {
      flex: 2,
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    itemQty: {
      flex: 0.5,
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    itemPrice: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'right',
    },
    itemAmount: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: 'right',
    },
    summarySection: {
      padding: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    summaryLabel: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
      paddingTop: 12,
      marginTop: 8,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    paymentSection: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    paymentMethod: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
    },
    notes: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      lineHeight: 16,
      fontStyle: 'italic',
    },
    footer: {
      padding: 20,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    footerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    footerButton: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>
            {getText('invoice', 'Invoice')}
          </Text>
          <Text style={styles.invoiceNumber}>
            {invoiceData.invoiceNumber}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <Ionicons
              name="share-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleDownload}>
            <Ionicons
              name="download-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.invoiceCard}>
          <View style={styles.invoiceHeader}>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoiceData.status) }]}>
                <Text style={styles.statusText}>{getStatusText(invoiceData.status)}</Text>
              </View>
              <Text style={styles.totalAmount}>
                {invoiceData.total} {invoiceData.currency}
              </Text>
            </View>
            
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>{getText('invoiceDate', 'Invoice Date')}</Text>
              <Text style={styles.dateValue}>{invoiceData.date}</Text>
            </View>
            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>{getText('dueDate', 'Due Date')}</Text>
              <Text style={styles.dateValue}>{invoiceData.dueDate}</Text>
            </View>
          </View>

          <View style={styles.companySection}>
            <View style={styles.companyInfo}>
              <Text style={styles.sectionTitle}>{getText('from', 'From')}</Text>
              <Text style={styles.companyName}>{invoiceData.companyInfo.name}</Text>
              <Text style={styles.companyDetail}>{invoiceData.companyInfo.address}</Text>
              <Text style={styles.companyDetail}>{invoiceData.companyInfo.phone}</Text>
              <Text style={styles.companyDetail}>{invoiceData.companyInfo.email}</Text>
              <Text style={styles.companyDetail}>
                {getText('vatNumber', 'VAT')}: {invoiceData.companyInfo.vatNumber}
              </Text>
              <Text style={styles.companyDetail}>
                {getText('crNumber', 'CR')}: {invoiceData.companyInfo.crNumber}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.sectionTitle}>{getText('billedTo', 'Billed To')}</Text>
              <Text style={styles.companyName}>{invoiceData.customerInfo.name}</Text>
              <Text style={styles.companyDetail}>{invoiceData.customerInfo.address}</Text>
              <Text style={styles.companyDetail}>{invoiceData.customerInfo.phone}</Text>
              <Text style={styles.companyDetail}>{invoiceData.customerInfo.email}</Text>
              {invoiceData.customerInfo.vatNumber && (
                <Text style={styles.companyDetail}>
                  {getText('vatNumber', 'VAT')}: {invoiceData.customerInfo.vatNumber}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.itemsSection}>
            <Text style={styles.sectionTitle}>{getText('itemsServices', 'Items & Services')}</Text>
            
            <View style={styles.itemsHeader}>
              <Text style={[styles.headerCell, styles.descriptionHeader]}>
                {getText('description', 'Description')}
              </Text>
              <Text style={[styles.headerCell, styles.qtyHeader]}>
                {getText('qty', 'Qty')}
              </Text>
              <Text style={[styles.headerCell, styles.priceHeader]}>
                {getText('price', 'Price')}
              </Text>
              <Text style={[styles.headerCell, styles.amountHeader]}>
                {getText('amount', 'Amount')}
              </Text>
            </View>

            {invoiceData.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemQty}>{item.quantity}</Text>
                <Text style={styles.itemPrice}>{item.unitPrice} {invoiceData.currency}</Text>
                <Text style={styles.itemAmount}>{item.amount} {invoiceData.currency}</Text>
              </View>
            ))}
          </View>

          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{getText('subtotal', 'Subtotal')}</Text>
              <Text style={styles.summaryValue}>
                {invoiceData.subtotal} {invoiceData.currency}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {getText('vat', 'VAT')} ({invoiceData.vatRate}%)
              </Text>
              <Text style={styles.summaryValue}>
                {invoiceData.vatAmount} {invoiceData.currency}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>{getText('total', 'Total')}</Text>
              <Text style={styles.totalValue}>
                {invoiceData.total} {invoiceData.currency}
              </Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>{getText('paymentInfo', 'Payment Information')}</Text>
            <Text style={styles.paymentMethod}>
              {getText('paymentMethod', 'Payment Method')}: {invoiceData.paymentMethod}
            </Text>
            {invoiceData.notes && (
              <Text style={styles.notes}>{invoiceData.notes}</Text>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {invoiceData.status === 'pending' && (
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.footerButton}>
              <CustomButton
                title={getText('payNow', 'Pay Now')}
                onPress={handlePayNow}
                variant="primary"
                fullWidth
              />
            </View>
            <View style={styles.footerButton}>
              <CustomButton
                title={getText('download', 'Download')}
                onPress={handleDownload}
                variant="secondary"
                fullWidth
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default InvoiceScreen;