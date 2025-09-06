import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  route?: { params?: { jobId?: string } };
  navigation?: any;
  jobId?: string;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  onContact?: (clientId: string) => void;
  onViewSimilar?: () => void;
  onReport?: (jobId: string) => void;
  onBack?: () => void;
}

const SAMPLE_JOB = {
  id: '1',
  title: { en: 'Senior Structural Engineer - High-Rise Development', ar: 'مهندس إنشائي أول - تطوير المباني العالية' },
  description: {
    en: 'We are seeking an experienced Senior Structural Engineer to lead the structural design and analysis of a prestigious 45-story mixed-use development in Riyadh. This is a landmark project that will define the city\'s skyline and requires expertise in high-rise structural systems, advanced analysis software, and Saudi building codes.\n\nThe successful candidate will be responsible for overall structural design coordination, foundation analysis, seismic design considerations, and ensuring compliance with Vision 2030 sustainability goals.',
    ar: 'نبحث عن مهندس إنشائي أول ذو خبرة لقيادة التصميم الإنشائي والتحليل لمشروع تطوير مختلط الاستخدامات مرموق من 45 طابقاً في الرياض. هذا مشروع معلم سيحدد أفق المدينة ويتطلب خبرة في أنظمة الإنشاءات العالية وبرامج التحليل المتقدمة والأكواد السعودية للبناء.\n\nسيكون المرشح الناجح مسؤولاً عن تنسيق التصميم الإنشائي العام وتحليل الأساسات واعتبارات التصميم الزلزالي وضمان الامتثال لأهداف الاستدامة في رؤية 2030.'
  },
  budget: '150,000 - 250,000 SAR',
  budgetType: 'fixed',
  duration: '8-12 months',
  location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
  isRemote: false,
  postedDate: '2024-01-20',
  deadline: '2024-02-20',
  category: 'structural',
  urgency: 'normal',
  experienceLevel: 'senior',
  applicants: 23,
  views: 156,
  saved: false,
  client: {
    id: 'client_1',
    name: { en: 'Royal Development Group', ar: 'مجموعة التطوير الملكية' },
    rating: 4.9,
    reviews: 47,
    verified: true,
    memberSince: '2019',
    location: { en: 'Riyadh', ar: 'الرياض' },
    completedProjects: 127,
    totalSpent: '12.5M SAR',
    avatar: null,
  },
  requirements: {
    en: '• Bachelor\'s degree in Civil/Structural Engineering\n• Minimum 8 years of experience in structural design\n• Professional Engineer (PE) license or equivalent\n• Expertise in ETABS, SAP2000, and AutoCAD\n• Experience with high-rise buildings (25+ floors)\n• Knowledge of Saudi Building Code (SBC) and international standards\n• Excellent communication skills in Arabic and English\n• Project management experience preferred',
    ar: '• درجة البكالوريوس في الهندسة المدنية/الإنشائية\n• خبرة لا تقل عن 8 سنوات في التصميم الإنشائي\n• رخصة مهندس معتمد أو ما يعادلها\n• خبرة في ETABS و SAP2000 و AutoCAD\n• خبرة في المباني العالية (25+ طابق)\n• معرفة بكود البناء السعودي والمعايير الدولية\n• مهارات تواصل ممتازة بالعربية والإنجليزية\n• خبرة في إدارة المشاريع مفضلة'
  },
  deliverables: {
    en: '• Complete structural analysis and design calculations\n• Detailed structural drawings and specifications\n• Foundation design and geotechnical recommendations\n• Seismic analysis report\n• Construction supervision support\n• As-built drawings upon project completion',
    ar: '• حسابات التحليل والتصميم الإنشائي الكاملة\n• رسومات ومواصفات إنشائية مفصلة\n• تصميم الأساسات وتوصيات جيوتقنية\n• تقرير التحليل الزلزالي\n• دعم الإشراف على البناء\n• رسومات التنفيذ الفعلي عند اكتمال المشروع'
  },
  skills: [
    'Structural Engineering',
    'ETABS',
    'SAP2000',
    'AutoCAD',
    'High-Rise Design',
    'Seismic Analysis',
    'Saudi Building Code',
    'Foundation Design',
    'Steel Design',
    'Concrete Design'
  ],
  benefits: {
    en: '• Competitive compensation package\n• Opportunity to work on landmark project\n• Professional development support\n• Health insurance coverage\n• Performance bonuses\n• Flexible working hours',
    ar: '• حزمة تعويضات تنافسية\n• فرصة للعمل على مشروع معلم\n• دعم التطوير المهني\n• تغطية التأمين الصحي\n• مكافآت الأداء\n• ساعات عمل مرنة'
  },
  attachments: [
    { name: 'Project_Overview.pdf', size: '2.3 MB', type: 'pdf' },
    { name: 'Site_Plans.dwg', size: '15.7 MB', type: 'dwg' },
    { name: 'Preliminary_Design.pdf', size: '8.1 MB', type: 'pdf' },
  ],
  tags: ['High-Rise', 'Landmark Project', 'Riyadh', 'Mixed-Use', 'Structural Design'],
  companyBenefits: [
    'Vision 2030 Project',
    'Career Growth',
    'International Standards',
    'Latest Technology'
  ],
};

