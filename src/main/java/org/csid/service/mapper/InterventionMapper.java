package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.InterventionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Intervention and its DTO InterventionDTO.
 */
@Mapper(componentModel = "spring", uses = {ModuleMapper.class, TeacherMapper.class})
public interface InterventionMapper extends EntityMapper<InterventionDTO, Intervention> {

    @Mapping(source = "module.id", target = "moduleId")
    InterventionDTO toDto(Intervention intervention);

    @Mapping(source = "moduleId", target = "module")
    Intervention toEntity(InterventionDTO interventionDTO);

    default Intervention fromId(Long id) {
        if (id == null) {
            return null;
        }
        Intervention intervention = new Intervention();
        intervention.setId(id);
        return intervention;
    }
}
