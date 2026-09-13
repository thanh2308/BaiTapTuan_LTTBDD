class Student {
    constructor(public name: string) {}
}

class Teacher {
    constructor(public name: string) {}
}

class School {
    students: Student[] = [];
    teachers: Teacher[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    displayInfo(): void {
        console.log("Danh sách giáo viên:");
        this.teachers.forEach(t => console.log("- " + t.name));

        console.log("Danh sách học sinh:");
        this.students.forEach(s => console.log("- " + s.name));
    }
}

const school = new School();
const teacher1 = new Teacher("Cô Lan");
const student1 = new Student("Thanh");

school.addTeacher(teacher1);
school.addStudent(student1);

school.displayInfo();