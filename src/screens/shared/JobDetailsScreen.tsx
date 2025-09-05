import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

interface Message {
  id: string;
  sender: 'client' | 'engineer';
  message: string;
  timestamp: string;
  isRead: boolean;
}

const JobDetailsScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'timeline' | 'messages' | 'files'>('timeline');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Mock job data - in real app, this would come from navigation params
  const jobData = {
    id: '1',
    title: 'Site Survey for NEOM Project',
    client: 'Ahmed Al-Rashid',
    engineer: 'Sarah Al-Mansouri',
    location: 'Riyadh, Saudi Arabia',
    budget: 15000,
    status: 'in_progress',
    category: 'Surveying',
    description: 'Comprehensive site survey for new construction project in NEOM. Includes topographical survey, utility mapping, and environmental assessment.',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    progress: 75,
  };

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: { en: 'Job Posted', ar: 'تم نشر الوظيفة' },
      description: { en: 'Client posted the job request', ar: 'نشر العميل طلب الوظيفة' },
      timestamp: '2024-01-10 09:00',
      status: 'completed',
      icon: 'add-circle',
    },
    {
      id: '2',
      title: { en: 'Engineer Assigned', ar: 'تم تعيين المهندس' },
      description: { en: 'Sarah Al-Mansouri accepted the job', ar: 'قبلت سارة المنصوري الوظيفة' },
      timestamp: '2024-01-12 14:30',
      status: 'completed',
      icon: 'person-add',
    },
    {
      id: '3',
      title: { en: 'Site Visit Scheduled', ar: 'تم جدولة زيارة الموقع' },
      description: { en: 'Initial site visit scheduled for Jan 15', ar: 'تم جدولة الزيارة الأولية للموقع في 15 يناير' },
      timestamp: '2024-01-13 10:15',
      status: 'completed',
      icon: 'calendar',
    },
    {
      id: '4',
      title: { en: 'Survey in Progress', ar: 'المسح قيد التنفيذ' },
      description: { en: 'Currently conducting field measurements', ar: 'يتم حالياً إجراء القياسات الميدانية' },
      timestamp: '2024-01-20 08:00',
      status: 'current',
      icon: 'construct',
    },
    {
      id: '5',
      title: { en: 'Report Submission', ar: 'تقديم التقرير' },
      description: { en: 'Final survey report due', ar: 'موعد تقديم التقرير النهائي للمسح' },
      timestamp: '2024-02-10 17:00',
      status: 'upcoming',
      icon: 'document-text',
    },
    {
      id: '6',
      title: { en: 'Project Completion', ar: 'إكمال المشروع' },
      description: { en: 'Project marked as completed', ar: 'تم إكمال المشروع' },
      timestamp: '2024-02-15 18:00',
      status: 'upcoming',
      icon: 'checkmark-circle',
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'client',
      message: 'Hello Sarah, looking forward to working with you on this project.',
      timestamp: '2024-01-12 14:35',
      isRead: true,
    },
    {
      id: '2',
      sender: 'engineer',
      message: 'Thank you Ahmed! I\'m excited to start. I\'ll be on-site tomorrow at 9 AM.',
      timestamp: '2024-01-12 14:42',
      isRead: true,
    },
    {
      id: '3',
      sender: 'client',
      message: 'Perfect! The site access code is 1234. Security will be expecting you.',
      timestamp: '2024-01-12 14:45',
      isRead: true,
    },
    {
      id: '4',
      sender: 'engineer',
      message: 'Great! I\'ve completed the initial measurements. The site conditions are good for the planned construction.',
      timestamp: '2024-01-20 16:30',
      isRead: false,
    },
  ];

  const files = [
    {
      id: '1',
      name: 'Site Survey Report.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'engineer',
      uploadedAt: '2024-01-20 16:45',
    },
    {
      id: '2',
      name: 'Topographical Map.dwg',
      type: 'dwg',
      size: '5.1 MB',
      uploadedBy: 'engineer',
      uploadedAt: '2024-01-20 16:50',
    },
    {
      id: '3',
      name: 'Project Requirements.docx',
      type: 'docx',
      size: '1.2 MB',
      uploadedBy: 'client',
      uploadedAt: '2024-01-10 09:15',
    },
  ];

  const renderJobHeader = () => (
    <View style={[styles.jobHeader, { backgroundColor: theme.surface }]}>
      <View style={styles.jobTitleRow}>
        <Text style={[styles.jobTitle, { color: theme.text }]}>
          {jobData.title}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(jobData.status) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(jobData.status)}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.jobDescription, { color: theme.textSecondary }]}>
        {jobData.description}
      </Text>
      
      <View style={styles.jobInfo}>
        <View style={styles.jobInfoRow}>
          <Ionicons name="person" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobInfoText, { color: theme.textSecondary }]}>
            {isArabic ? 'العميل' : 'Client'}: {jobData.client}
          </Text>
        </View>
        
        <View style={styles.jobInfoRow}>
          <Ionicons name="construct" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobInfoText, { color: theme.textSecondary }]}>
            {isArabic ? 'المهندس' : 'Engineer'}: {jobData.engineer}
          </Text>
        </View>
        
        <View style={styles.jobInfoRow}>
          <Ionicons name="location" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobInfoText, { color: theme.textSecondary }]}>
            {jobData.location}
          </Text>
        </View>
        
        <View style={styles.jobInfoRow}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobInfoText, { color: theme.textSecondary }]}>
            {jobData.budget.toLocaleString()} SAR
          </Text>
        </View>
      </View>
      
      {jobData.status === 'in_progress' && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'التقدم' : 'Progress'}
            </Text>
            <Text style={[styles.progressPercent, { color: theme.text }]}>
              {jobData.progress}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.progressFill,
                { 
                  width: `${jobData.progress}%`,
                  backgroundColor: COLORS.primary,
                }
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderTimelineEvent = ({ item }: { item: TimelineEvent }) => (
    <View style={styles.timelineItem}>
      <View style={[
        styles.timelineIcon,
        {
          backgroundColor: getTimelineStatusColor(item.status),
        }
      ]}>
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          color="white" 
        />
      </View>
      
      <View style={styles.timelineContent}>
        <Text style={[styles.timelineTitle, { color: theme.text }]}>
          {getText(item.title)}
        </Text>
        <Text style={[styles.timelineDescription, { color: theme.textSecondary }]}>
          {getText(item.description)}
        </Text>
        <Text style={[styles.timelineTimestamp, { color: theme.textSecondary }]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'engineer' ? styles.messageRight : styles.messageLeft
    ]}>
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: item.sender === 'engineer' ? COLORS.primary : theme.surface,
        }
      ]}>
        <Text style={[
          styles.messageText,
          {
            color: item.sender === 'engineer' ? 'white' : theme.text,
          }
        ]}>
          {item.message}
        </Text>
        <Text style={[
          styles.messageTime,
          {
            color: item.sender === 'engineer' ? 'rgba(255,255,255,0.7)' : theme.textSecondary,
          }
        ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderFile = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.fileItem, { backgroundColor: theme.surface }]}>
      <View style={styles.fileIcon}>
        <Ionicons 
          name={getFileIcon(item.type)} 
          size={24} 
          color={theme.textSecondary} 
        />
      </View>
      
      <View style={styles.fileInfo}>
        <Text style={[styles.fileName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.fileDetails, { color: theme.textSecondary }]}>
          {item.size} • {item.uploadedBy === 'engineer' ? jobData.engineer : jobData.client} • {item.uploadedAt}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return COLORS.primary;
      case 'completed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      default:
        return COLORS.light.border;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return isArabic ? 'قيد التنفيذ' : 'In Progress';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      default:
        return status;
    }
  };

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'current':
        return COLORS.primary;
      case 'upcoming':
        return COLORS.light.border;
      default:
        return COLORS.light.border;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'document-text';
      case 'dwg':
        return 'construct';
      case 'docx':
        return 'document';
      default:
        return 'document';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return (
          <FlatList
            data={timelineEvents}
            renderItem={renderTimelineEvent}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.timelineList}
          />
        );
      
      case 'messages':
        return (
          <View style={styles.messagesContainer}>
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesList}
            />
            
            <View style={[styles.messageInput, { backgroundColor: theme.surface }]}>
              <TextInput
                style={[styles.messageInputField, { color: theme.text }]}
                placeholder={isArabic ? 'اكتب رسالة...' : 'Type a message...'}
                placeholderTextColor={theme.textSecondary}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'files':
        return (
          <FlatList
            data={files}
            renderItem={renderFile}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.filesList}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderJobHeader()}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'timeline', title: { en: 'Timeline', ar: 'الجدول الزمني' }, icon: 'time' },
          { id: 'messages', title: { en: 'Messages', ar: 'الرسائل' }, icon: 'chatbubbles' },
          { id: 'files', title: { en: 'Files', ar: 'الملفات' }, icon: 'folder' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                borderBottomColor: activeTab === tab.id ? COLORS.primary : 'transparent',
              },
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.id ? COLORS.primary : theme.textSecondary} 
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id ? COLORS.primary : theme.textSecondary,
                },
              ]}
            >
              {getText(tab.title)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobHeader: {
    padding: SPACING.lg,
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  jobTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  jobInfo: {
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  jobInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobInfoText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  progressSection: {
    marginTop: SPACING.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  progressPercent: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    gap: SPACING.xs,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  timelineList: {
    padding: SPACING.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  timelineDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  timelineTimestamp: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    padding: SPACING.lg,
  },
  messageContainer: {
    marginBottom: SPACING.md,
  },
  messageLeft: {
    alignItems: 'flex-start',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  messageTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  messageInputField: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body2,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginRight: SPACING.sm,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filesList: {
    padding: SPACING.lg,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.light.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  fileDetails: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  downloadButton: {
    padding: SPACING.sm,
  },
});

export default JobDetailsScreen;
