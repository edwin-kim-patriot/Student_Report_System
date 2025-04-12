// client/src/utils/constants.js

// Performance thresholds and associated styles
export const PERFORMANCE_LEVELS = {
  'EXCEEDING EXPECTATION': {
    color: '#2ecc71',
    minScore: 702
  },
  'MEETING EXPECTATION': {
    color: '#3498db',
    minScore: 450
  },
  'APPROACHING EXPECTATION': {
    color: '#f39c12',
    minScore: 234
  },
  'BELOW EXPECTATION': {
    color: '#e74c3c',
    minScore: 0
  }
};

// Subject definitions used across forms, reports, and display components
export const SUBJECTS = [
  { name: 'ENGLISH', label: 'English' },
  { name: 'KISWAHILI', label: 'Kiswahili' },
  { name: 'MATHEMATICS', label: 'Mathematics' },
  { name: 'SCIENCE', label: 'Integrated Science' },
  { name: 'CRE', label: 'CRE' },
  { name: 'SOCIAL_STUDIES', label: 'Social Studies' },
  { name: 'AGRICULTURE', label: 'Agriculture & Nutrition' },
  { name: 'PRE_TECH', label: 'Pre-Technical Studies' },
  { name: 'ARTS', label: 'Creative Arts' }
];

// Utility: array of subject names only (if needed for loops or validations)
export const SUBJECT_NAMES = SUBJECTS.map((s) => s.name);
