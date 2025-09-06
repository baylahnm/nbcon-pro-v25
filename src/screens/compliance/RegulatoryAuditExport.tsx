import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

interface AuditDocument {
  id: string;
  name: string;
  type: 'compliance_report' | 'financial_audit' | 'security_audit' | 'regulatory_filing';
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'archived';
  createdDate: string;
  lastModified: string;
  size: string;
  description: string;
  regulatoryBody: string;
  required: boolean;
}

interface AuditCategory {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  icon: string;
  color: string;
}

interface ExportRequest {
  id: string;
  documents: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedDate: string;
  completedDate?: string;
  downloadUrl?: string;
}

const RegulatoryAuditExport: React.FC = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const auditCategories: AuditCategory[] = [
    {
      id: 'compliance',
      name: 'Compliance Reports',
      description: 'Regulatory compliance and audit reports',
      documentCount: 15,
      icon: '📋',
      color: '#1e3a8a',
    },
    {
      id: 'financial',
      name: 'Financial Audits',
      description: 'Financial statements and audit reports',
      documentCount: 8,
      icon: '💰',
      color: '#059669',
    },
    {
      id: 'security',
      name: 'Security Audits',
      description: 'Cybersecurity and data protection audits',
      documentCount: 12,
      icon: '🔒',
      color: '#dc2626',
    },
    {
      id: 'regulatory',
      name: 'Regulatory Filings',
      description: 'Government filings and submissions',
      documentCount: 6,
      icon: '🏛️',
      color: '#d97706',
    },
  ];

  const [auditDocuments, setAuditDocuments] = useState<AuditDocument[]>([
    {
      id: '1',
      name: 'Q4 2024 Compliance Report',
      type: 'compliance_report',
      status: 'approved',
      createdDate: '2024-12-01',
      lastModified: '2024-12-15',
      size: '2.3 MB',
      description: 'Quarterly compliance report for Q4 2024',
      regulatoryBody: 'Saudi Data Protection Authority',
      required: true,
    },
    {
      id: '2',
      name: 'Financial Audit 2024',
      type: 'financial_audit',
      status: 'approved',
      createdDate: '2024-11-15',
      lastModified: '2024-12-10',
      size: '5.7 MB',
      description: 'Annual financial audit report',
      regulatoryBody: 'Saudi Capital Market Authority',
      required: true,
    },
    {
      id: '3',
      name: 'Cybersecurity Assessment',
      type: 'security_audit',
      status: 'pending_review',
      createdDate: '2024-12-10',
      lastModified: '2024-12-14',
      size: '1.8 MB',
      description: 'Cybersecurity compliance assessment',
      regulatoryBody: 'Saudi National Cybersecurity Authority',
      required: true,
    },
    {
      id: '4',
      name: 'VAT Compliance Report',
      type: 'regulatory_filing',
      status: 'approved',
      createdDate: '2024-11-30',
      lastModified: '2024-12-05',
      size: '1.2 MB',
      description: 'VAT compliance and filing report',
      regulatoryBody: 'ZATCA',
      required: true,
    },
    {
      id: '5',
      name: 'Data Protection Impact Assessment',
      type: 'compliance_report',
      status: 'draft',
      createdDate: '2024-12-12',
      lastModified: '2024-12-14',
      size: '0.8 MB',
      description: 'DPIA for new data processing activities',
      regulatoryBody: 'Saudi Data Protection Authority',
      required: false,
    },
  ]);

  const [exportRequests, setExportRequests] = useState<ExportRequest[]>([
    {
      id: '1',
      documents: ['1', '2', '4'],
      format: 'pdf',
      status: 'completed',
      requestedDate: '2024-12-10',
      completedDate: '2024-12-10',
      downloadUrl: '/exports/audit-export-2024-12-10.pdf',
    },
    {
      id: '2',
      documents: ['3'],
      format: 'excel',
      status: 'processing',
      requestedDate: '2024-12-14',
    },
  ]);

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: '📄', description: 'Portable Document Format' },
    { id: 'excel', name: 'Excel', icon: '📊', description: 'Microsoft Excel Spreadsheet' },
    { id: 'csv', name: 'CSV', icon: '📈', description: 'Comma Separated Values' },
    { id: 'json', name: 'JSON', icon: '🔧', description: 'JavaScript Object Notation' },
  ];

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleSelectAll = () => {
    const allDocumentIds = auditDocuments.map(doc => doc.id);
    setSelectedDocuments(allDocumentIds);
  };

  const handleDeselectAll = () => {
    setSelectedDocuments([]);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const handleExportDocuments = () => {
    if (selectedDocuments.length === 0) {
      Alert.alert('Error', 'Please select at least one document to export.');
      return;
    }

    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      Alert.alert(
        'Export Initiated',
        'Your audit documents are being prepared for export. You will receive a notification when ready.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#6b7280';
      case 'pending_review': return '#d97706';
      case 'approved': return '#059669';
      case 'rejected': return '#dc2626';
      case 'archived': return '#6b7280';
      case 'pending': return '#d97706';
      case 'processing': return '#1e3a8a';
      case 'completed': return '#059669';
      case 'failed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'DRAFT';
      case 'pending_review': return 'PENDING REVIEW';
      case 'approved': return 'APPROVED';
      case 'rejected': return 'REJECTED';
      case 'archived': return 'ARCHIVED';
      case 'pending': return 'PENDING';
      case 'processing': return 'PROCESSING';
      case 'completed': return 'COMPLETED';
      case 'failed': return 'FAILED';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'compliance_report': return '📋';
      case 'financial_audit': return '💰';
      case 'security_audit': return '🔒';
      case 'regulatory_filing': return '🏛️';
      default: return '📄';
    }
  };

  const renderCategory = (category: AuditCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategoryCard
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryDescription}>{category.description}</Text>
      <Text style={styles.categoryCount}>{category.documentCount} documents</Text>
    </TouchableOpacity>
  );

  const renderAuditDocument = (document: AuditDocument) => (
    <TouchableOpacity
      key={document.id}
      style={[
        styles.documentCard,
        selectedDocuments.includes(document.id) && styles.selectedDocumentCard
      ]}
      onPress={() => handleDocumentSelect(document.id)}
    >
      <View style={styles.documentHeader}>
        <Text style={styles.documentIcon}>{getTypeIcon(document.type)}</Text>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{document.name}</Text>
          <Text style={styles.documentDescription}>{document.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(document.status) }]}>
          <Text style={styles.statusText}>{getStatusText(document.status)}</Text>
        </View>
      </View>
      
      <View style={styles.documentDetails}>
        <Text style={styles.documentDetail}>Regulatory Body: {document.regulatoryBody}</Text>
        <Text style={styles.documentDetail}>Size: {document.size}</Text>
        <Text style={styles.documentDetail}>
          Modified: {new Date(document.lastModified).toLocaleDateString()}
        </Text>
      </View>
      
      {document.required && (
        <Text style={styles.requiredText}>Required for compliance</Text>
      )}
    </TouchableOpacity>
  );

  const renderExportFormat = (format: any) => (
    <TouchableOpacity
      key={format.id}
      style={[
        styles.formatCard,
        selectedFormat === format.id && styles.selectedFormatCard
      ]}
      onPress={() => handleFormatSelect(format.id)}
    >
      <Text style={styles.formatIcon}>{format.icon}</Text>
      <Text style={styles.formatName}>{format.name}</Text>
      <Text style={styles.formatDescription}>{format.description}</Text>
    </TouchableOpacity>
  );

  const renderExportRequest = (request: ExportRequest) => (
    <View key={request.id} style={styles.exportRequestCard}>
      <View style={styles.exportRequestHeader}>
        <Text style={styles.exportRequestTitle}>
          Export Request #{request.id}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
          <Text style={styles.statusText}>{getStatusText(request.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.exportRequestFormat}>
        Format: {exportFormats.find(f => f.id === request.format)?.name}
      </Text>
      <Text style={styles.exportRequestDocuments}>
        Documents: {request.documents.length} selected
      </Text>
      <Text style={styles.exportRequestDate}>
        Requested: {new Date(request.requestedDate).toLocaleString()}
      </Text>
      
      {request.status === 'completed' && request.downloadUrl && (
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const filteredDocuments = auditDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Regulatory Audit Export</Text>
        <Text style={styles.headerSubtitle}>
          Export audit documents for regulatory compliance and reporting
        </Text>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Document Categories</Text>
        <Text style={styles.sectionSubtitle}>
          Select a category to filter documents
        </Text>
        
        <View style={styles.categoriesGrid}>
          {auditCategories.map(renderCategory)}
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Document Selection */}
      <View style={styles.documentsSection}>
        <View style={styles.documentsHeader}>
          <Text style={styles.sectionTitle}>Audit Documents</Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity style={styles.selectionButton} onPress={handleSelectAll}>
              <Text style={styles.selectionButtonText}>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectionButton} onPress={handleDeselectAll}>
              <Text style={styles.selectionButtonText}>Deselect All</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.sectionSubtitle}>
          {selectedDocuments.length} of {auditDocuments.length} documents selected
        </Text>
        
        {filteredDocuments.map(renderAuditDocument)}
      </View>

      {/* Export Format */}
      <View style={styles.formatSection}>
        <Text style={styles.sectionTitle}>Export Format</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the format for your export
        </Text>
        
        <View style={styles.formatsGrid}>
          {exportFormats.map(renderExportFormat)}
        </View>
      </View>

      {/* Export Actions */}
      <View style={styles.exportSection}>
        <TouchableOpacity
          style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
          onPress={handleExportDocuments}
          disabled={isExporting}
        >
          <Text style={styles.exportButtonText}>
            {isExporting ? 'Exporting...' : 'Export Documents'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Export History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Export History</Text>
        <Text style={styles.sectionSubtitle}>
          Track your previous export requests
        </Text>
        
        {exportRequests.map(renderExportRequest)}
      </View>

      {/* Compliance Information */}
      <View style={styles.complianceSection}>
        <Text style={styles.sectionTitle}>Compliance Information</Text>
        
        <View style={styles.complianceCard}>
          <Text style={styles.complianceTitle}>Regulatory Requirements</Text>
          <Text style={styles.complianceText}>
            All exported documents comply with Saudi Arabia's regulatory requirements 
            and are suitable for official submissions to relevant authorities.
          </Text>
        </View>
        
        <View style={styles.complianceCard}>
          <Text style={styles.complianceTitle}>Data Integrity</Text>
          <Text style={styles.complianceText}>
            Documents are digitally signed and tamper-proof to ensure authenticity 
            and integrity for regulatory purposes.
          </Text>
        </View>
        
        <View style={styles.complianceCard}>
          <Text style={styles.complianceTitle}>Retention Policy</Text>
          <Text style={styles.complianceText}>
            All audit documents are retained for 7 years as required by Saudi 
            regulatory standards.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Compliance Support?</Text>
        <Text style={styles.contactText}>
          Contact our compliance team for assistance with regulatory requirements, 
          audit documentation, or export processes.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: compliance@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Hours: 9 AM - 6 PM (Saudi Time)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  categoriesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedCategoryCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '500',
  },
  searchSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
  },
  documentsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  documentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  selectionButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  selectionButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  documentCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedDocumentCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  documentIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  documentInfo: {
    flex: 1,
    marginRight: 10,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  documentDetails: {
    marginBottom: 8,
  },
  documentDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  requiredText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
  },
  formatSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  formatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  formatCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedFormatCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  formatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  formatName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  formatDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  exportSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  exportButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  historySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  exportRequestCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  exportRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exportRequestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  exportRequestFormat: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  exportRequestDocuments: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  exportRequestDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  complianceSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  complianceCard: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  complianceText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
});

export default RegulatoryAuditExport;
