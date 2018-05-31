package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.InscriptionModuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity InscriptionModule and its DTO InscriptionModuleDTO.
 */
@Mapper(componentModel = "spring", uses = {ModuleMapper.class, StudentMapper.class})
public interface InscriptionModuleMapper extends EntityMapper<InscriptionModuleDTO, InscriptionModule> {

    @Mapping(source = "module.id", target = "moduleId")
    @Mapping(source = "student.id", target = "studentId")
    InscriptionModuleDTO toDto(InscriptionModule inscriptionModule);

    @Mapping(source = "moduleId", target = "module")
    @Mapping(source = "studentId", target = "student")
    InscriptionModule toEntity(InscriptionModuleDTO inscriptionModuleDTO);

    default InscriptionModule fromId(Long id) {
        if (id == null) {
            return null;
        }
        InscriptionModule inscriptionModule = new InscriptionModule();
        inscriptionModule.setId(id);
        return inscriptionModule;
    }
}