const JobDetailsScreen: React.FC<Props> = ({
  jobId,
  onApply,
  onSave,
  onContact,
  onViewSimilar,
  onReport,
  onBack,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [job, setJob] = useState(SAMPLE_JOB);
  const [activeTab, setActiveTab] = useState('overview');
  const scrollViewRef = useRef<ScrollView>(null);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const handleSave = () => {
    setJob(prev => ({ ...prev, saved: !prev.saved }));
    onSave?.(jobId);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: getText({
          en: `Check out this job: ${getText(job.title)} - ${job.budget}`,
          ar: `اطلع على هذه الوظيفة: ${getText(job.title)} - ${job.budget}`
        }),
        title: getText(job.title),
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleApply = () => {
    Alert.alert(
      getText({ en: 'Apply for Job', ar: 'تقدم للوظيفة' }),
      getText({ 
        en: 'Are you sure you want to apply for this position?', 
        ar: 'هل أنت متأكد أنك تريد التقدم لهذا المنصب؟' 
      }),
      [
        { text: getText({ en: 'Cancel', ar: 'إلغاء' }), style: 'cancel' },
        { text: getText({ en: 'Apply', ar: 'تقدم' }), onPress: () => onApply?.(jobId) }
      ]
    );
  };

  const renderTabButton = (tabId: string, title: string, icon: string) => (
    <TouchableOpacity
      key={tabId}
      style={[
        styles.tabButton,
        { backgroundColor: theme.surface },
        activeTab === tabId && { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary }
      ]}
      onPress={() => setActiveTab(tabId)}
    >
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={activeTab === tabId ? COLORS.primary : theme.textSecondary} 
      />
      <Text style={[
        styles.tabText,
        { color: activeTab === tabId ? COLORS.primary : theme.text }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Job Description */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Job Description', ar: 'وصف الوظيفة' })}
        </Text>
        <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
          {getText(job.description)}
        </Text>
      </View>

      {/* Key Requirements */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Requirements', ar: 'المتطلبات' })}
        </Text>
        <Text style={[styles.requirementsText, { color: theme.textSecondary }]}>
          {getText(job.requirements)}
        </Text>
      </View>

      {/* Skills */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Required Skills', ar: 'المهارات المطلوبة' })}
        </Text>
        <View style={styles.skillsContainer}>
          {job.skills.map((skill, index) => (
            <View key={index} style={[styles.skillChip, { backgroundColor: COLORS.primary + '15' }]}>
              <Text style={[styles.skillText, { color: COLORS.primary }]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderDetailsTab = () => (
    <View style={styles.tabContent}>
      {/* Job Details */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Project Details', ar: 'تفاصيل المشروع' })}
        </Text>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Ionicons name="cash" size={20} color={COLORS.success} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Budget', ar: 'الميزانية' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {job.budget}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="time" size={20} color={COLORS.info} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Duration', ar: 'المدة' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {job.duration}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Location', ar: 'الموقع' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {getText(job.location)}
                {job.isRemote && ` • ${getText({ en: 'Remote OK', ar: 'عن بُعد' })}`}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={20} color={COLORS.warning} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Application Deadline', ar: 'موعد انتهاء التقديم' })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {job.deadline}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Deliverables */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Expected Deliverables', ar: 'المخرجات المتوقعة' })}
        </Text>
        <Text style={[styles.deliverablesText, { color: theme.textSecondary }]}>
          {getText(job.deliverables)}
        </Text>
      </View>

      {/* Project Files */}
      {job.attachments.length > 0 && (
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({ en: 'Project Files', ar: 'ملفات المشروع' })}
          </Text>
          {job.attachments.map((file, index) => (
            <TouchableOpacity key={index} style={styles.attachmentItem}>
              <Ionicons 
                name={file.type === 'pdf' ? 'document-text' : 'document'} 
                size={24} 
                color={COLORS.primary} 
              />
              <View style={styles.attachmentInfo}>
                <Text style={[styles.attachmentName, { color: theme.text }]}>
                  {file.name}
                </Text>
                <Text style={[styles.attachmentSize, { color: theme.textSecondary }]}>
                  {file.size}
                </Text>
              </View>
              <Ionicons name="download" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderClientTab = () => (
    <View style={styles.tabContent}>
      {/* Client Info */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <View style={styles.clientHeader}>
          <View style={[styles.clientAvatar, { backgroundColor: COLORS.primary + '20' }]}>
            <Ionicons name="business" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.clientInfo}>
            <View style={styles.clientNameContainer}>
              <Text style={[styles.clientName, { color: theme.text }]}>
                {getText(job.client.name)}
              </Text>
              {job.client.verified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              )}
            </View>
            <Text style={[styles.clientLocation, { color: theme.textSecondary }]}>
              {getText(job.client.location)} • {getText({ 
                en: `Member since ${job.client.memberSince}`, 
                ar: `عضو منذ ${job.client.memberSince}` 
              })}
            </Text>
          </View>
        </View>

        <View style={styles.clientStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: COLORS.primary }]}>
              {job.client.rating}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Rating', ar: 'التقييم' })}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: COLORS.success }]}>
              {job.client.completedProjects}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Projects', ar: 'مشروع' })}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: COLORS.warning }]}>
              {job.client.totalSpent}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Total Spent', ar: 'إجمالي الإنفاق' })}
            </Text>
          </View>
        </View>
      </View>

      {/* Company Benefits */}
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {getText({ en: 'Why Work With Us', ar: 'لماذا تعمل معنا' })}
        </Text>
        <Text style={[styles.benefitsText, { color: theme.textSecondary }]}>
          {getText(job.benefits)}
        </Text>

        <View style={styles.benefitChips}>
          {job.companyBenefits.map((benefit, index) => (
            <View key={index} style={[styles.benefitChip, { backgroundColor: COLORS.success + '15' }]}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.benefitText, { color: COLORS.success }]}>
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Ionicons name="share" size={20} color={theme.text} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
              <Ionicons 
                name={job.saved ? 'bookmark' : 'bookmark-outline'} 
                size={20} 
                color={job.saved ? COLORS.primary : theme.text} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => onReport?.(jobId)} style={styles.actionButton}>
              <Ionicons name="flag" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.jobHeader}>
          <Text style={[styles.jobTitle, { color: theme.text }]}>
            {getText(job.title)}
          </Text>
          
          <View style={styles.jobMeta}>
            <Text style={[styles.jobBudget, { color: COLORS.success }]}>
              {job.budget}
            </Text>
            <Text style={[styles.jobPosted, { color: theme.textSecondary }]}>
              {getText({ en: 'Posted', ar: 'نُشر' })} {job.postedDate}
            </Text>
          </View>

          <View style={styles.jobStats}>
            <View style={styles.jobStatItem}>
              <Ionicons name="eye" size={16} color={theme.textSecondary} />
              <Text style={[styles.jobStatText, { color: theme.textSecondary }]}>
                {job.views} {getText({ en: 'views', ar: 'مشاهدة' })}
              </Text>
            </View>
            
            <View style={styles.jobStatItem}>
              <Ionicons name="people" size={16} color={theme.textSecondary} />
              <Text style={[styles.jobStatText, { color: theme.textSecondary }]}>
                {job.applicants} {getText({ en: 'applicants', ar: 'متقدم' })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {renderTabButton('overview', getText({ en: 'Overview', ar: 'نظرة عامة' }), 'document-text')}
          {renderTabButton('details', getText({ en: 'Details', ar: 'التفاصيل' }), 'list')}
          {renderTabButton('client', getText({ en: 'Client', ar: 'العميل' }), 'business')}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'client' && renderClientTab()}

        {/* Similar Jobs */}
        <View style={styles.similarSection}>
          <TouchableOpacity 
            style={[styles.similarButton, { backgroundColor: theme.surface }]}
            onPress={onViewSimilar}
          >
            <Text style={[styles.similarText, { color: COLORS.primary }]}>
              {getText({ en: 'View Similar Jobs', ar: 'عرض وظائف مشابهة' })}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: theme.surface }]}>
        <CustomButton
          title={getText({ en: 'Contact Client', ar: 'اتصل بالعميل' })}
          onPress={() => onContact?.(job.client.id)}
          variant="outline"
          icon="chatbubble"
          size="medium"
          customStyle={styles.contactButton}
        />
        
        <CustomButton
          title={getText({ en: 'Apply Now', ar: 'تقدم الآن' })}
          onPress={handleApply}
          icon="send"
          size="medium"
          customStyle={styles.applyButton}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    padding: SPACING.sm,
  },
  jobHeader: {
    gap: SPACING.md,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    lineHeight: 28,
  },
  jobMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobBudget: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  jobPosted: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  jobStats: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  jobStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  jobStatText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  tabsContainer: {
    marginBottom: SPACING.md,
  },
  tabs: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  section: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  descriptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 24,
  },
  requirementsText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  skillChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  skillText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  detailsGrid: {
    gap: SPACING.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  deliverablesText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 22,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  attachmentSize: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  clientAvatar: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInfo: {
    flex: 1,
  },
  clientNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  clientName: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  clientLocation: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  clientStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  benefitsText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  benefitChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  benefitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  similarSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  similarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  similarText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default JobDetailsScreen;