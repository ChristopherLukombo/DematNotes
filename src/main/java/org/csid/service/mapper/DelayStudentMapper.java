package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.DelayStudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DelayStudent and its DTO DelayStudentDTO.
 */
@Mapper(componentModel = "spring", uses = {ModuleMapper.class, StudentMapper.class})
public interface DelayStudentMapper extends EntityMapper<DelayStudentDTO, DelayStudent> {

    @Mapping(source = "module.id", target = "moduleId")
    DelayStudentDTO toDto(DelayStudent delayStudent);

    @Mapping(source = "moduleId", target = "module")
    DelayStudent toEntity(DelayStudentDTO delayStudentDTO);

    default DelayStudent fromId(Long id) {
        if (id == null) {
            return null;
        }
        DelayStudent delayStudent = new DelayStudent();
        delayStudent.setId(id);
        return delayStudent;
    }
}
