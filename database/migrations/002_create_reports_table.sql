-- database/migrations/002_create_reports_table.sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  term VARCHAR(20) NOT NULL,
  exam VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  grade VARCHAR(10) NOT NULL,
  school VARCHAR(100) NOT NULL,
  english NUMERIC(5,2) NOT NULL,
  kiswahili NUMERIC(5,2) NOT NULL,
  mathematics NUMERIC(5,2) NOT NULL,
  science NUMERIC(5,2) NOT NULL,
  cre NUMERIC(5,2) NOT NULL,
  social_studies NUMERIC(5,2) NOT NULL,
  agriculture NUMERIC(5,2) NOT NULL,
  pre_tech NUMERIC(5,2) NOT NULL,
  arts NUMERIC(5,2) NOT NULL,
  total_marks NUMERIC(6,2) NOT NULL,
  performance VARCHAR(50) NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_student_id ON reports(student_id);
CREATE INDEX idx_reports_grade ON reports(grade);