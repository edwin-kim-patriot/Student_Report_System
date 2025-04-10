-- database/seeds/reports_seed.sql
INSERT INTO reports (
  student_id, term, exam, year, grade, school,
  english, kiswahili, mathematics, science, cre,
  social_studies, agriculture, pre_tech, arts,
  total_marks, performance, remarks
) VALUES
(
  (SELECT id FROM students WHERE admission_number = 'S001'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  81, 55, 58, 95, 94, 71, 76, 83, 34, 647, 'MEETING EXPECTATION',
  'Excellent work! JEPTANUI, CONIE is performing above grade 9 expectations.'
),
(
  (SELECT id FROM students WHERE admission_number = 'S002'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  77, 49, 70, 97, 96, 54, 76, 69, 31, 619, 'MEETING EXPECTATION',
  'JEPKOECH, IVY is performing at expected level for grade 9. Good work!'
),
(
  (SELECT id FROM students WHERE admission_number = 'S003'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  82, 49, 50, 98, 90, 63, 78, 80, 26, 616, 'MEETING EXPECTATION',
  'SALLY, ELIZABETH demonstrates good understanding of concepts.'
),
(
  (SELECT id FROM students WHERE admission_number = 'S004'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  83, 51, 56, 88, 96, 42, 72, 77, 26, 591, 'MEETING EXPECTATION',
  'MONICA WAIRIMU shows potential in grade 9 but needs to work harder.'
),
(
  (SELECT id FROM students WHERE admission_number = 'S005'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  76, 50, 46, 98, 76, 50, 76, 83, 25, 580, 'MEETING EXPECTATION',
  'EKIDOR, ALFRED is making progress but needs more consistent effort to meet expectations.'
),
(
  (SELECT id FROM students WHERE admission_number = 'S006'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  70, 52, 48, 92, 82, 54, 74, 74, 29, 575, 'MEETING EXPECTATION',
  'NELIMA, BELINDA is performing at expected level for grade 9. Good work!'
),
(
  (SELECT id FROM students WHERE admission_number = 'S007'),
  '1', 'END-TERM', 2025, '9', 'REHEMA JUNIOR SCHOOL',
  74, 43, 54, 84, 85, 54, 76, 74, 23, 567, 'MEETING EXPECTATION',
  'PENINAH WANGARI needs significant improvement in most subjects. We recommend extra tuition.'
);