import db from '../config/db.js';

class Report {
  static async create({
    student_id,
    term,
    exam,
    year,
    grade,
    school,
    english,
    kiswahili,
    mathematics,
    science,
    cre,
    social_studies,
    agriculture,
    pre_tech,
    arts,
    total_marks,
    performance,
    remarks
  }) {
    const queryText = `
      INSERT INTO reports (
        student_id, term, exam, year, grade, school,
        english, kiswahili, mathematics, science, cre,
        social_studies, agriculture, pre_tech, arts,
        total_marks, performance, remarks
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *;
    `;
    const values = [
      student_id, term, exam, year, grade, school,
      english, kiswahili, mathematics, science, cre,
      social_studies, agriculture, pre_tech, arts,
      total_marks, performance, remarks
    ];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  }

  static async findAll() {
    const { rows } = await db.query('SELECT * FROM reports ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM reports WHERE id = $1', [id]);
    return rows[0];
  }

  static async findByStudent(studentId) {
    const { rows } = await db.query(
      'SELECT * FROM reports WHERE student_id = $1 ORDER BY created_at DESC',
      [studentId]
    );
    return rows;
  }

  static async findByGrade(grade) {
    const { rows } = await db.query(
      'SELECT * FROM reports WHERE grade = $1 ORDER BY created_at DESC',
      [grade]
    );
    return rows;
  }

  static async update(id, {
    student_id,
    term,
    exam,
    year,
    grade,
    school,
    english,
    kiswahili,
    mathematics,
    science,
    cre,
    social_studies,
    agriculture,
    pre_tech,
    arts,
    total_marks,
    performance,
    remarks
  }) {
    const queryText = `
      UPDATE reports
      SET
        student_id = $1,
        term = $2,
        exam = $3,
        year = $4,
        grade = $5,
        school = $6,
        english = $7,
        kiswahili = $8,
        mathematics = $9,
        science = $10,
        cre = $11,
        social_studies = $12,
        agriculture = $13,
        pre_tech = $14,
        arts = $15,
        total_marks = $16,
        performance = $17,
        remarks = $18,
        updated_at = NOW()
      WHERE id = $19
      RETURNING *;
    `;
    const values = [
      student_id,
      term,
      exam,
      year,
      grade,
      school,
      english,
      kiswahili,
      mathematics,
      science,
      cre,
      social_studies,
      agriculture,
      pre_tech,
      arts,
      total_marks,
      performance,
      remarks,
      id
    ];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  }

  static async delete(id) {
    await db.query('DELETE FROM reports WHERE id = $1', [id]);
    return true;
  }

  static async getGradeAnalysis(grade) {
    // Get all reports for the grade
    const reports = await this.findByGrade(grade);
    if (reports.length === 0) return null;

    // Calculate overall statistics
    const totalStudents = reports.length;
    const totalMarksSum = reports.reduce((sum, report) => sum + report.total_marks, 0);
    const overallMean = totalMarksSum / totalStudents;

    // Calculate performance level distribution
    const performanceLevels = {
      'EXCEEDING EXPECTATION': 0,
      'MEETING EXPECTATION': 0,
      'APPROACHING EXPECTATION': 0,
      'BELOW EXPECTATION': 0
    };

    reports.forEach(report => {
      performanceLevels[report.performance]++;
    });

    // Calculate subject-wise statistics
    const subjects = {
      english: { sum: 0, count: 0 },
      kiswahili: { sum: 0, count: 0 },
      mathematics: { sum: 0, count: 0 },
      science: { sum: 0, count: 0 },
      cre: { sum: 0, count: 0 },
      social_studies: { sum: 0, count: 0 },
      agriculture: { sum: 0, count: 0 },
      pre_tech: { sum: 0, count: 0 },
      arts: { sum: 0, count: 0 }
    };

    reports.forEach(report => {
      Object.keys(subjects).forEach(subject => {
        subjects[subject].sum += report[subject];
        subjects[subject].count++;
      });
    });

    const subjectResults = Object.entries(subjects).map(([key, { sum, count }]) => {
      const mean = sum / count;
      return {
        name: this.getSubjectName(key),
        mean,
        performance: this.getPerformanceLevel(mean, 'subject')
      };
    });

    return {
      grade,
      totalStudents,
      overallMean,
      overallPerformance: this.getPerformanceLevel(overallMean, 'overall'),
      performanceLevels,
      subjectResults
    };
  }

  static getSubjectName(key) {
    const names = {
      english: 'English',
      kiswahili: 'Kiswahili',
      mathematics: 'Mathematics',
      science: 'Integrated Science',
      cre: 'CRE',
      social_studies: 'Social Studies',
      agriculture: 'Agriculture & Nutrition',
      pre_tech: 'Pre-Technical Studies',
      arts: 'Creative Arts'
    };
    return names[key] || key;
  }

  static getPerformanceLevel(score, type) {
    const num = parseFloat(score);
    if (isNaN(num)) return 'NO DATA';
    
    if (type === 'subject') {
      if (num >= 80) return 'EXCEEDING EXPECTATION';
      if (num >= 60) return 'MEETING EXPECTATION';
      if (num >= 40) return 'APPROACHING EXPECTATION';
      return 'BELOW EXPECTATION';
    } else {
      if (num >= 702) return 'E.E (Exceeding Expectation)';
      if (num >= 450) return 'M.E (Meeting Expectation)';
      if (num >= 234) return 'A.E (Approaching Expectation)';
      return 'B.E (Below Expectation)';
    }
    
  }
  static async findByAdmissionNumber(admissionNumber) {
    const query = `
      SELECT r.*
      FROM reports r
      INNER JOIN students s ON r.student_id = s.id
      WHERE s.admission_number = $1
      ORDER BY r.created_at DESC
    `;
    const { rows } = await db.query(query, [admissionNumber]);
    return rows;
  }

}

export default Report;;