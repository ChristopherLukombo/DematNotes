package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, SchoolYearMapper.class, ClassroomMapper.class, SchoolMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "schoolYear.id", target = "schoolYearId")
    @Mapping(source = "classroom.id", target = "classroomId")
    @Mapping(source = "school.id", target = "schoolId")
    StudentDTO toDto(Student student);

    @Mapping(target = "absences", ignore = true)
    @Mapping(target = "delaystudents", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "schoolYearId", target = "schoolYear")
    @Mapping(source = "classroomId", target = "classroom")
    @Mapping(source = "schoolId", target = "school")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
